async function GetLogs(){
    console.log(">> Retrieving Logs...")
    // HTTP Request to local API (Returns array)
    // HTML Inject into Log area
}

async function GetATM(){
    console.log(">> Retrieving ATM Status...")
    // HTTP Request to local API (Returns Object)
    // Get ATM Status
}

async function GetATMFeed(){
    console.log(">> Retrieving ATM Live Camera Feed...")
    // HTTP Request to local API (Returns Base64Encoded String)
    // Get ATM Video Feed
    // Update every second
}

function AtmButtonPressed(id){
    console.log(">> Button Pressed: " + id);

    // Check if atm is online (query API)
    if (id == 2729){
        // Redirect to ATM Page
        window.location.href = "atm.html";
    }
    else{
        ShowToast(`ATM ${id} is currently offline...`, "red", icon="X", iconIntensity = 500, outlineIntensity = 500 ,isCashToast = false, isSuccessful = false)
    }

}

// If page is on "main.html" for dashboard, call functions on load


$(document).ready(function(){
    pageName = window.location.pathname.split("/").pop();

    if(pageName == "main.html"){
        GetLogs();
        GetATM();
    }

    if (pageName == "atm.html"){
        GetLogs();
        GetATMFeed();
    }
    
});
