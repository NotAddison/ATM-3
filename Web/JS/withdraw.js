const { parse } = require("path");

function CheckAllowed(){
    // Do stuff to check if person is allowed to withdraw
    isAllowed = true;
    if (isAllowed) ShowToast(null,"green","i",500,500,true,true)
    else ShowToast(null,"red","i",500,500,true,false)
}

function CheckScoring() {
    transferAmt = $("#transferAmt").val();
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/variables`, options)
    .then(response => response.json())
    .then(response => {
        if (parseInt(response["dPins"][response["gPin"]]["score"]) <= 20) ShowToast("Unable to withdraw, please contact support", "red", "❌")
        else ShowToast(`Sucessfully Withdrawn $${transferAmt}`, "green", "✔")
    })
}