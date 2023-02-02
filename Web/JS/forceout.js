console.log(">> [Running forceout.js]");

function ForceLogout() { 
    var options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    res = fetch(`http://localhost:3000/force-logout/`, options)
        .then(response => response.json())
        .then(response => {
            isForcedOut = response["valid"]
            if (isForcedOut) {
                    SendLog("Logged out user")
                    ShowToast("You have been logged out by an OCBC Staff.")
                    setTimeout(function(){}, 1000);
                    // Switch back to false
                    url = "http://localhost:3000/force-logout/"
                    options = { method: 'POST', headers: { 'Content-Type': 'application/json' } }
                    fetch(url, options)
                    window.location.href = 'auth.html'
                }
                return isForcedOut
            }
        )
        .catch(err => console.error(err));
}

setInterval(ForceLogout, 1000);