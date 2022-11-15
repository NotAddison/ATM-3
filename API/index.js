const e = require('express');
const cors = require('cors')
const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3000;

// Variables (for testing, should use database)
var dPins = {
    123456 : ["John Doe","lol@gmail.com",'80'],
    891011 : ["Jane Doe","abc@gmail.com",'50'],
    121314 : ["Addison","monkey@gmail.com",'18']
};

var dBiometric = {
    "43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8" : dPins[123456]
}

var aBlacklist = [];
var gUser = "";
var gPin = "";
var gHash = "";
var gIsOutlier = false;
var isRequestingBio = false;

var isCovered = false; // Camera Covered Boolean
var isHostage = false; // If hostage situation
var hasWeapon = false;
var emotion = "neutral";


// Middleware
app.use(express.json());

// CORS Policy  
app.use(cors());

// Functions
function CheckValueExists(value) {
    for (var key in dPins) if (dPins[key] == value) return true;
    return false;
}

// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`>> http://localhost:${PORT}`);
});

// -------- [ Pin Authentication (1) ] --------
app.post('/auth/1/:pin', (req, res) => {
    var { pin } = req.params;
    pin = parseInt(pin);
    if (pin in dPins) {
        res.status(200).json({ 
            status : "success",
            user : dPins[pin][0],
            email: dPins[pin][1],
            age: dPins[pin][2],
            valid : true
        });
        gPin = pin; // Set global pin variable
    } 
    else res.status(400).json({ 
        status : "success",
        user : "unknown",
        email: "unknown",
        age: 'unknown',
        valid : false 
    });
});

app.get('/auth/1/',(req, res) => {
    if (gPin in dPins) {
        res.status(200).send({
            status : "success",
            name : dPins[gPin][0],
            pin : gPin,
            email: dPins[gPin][1],
            age: dPins[pin][2],
            valid : (gPin in dPins)
        });
    }
    else{
        res.status(400).send({
            status : "success",
            name : "unknown",
            pin : gPin,
            email: "unknown",
            valid : (gPin in dPins)
        });
    }
    
});

// -------- [ Biometric Authentication API (2) ] --------
app.post('/auth/2/:hash',(req, res) => {
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
        gUser = dBiometric[hash][0]; // Set global user variable
    }
    else{
        res.status(400).send({
            user : "unknown",
            email : "unknown",
            valid : false
        });
    }
});

app.get('/auth/2/',(req, res) => {
    if (gHash != ""){
        res.status(200).send({
            user : dBiometric[gHash][0],
            email : dBiometric[gHash][1],
            valid : true
        });
    }
    else{
        res.status(400).send({
            user : "unknown",
            email : "unknown",
            valid : false
        });
    }
    
});

// -------- [ CV (Object) Authentication API (2) ] --------
app.post('/auth/3/:hostage',(req, res) => {
    var { hostage } = req.params;
    isHostage = hostage.toLocaleLowerCase() === 'true'

    res.status(200).send({
        status : "success",
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
    res.status(200).send({
        isHostage: bool
    });
    hasWeapon = bool;
});

// -- CV Emotion
app.post('/auth/weapon/:bool',(req, res) => {
    var { bool } = req.params;
    res.status(200).send({
        isHostage: bool
    });
    hasWeapon = bool;
});


// -------- [ Outlier Analysis ] --------
app.post('/outlier/:bool', (req, res) => {
    var { bool } = req.params;
    isOutlier = bool.toLocaleLowerCase() === 'true'
    
    if (!bool){
        res.status(418).send({
            status : "success", 
            user: "Boolean Value Missing!" 
        });
    }
    res.status(200).json({ 
        status : "success",
        valid : isOutlier
    });

    gIsOutlier = isOutlier; // Set global pin variable
});

app.get('/outlier/',(req, res) => {
    res.status(200).send({
        status : "success",
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
        status : "success",
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