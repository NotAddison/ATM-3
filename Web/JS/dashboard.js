async function GetLogs(){
    console.log(">> Retrieving Logs...")
    // HTTP Request to local API (Returns array)
    // HTML Inject into Log area
}

async function GetATMStatus(){
    console.log(">> Retrieving ATM Status...")
    var url = "http://localhost:3000/atm";
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    response = await response.json();

    $('button[id^="atm"]').each(function () {
        var id = $(this).children().first().attr("id");
        id = parseInt(id.split("-")[1]);

        if (response["ATMs"].includes(id)){ DisplayATMStatus(id, 0); }
        else{ DisplayATMStatus(id, 1); }
    });


    // for (var i = 0; i < response["ATMs"].length; i++){
    //     atm = response["ATMs"][i];
    //     DisplayATMStatus(atm, "atm-offline");
    // }

    return response["ATMs"];
}

function DisplayATMStatus(id, status){
    css = ''
    if (status == 0){ css = 'icon-white'; }
    else if (status == 1){ css = 'atm-offline'; }
    else if (status == 2){ css = 'atm-danger'; }

    // Reset all classes
    $(`#atm-${id}`).removeClass("atm-online atm-offline atm-danger");
    $(`#atm-${id}`).addClass(css);
}

async function GetATMFeed(){
    console.log(">> Retrieving ATM Live Camera Feed...")
    // HTTP Request to local API (Returns Base64Encoded String)
    // Get ATM Video Feed
    // Update every second
}

function AtmButtonPressed(id){
    online_atms = GetATMStatus();
    online_atms.then(function(result){
        online_atms = result;
        if (online_atms.includes(id)) window.location.href = "atm.html";
        else ShowToast(`ATM ${id} is currently offline...`, "red", icon="X", iconIntensity = 500, outlineIntensity = 500 ,isCashToast = false, isSuccessful = false);
    });
}

// If page is on "main.html" for dashboard, call functions on load


$(document).ready(function(){
    pageName = window.location.pathname.split("/").pop();

    if(pageName == "dashboard.html"){
        GetLogs();
        GetATMStatus();
        setInterval(GetATMStatus, 5000);
    }

    if (pageName == "atm.html"){
        GetLogs();
        GetATMFeed();
    }
    
});

async function ATMStatus(id) {
    online_atms = GetATMStatus();
    online_atms.then(function(result){
        online_atms = result;
    });

    await online_atms
    console.log(online_atms)
    return await online_atms;
}

function Graph() {
    var xValues = ["Offline", "Online"];
    var yValues = ATMStatus(2729)
    var barColors = [
    "#b91d47",
    "#00aba9",
    ];

    new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues,
        }]
    },
    options: {
        title: {
        display: true,
        text: "ATM Status",
        }
    }
    });
}

Graph()