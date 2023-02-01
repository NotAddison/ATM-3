console.log(">> [Running emergency.js]");

function CheckEmergency() { 
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/emergency/`, options)
        .then(response => response.json())
        .then(response => {     
            isEmergency = response["valid"]
            console.log(`>> isEmergency: ${isEmergency}`);
            if (isEmergency == true) {
                window.location.href('index.html')
                console.log(">> [Emergency]: User is redirected");
                }
            }
        )
        .catch(err => console.error(err));
}