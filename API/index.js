const express = require('express');
const cors = require('cors');

const {PythonShell} = require('python-shell');  // Python Shell
const request = require('request'); // HTTPS Requests

const app = express();
const PORT  = process.env.PORT || 3000;

// Variables (for testing, should use database)
var dPins = {
    123456 : {
        "name" : "John Doe",
        "accountNo" : "501123456789",
        "email" : "lol@gmail.com",
        "age" : 80,
        "isPwnedDismissed": false
    },

    891011 : {
        "name" : "Jane Doe",
        "accountNo" : "501891011121",
        "email" : "JaneLikesPaul@gmail.com",
        "age" : 20,
        "isPwnedDismissed": false
    },

    121314 : {
        "name" : "Addison Chua",
        "accountNo" : "501121314151",
        "email" : "addisonchua@rocketmail.com",
        "age": 18,
        "isPwnedDismissed": false
    }
};

var dBiometric = {
    "43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8" : dPins[123456]
}

var aBlacklist = [501891011121];
var gUser = "";
var gPin = "";
var gHash = "";
var gIsOutlier = false;
var isRequestingBio = false;

var isCovered = false; // Camera Covered Boolean
var isHostage = hasNegativeEmotion && hasWeapon; // If hostage situation
var hasWeapon = false;
var hasNegativeEmotion = false;


// Middleware
app.use(express.json());

// CORS Policy  
app.use(cors());
 
// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`>> http://localhost:${PORT}`);
});

//Python Shell Triggers (TEST)
app.get("/", (req, res, next)=>{
    PythonShell.run('PwndRequest.py', {mode:'text', pythonOptions: ['-u'], scriptPath: './Python/HaveIBeenPwned',}, function (err, result){
        if (err) throw err;
        isPwned = result[0] == "True";
        res.send(isPwned);
    });
});

// -------- [ GET variables ] --------
app.get("/variables", (req, res, next)=>{
    res.status(200).json({
        "dPins" : dPins,
        'gUser': gUser,
        'gPin': gPin,
        'gHash': gHash,
        'gIsOutlier': gIsOutlier,
        'isHostage': isHostage,
        'isCovered': isCovered,
        'isRequestingBio': isRequestingBio,
        'hasNegativeEmotion': hasNegativeEmotion,
        'hasWeapon': hasWeapon,
    });
});


// -------- [ Reset variables ] --------
app.get("/reset", (req, res, next)=>{
    gUser = "";
    gPin = "";
    gHash = "";
    gIsOutlier = false;
    isHostage = false;
    isCovered = false;
    isRequestingBio = false;
    hasNegativeEmotion = false;
    hasWeapon = false;

    // Reset dPins
    ResetDPins();

    res.status(200).json({
        "dPins" : dPins,
        'gUser': gUser,
        'gPin': gPin,
        'gHash': gHash,
        'gIsOutlier': gIsOutlier,
        'isHostage': isHostage,
        'isCovered': isCovered,
        'isRequestingBio': isRequestingBio,
        'hasNegativeEmotion': hasNegativeEmotion,
        'hasWeapon': hasWeapon,
    });
    console.log(">> Reset variables");
});

function ResetDPins(){
    for (var key in dPins) {
        dPins[key]["isPwnedDismissed"] = false;
    }
}


// -------- [ Pin Authentication (1) ] --------
app.post('/auth/1/:pin', (req, res) => {
    var { pin } = req.params;
    pin = parseInt(pin);
    if (pin in dPins) {
        res.status(200).json({ 
            user : dPins[pin]["name"],
            email: dPins[pin]["email"],
            age: dPins[pin]["age"],
            valid : true
        });
        gPin = pin; // Set global pin variable
    } 
    else res.status(200).json({ 
        user : "unknown",
        email: "unknown",
        age: 'unknown',
        valid : false 
    });
});

app.get('/auth/1/',(req, res) => {
    if (gPin in dPins) {
        res.status(200).send({
            name : dPins[gPin]["name"],
            pin : gPin,
            email: dPins[gPin]["email"],
            age: dPins[gPin]["age"],
            valid : (gPin in dPins)
        });
    }
    else{
        res.status(200).send({
            name : "unknown",
            pin : gPin,
            email: "unknown",
            valid : (gPin in dPins)
        });
    }
    
});

// -------- [ Biometric Authentication API (2) ] --------
app.post('/auth/2/:hash',(req, res) => {
    console.log(">> Biometric Authentication");
    var { hash } = req.params;
    // Missing Params
    if (!hash) return res.status(400).send({ status : "error", message : "Missing Params" });
    // Check if user exists
    if (hash in dBiometric) {
        res.status(200).send({
            user : dBiometric[hash][0],
            email : dBiometric[hash][1],
            valid : true
        });
        gHash = hash; // Set global hash variable
        gUser = dBiometric[hash][0]; // Set global user variable\

        // Set timeout :
        setTimeout(function(){
            gHash = "";
            console.log(">> Hash reset");
            clearTimeout();
        }, 20000); 
    }
    else{
        res.status(400).send({
            user : "unknown",
            email : "unknown",
            valid : false
        });

        gHash = ""; // Set global hash variable
        gUser = ""; // Set global user variable
    }
});

