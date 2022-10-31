console.log(">> [Running Vision.js]");
var isShown = false;

function CheckVision () { 
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch('http://localhost:3000/covered/', options)
        .then(response => response.json())
        .then(response => {
            isCovered = response["valid"];
            console.log(`>> isCovered: ${isCovered}`);

            if (isCovered) {
                if (!isShown) {
                    console.log(">> [Covered]: SHOWING POPUP");
                    // Show POPUP Message to user : Inform them camera is covered & to remove cover
                    isShown = true;
                }
            }
        })
        .catch(err => console.error(err));
}

function DismissCheckVision(){
    // CALL THIS FUNCTION WHEN BUTTON IS PRESSED!
    // Once message is dismissed, send POST request to /covered/ to set isCovered to false
    const options = {method: 'POST', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch('http://localhost:3000/covered/false', options)
    .then(response => response.json())
    .then(response => {
        console.log(`>> Dismissed: ${response["valid"]}`);
        isShown = false;
    })
}

setInterval(CheckVision, 1000);

