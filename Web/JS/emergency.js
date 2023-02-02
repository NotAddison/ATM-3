console.log(">> [Running emergency.js]");

function ForceLogout() { 
    var options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    res = fetch(`http://localhost:3000/emergency/`, options)
        .then(response => response.json())
        .then(response => {
            isEmergency = response["valid"]
            if (isEmergency) {
                    SendLog("Logged out user")
                    ShowToast("You have been logged out by an OCBC Staff.")
                    setTimeout(function(){}, 1000);
                    // Switch back to false
                    url = "http://localhost:3000/emergency/"
                    options = { method: 'POST', headers: { 'Content-Type': 'application/json' } }
                    fetch(url, options)
                    window.location.href = 'auth.html'
                }
                return isEmergency
            }
        )
        .catch(err => console.error(err));
}

setInterval(ForceLogout, 1000);