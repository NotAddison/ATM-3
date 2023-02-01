async function GetLogs(){
    // console.log(">> Retrieving Logs...")
    var url = "http://localhost:3000/logs/";
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    response = await response.json();

    // Clear Logs
    $("#log-area").empty();

    // Add Logs
    for (var i = 0; i < response["logs"].length; i++){
        log = response["logs"][i];

        // Format Log colors
        text_col = "text-white";
        green = ["[✔️]", "[✅]", "[✓]"];
        red = ["[❌]", "[⛔]", "[✖]"];
        yellow = ["[⚠️]", "[⚠]", "[!]", "[⚠]"];
        blue = ["[i]", "[📶]"];

        if (green.includes(log["type"])){ text_col = "text-green-400"; }
        if (red.includes(log["type"])){ text_col = "text-red-400"; }
        if (yellow.includes(log["type"])){ text_col = "text-yellow-400"; }
        if (blue.includes(log["type"])){ text_col = "text-blue-400"; }

        $("#log-area").append(`
        <div class="flex flex-row flex-wrap ${text_col}">
            <p class="mr-2">${log["type"]} - ${log["atmID"]} </p>
            <p>${log["message"]} </p>
        </div>
        `);
    }


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

function GetStaffName(){
    url = "http://localhost:3000/dashboard/staff/"
    options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        staff_name = response["staff_id"]
        $("#staff-name").text(`${staff_name} !`);
    });
}

isOnline = false
async function GetATMFeed(){
    // Attempt socket connection
    // const socket = new WebSocket('ws://localhost:8765');
    // socket.onmessage = function (event) {
    //     let blob = new Blob([event.data], {type: 'image/jpeg'});
    //     let objectURL = URL.createObjectURL(blob);
    //     document.getElementById('feed-img').src = objectURL;
    // };

    // Forces browser to download image by changing the URL
    url = "http://localhost:3000/cv/"
    options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        isOnline = response["CVOnline"]
    })

    
    if (isOnline) {
        source = `../../../feed.jpg?random=`+new Date().getTime();
        document.getElementById('feed-img').src = source;
    }
    else {
        source = '../../../Assets/Images/Dashboard/loading2.gif'
        current_source_name = document.getElementById('feed-img').src.split('/').pop()
        
        if (current_source_name != source.split('/').pop()){
            document.getElementById('feed-img').src = source;
        }
        console.log(">> [Live Feed]: CV is offline");
    }

}

function GetATMInfo(){
    url = "http://localhost:3000/dashboard/atm"
    options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        $('#IPAddress').text(response["IP"]);
        $('#Lat').text(response["Lat"]);
        $('#Long').text(response["Long"]);
        $('#ATMStatus').text(response["HeldHostage"]);

        $('#UserName').text(response["Name"]);
        $('#UserEmail').text(response["Email"]);
        $('#UserAge').text(response["Age"]);

        $('#UserBreached').text(response["Pwned"]);
        $('#AccStatus').text(response["Blacklisted"]);
        $('#AccScore').text(response["score"]);

        // Add class
        if (response["HeldHostage"] == true){ $('#ATMStatus').addClass("text-red-500"); }
        if (response["Blacklisted"] == true){ $('#AccStatus').addClass("text-red-500"); }
        if (response["HeldHostage"] == false){ $('#ATMStatus').addClass("text-green-500"); }
        if (response["Pwned"] == true){ $('#UserBreached').addClass("text-red-500"); }
        if (response["score"] < 50){ $('#AccScore').addClass("text-red-500"); }
        else ($('#AccScore').addClass("text-green-400"))
    });
}

function AtmButtonPressed(id){
    online_atms = GetATMStatus();
    online_atms.then(function(result){
        online_atms = result;
        if (online_atms.includes(id)) window.location.href = "atm.html";
        else ShowToast(`ATM ${id} is currently offline...`, "red", icon="X", iconIntensity = 500, outlineIntensity = 500 ,isCashToast = false, isSuccessful = false);
    });
}

function LogoutUser(){
    url = "http://localhost:3000/emergency/"
    options = { method: 'POST', headers: { 'Content-Type': 'application/json' } }
    fetch(url, options)
    ShowToast("User has been logged out", "green", icon="🔐", isSuccessful = true);
}

// If page is on "main.html" for dashboard, call functions on load


$(document).ready(function(){
    pageName = window.location.pathname.split("/").pop();

    if(pageName == "dashboard.html"){
        GetStaffName();
        GetLogs();
        GetATMStatus();

        setInterval(GetLogs, 2000);
        setInterval(GetATMStatus, 5000);
    }

    if (pageName == "atm.html"){
        GetLogs();
        GetATMFeed();
        GetATMInfo();

        setInterval(GetLogs, 2000);
        setInterval(GetATMFeed, 500);
        setInterval(GetATMInfo, 2000);
    }
});

function SendSOS(){
    $("body").prepend(`
                    <div class="min-h-screen flex flex-wrap max-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-40" id="SOSPopup">
                        <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-gray-200">
                            <div class="p-5">
                            <!-- Header Text -->
                            <div class="flex flex-col">
                                <p class="text-black text-2xl text-center">Send SOS Message</p> 
                            </div>
                            <hr class="border-t-4 grey mt-2">
                            <br>
                            <div class="h-32 mb-5 flex flex-col border-black">
                                <textarea type="text" class="w-120 h-40 border-black" autofocus id=SOSMessage></textarea>
                            </div>
                            <button class="rounded-md bg-gray-600 w-full py-4 text-center text-white cursor-pointer hover:bg-gray-700 transition ease-in-out delay-10 hover:scale-105 duration-150 " onclick="DismissSOS()">
                                <div class="flex row justify-center">
                                    <span>Send</span>
                                </div> 
                            </button>
                            </div>
                        </div>
                    </div>
                `);
}

function DismissSOS(){
    $("#SOSPopup").remove();
}
function ATMStatus() {
    online_atms = GetATMStatus();
    online_atms.then(function(result){
        online_atms = result;
    });

    console.log(online_atms)

    if (online_atms.length = 1) {
        yValues = [2, 1];
        return yValues
    }
    else {
        return [3, 0]
    }
}

function Graph() {
    var xValues = ["Offline", "Online"];
    var yValues = ATMStatus()
    console.log(yValues)
    var barColors = [
    "dark gray",
    "#00FF00",
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
        borderWidth: 5,
        text: "ATM Status",
        borderColor: '#000000',
        }
    }
    });
}

Graph()