app.get('/auth/2/',(req, res) => {
    if (gHash != ""){
        res.status(200).send({
            user : dBiometric[gHash],
            email : dBiometric[gHash]["email"],
            valid : true
        });

        // Set Pin Global Variable (Find Key using value)
        gPin = Object.keys(dPins).find(key => dPins[key] === dBiometric[gHash]);
    }
    else{
        res.status(400).send({
            user : "unknown",
            email : "unknown",
            valid : false
        });
    } 
});

// Biometric Request
// FLOW : WEB (POST) > API > APP (GET) > APP (POST)> API > WEB (GET [Listen : if false then true then false = user failed])
app.get('/auth/2/request/',(req, res) => {
    // Request Biometrics from APP (Listen to boolean, if true > Send request biometric popup in flutter app)
    res.status(200).send({
        request: isRequestingBio
    });
});

app.post('/auth/2/request/:bool',(req, res) => {
    // Request Biometrics from APP
    var { bool } = req.params;
    isRequestingBio = bool.toLocaleLowerCase() === 'true'
    res.status(200).send({
        request: isRequestingBio
    });
});

// -------- [ CV (Object) Authentication API (2) ] --------
app.post('/auth/3/:hostage',(req, res) => {
    var { hostage } = req.params;
    isHostage = hostage.toLocaleLowerCase() === 'true'

    if(isHostage){
        hasWeapon = true;
        hasNegativeEmotion = true;
    }

    res.status(200).send({
        isHostage: isHostage
    });
});

app.get('/auth/3/',(req, res) => {
    res.status(200).send({
        isHostage: isHostage
    });
});

// -- CV Weapon
app.post('/auth/weapon/:bool',(req, res) => {
    var { bool } = req.params;
    hasWeapon = bool.toLocaleLowerCase() === 'true'

    res.status(200).send({
        hasWeapon: bool
    });
});

app.get('/auth/weapon/',(req, res) => {
    res.status(200).send({
        hasWeapon: hasWeapon
    });
});

// -- CV Emotion
app.post('/auth/emotion/:bool',(req, res) => {
    var { bool } = req.params;
    hasNegativeEmotion = bool.toLocaleLowerCase() === 'true'
    res.status(200).send({
        hasNegativeEmotion: bool
    });
});

app.get('/auth/emotion/',(req, res) => {
    res.status(200).send({
        hasNegativeEmotion: hasNegativeEmotion
    });
});

// -------- [ Outlier Analysis ] --------
app.post('/outlier/:bool', (req, res) => {
    var { bool } = req.params;
    isOutlier = bool.toLocaleLowerCase() === 'true'
    
    if (!bool){
        res.status(418).send({
            user: "Boolean Value Missing!" 
        });
    }
    res.status(200).json({ 
        valid : isOutlier
    });

    gIsOutlier = isOutlier; // Set global pin variable
});

app.get('/outlier/',(req, res) => {
    res.status(200).send({
        IsOutlier : gIsOutlier
    });
});

// -------- [ Suspicious Accounts Account ] --------
app.post('/blacklist/add/:sus',(req, res) => {
    var { sus } = req.params;
    sus = parseInt(sus);
    aBlacklist.push(sus);
    res.status(200).send({
        status : "success, added to suspicious account blacklist",
        sus : aBlacklist
    });
});

app.post('/blacklist/remove/:sus',(req, res) => {
    var { sus } = req.params;
    sus = parseInt(sus);
    aBlacklist.pop(sus);
    res.status(200).send({
        status : `success, Removed [${sus}] from blacklist`,
        sus : aBlacklist
    });  
});

app.get('/blacklist/',(req, res) => {
    res.status(200).send({
        sus : aBlacklist
    });
});

// -------- [ Covered Camera ] --------
app.post('/covered/:bool', (req, res) => {
    var { bool } = req.params;
    bool = bool.toLocaleLowerCase() === 'true'
    res.status(200).json({ 
        valid : bool
    });
    isCovered = bool; // Set global pin variable
});

app.get('/covered/',(req, res) => {
    res.status(200).send({
        valid : isCovered
    });
});

// -------- [ HaveIBeenPwned API Request ] --------
app.get('/pwned/check/:email', (req, res) => {
    var { email } = req.params;
    if (!email) return res.status(400).send({ status : "error", message : "Missing Params" });
    if (gPin in dPins && email == ""){ email = dPins[gPin][1]; }

    var url = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`;
    var headers = { "hibp-api-key":"cc9cbc26678d4e959e80f4ab36bc7dff", "user-agent":"nodejs" };
    // Send API get with api key
    request.get(url, {headers: headers}, (error, response, body) => {
        if (error) { return console.dir(error);}
        if (response.statusCode === 200){
            res.status(200).send({
                email : email,
                isBreached : JSON.parse(body).length > 0,
                breaches : JSON.parse(body)
            });
        }
        else{
            res.status(400).send({
                email : email,
                isBreached : false,
                breaches : []
            });
        }
    });
});

app.get('/pwned/dismiss/',(req, res) => {
    res.status(200).send({
        dismiss : dPins[gPin]["isPwnedDismissed"]
    });
});

app.post('/pwned/dismiss/:bool',(req, res) => {
    var { bool } = req.params;
    bool = bool.toLocaleLowerCase() === 'true'
    dPins[gPin]["isPwnedDismissed"] = bool;
    res.status(200).send({
        dismiss : dPins[gPin]["isPwnedDismissed"]
    });
});