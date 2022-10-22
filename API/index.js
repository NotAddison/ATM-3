const express = require('express');
const app = express();
const PORT  = process.env.PORT || 3000;

// Variables (for testing, should use database)
var dPins = {
    1234 : "John Doe",
    5678 : "Jane Doe",
    91011: "Addison"
};
var gUser = "John Doe";

// Middleware
app.use(express.json());

// Routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`>> http://localhost:${PORT}`);
});

// Pin Authentication
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
        user : "Unknown",
        valid : false 
    });
});