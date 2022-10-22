const e = require('express');
const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3000;

// Variables (for testing, should use database)
var dPins = {
    1234 : "John Doe",
    5678 : "Jane Doe",
    91011: "Addison"
};
var gUser = "";

// Middleware
app.use(express.json());

// Functions
function CheckValueExists(value) {
    for (var key in dPins) {
        if (dPins[key] == value) return true;
    }
    return false;
}

// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`>> http://localhost:${PORT}`);
});

// Pin Authentication (1)
app.post('/auth/1/:pin', (req, res) => {
    var { pin } = req.params;
    pin = parseInt(pin);
    if (pin in dPins) {
        res.status(200).json({ 
            status : "success",
            user : dPins[pin],
            valid : true
        });
    } 
    else res.status(400).json({ 
        status : "success",
        user : "unknown",
        valid : false 
    });
});

// CV Authentication API (2)
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
        gUser = user // Set global user
    }
    else{
        res.send({
            status: 'OK',
            user: 'unknown',
            valid : false
        })
    }
});

app.get('/auth/2',(req, res) => {
    res.status(200).send({
        user: gUser,
    });
});