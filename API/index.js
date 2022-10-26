const e = require('express');
const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3000;

// Variables (for testing, should use database)
var dPins = {
    123456 : "John Doe",
    891011 : "Jane Doe",
    121314 : "Addison"
};

var aBlacklist = []

var gUser = "";
var gPin = "";
var gIsOutlier = false;
var isHostage = false;


// Middleware
app.use(express.json());

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
            user : dPins[pin],
            valid : true
        });
        gPin = pin; // Set global pin variable
    } 
    else res.status(400).json({ 
        status : "success",
        user : "unknown",
        valid : false 
    });
});

app.get('/auth/1/',(req, res) => {
    res.status(200).send({
        status : "success",
        pin : gPin,
        valid : (gPin in dPins)
    });
});

// -------- [ CV (Recognition) Authentication API (2) ] --------
app.post('/auth/2/:user',(req, res) => {
    var { user } = req.params;
    // Missing Params
    if (!user){
        res.status(418).send({
            status : "success", 
            user: "Missing User!" 
        });
    }
    
    // Checks if User Exists
    if(CheckValueExists(user)){
        res.send({
            status: 'OK',
            user: `${user}`,
            valid : true
        })
        gUser = user // Set global user variable
    }
    else{
        res.send({
            status: 'OK',
            user: 'unknown',
            valid : false
        })
    }
});

app.get('/auth/2/',(req, res) => {
    res.status(200).send({
        user: gUser,
    });
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