async function GetLogs() {
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
    for (var i = 0; i < response["logs"].length; i++) {
        log = response["logs"][i];

        // Format Log colors
        text_col = "text-white";
        green = ["[✔️]", "[✅]", "[✓]"];
        red = ["[❌]", "[⛔]", "[✖]"];
        yellow = ["[⚠️]", "[⚠]", "[!]", "[⚠]"];
        blue = ["[i]", "[📶]"];

        if (green.includes(log["type"])) { text_col = "text-green-400"; }
        if (red.includes(log["type"])) { text_col = "text-red-400"; }
        if (yellow.includes(log["type"])) { text_col = "text-yellow-400"; }
        if (blue.includes(log["type"])) { text_col = "text-blue-400"; }

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


// ---- [ Dashboard ] ----
function GetStaffName() {
    url = "http://localhost:3000/dashboard/staff/"
    options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            staff_name = response["staff_id"]
            $("#staff-name").text(`${staff_name} !`);
        });
}

async function GetATMStatus() {
    console.log(">> Retrieving ATM Status...")
    var url = "http://localhost:3000/atm";
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    response = await response.json();
    if (response["ATMs"].length == 0) return;

    // Append ATM to Dashboard
    $('#AtmList').empty();
    for (var i = 0; i < response["ATMs"].length; i++) {
        atm = response["ATMs"][i];
        AddATM(atm["ATMID"]);
    }

    $('button[id^="atm"]').each(function () {
        var id = $(this).children().first().attr("id");
        id = parseInt(id.split("-")[1]);

        for (var i = 0; i < response["ATMs"].length; i++) {
            if (response["ATMs"][i]["ATMID"] == id) {
                DisplayATMStatus(id, response["ATMs"][i]);
            }
        }
    });

    return response["ATMs"];
}

function DisplayATMStatus(id, ATMObj) {
    isHostage = ATMObj["isHostage"];
    isCovered = ATMObj["isCovered"];
    isOnline = ATMObj["isOnline"];

    css = ''
    if (isOnline) { css = 'icon-white'; }
    else { css = 'atm-offline'; }
    if (isCovered) { css = 'atm-warn'; }
    if (isHostage) { css = 'atm-danger'; }

    $(`#atm-${id}`).removeClass("atm-online atm-offline atm-danger atm-warn");
    $(`#atm-${id}`).addClass(css);
}

async function GetGraphData() {
    // Get Online and Offline ATMs
    let online_atms = []
    let offline_atms = []

    const result = await GetATMStatus();

    for (let i = 0; i < result.length; i++) {
        if (result[i]["isOnline"]) {
            online_atms.push(result[i]["ATMID"]);
        } else {
            offline_atms.push(result[i]["ATMID"]);
        }
    }

    return [offline_atms.length, online_atms.length];
}

var Chart;
async function Graph() {
    var xValues = ["Offline", "Online"];
    var yValues = await GetGraphData();

    console.log(yValues)
    var barColors = ["#131313", "#FFFFFF"];

    Chart = new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues,
                borderWidth: 0,
            }],
            labels: xValues
        },
        options: {
            title: {
                display: true,
                borderWidth: 5,
                text: "Status"
            }
        },
        plugins: [ChartDataLabels],
        labels: {
            fontColor: ['rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)']
        }
    });
}

async function updateData() {
    var NewYValues = await GetGraphData()
    myChart.data.datasets.yValues[0] = NewYValues[0]
    myChart.data.datasets.yValues[1] = NewYValues[1]
    Chart.update()
}

function ViewATM(id){
    online_atms = []
    GetATMStatus().then(response => {
        for (var i = 0; i < response.length; i++) {
            if (response[i]["isOnline"]) online_atms.push(response[i]["ATMID"]);
        }
        if (online_atms.includes(id)) window.location.href = "atm.html";
        else ShowToast(`ATM ${id} is currently offline...`, "red", icon = "X", iconIntensity = 500, outlineIntensity = 500, isCashToast = false, isSuccessful = false);
    })
}

function AddATM(id = null) {
    // Generate a fake ATM (For Demo Purposes)
    if (id == null) {
        id = Math.floor(Math.random() * 10000);
        data = {
            "ATMID": id,
            "isOnline": false,
            "isCovered": false,
            "isHostage": false
        }

        url = "http://localhost:3000/atm/add"
        options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        fetch(url, options)
    }

    // Gererate Fake ATM -- For Demo purposes, to show how admin will assign ATMs to staff
    $("#AtmList").append(`
     <button id="atm" onclick="ViewATM(${id})" class="flex flex-wrap flex-col items-center backdrop-blur-3xl bg-black/30 rounded-lg shadow-lg p-5 h-fit w-[250px] h-[400px] transition-all duration-[250ms] hover:scale-105 hover:bg-black/40 mb-5 mr-5">
         <img id="atm-${id}" src="../../../Assets/Images/Dashboard/POS.svg" class="h-40 w-40 icon-white atm-offline">
         <img src="../../../Assets/Images/Dashboard/ATM.svg" class="icon-white">
         <p class="text-white font-bold">${id}</p>
     </button>
 `);
}


// ---- [ ATM UI ] ----
isOnline = false
async function GetATMFeed() {
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
        source = `../../../feed.jpg?random=` + new Date().getTime();
        document.getElementById('feed-img').src = source;
    }
    else {
        source = '../../../Assets/Images/Dashboard/loading2.gif'
        current_source_name = document.getElementById('feed-img').src.split('/').pop()

        if (current_source_name != source.split('/').pop()) {
            document.getElementById('feed-img').src = source;
        }
        console.log(">> [Live Feed]: CV is offline");
    }

}

function GetATMInfo() {
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

            // remove all classes
            $('#ATMStatus').removeClass();
            $('#AccStatus').removeClass();
            $('#UserBreached').removeClass();
            $('#AccScore').removeClass();

            // Add class
            if (response["HeldHostage"] == true) { $('#ATMStatus').addClass("text-red-500"); }
            else ($('#ATMStatus').addClass("text-green-400"))


            if (response["Blacklisted"] == true) { $('#AccStatus').addClass("text-red-500"); }
            else ($('#AccStatus').addClass("text-green-400"))

            if (response["HeldHostage"] == false) { $('#ATMStatus').addClass("text-green-500"); }
            else ($('#ATMStatus').addClass("text-red-500"))

            if (response["Pwned"] == true) { $('#UserBreached').addClass("text-red-500"); }
            else ($('#UserBreached').addClass("text-green-400"))

            if (response["score"] < 50) { $('#AccScore').addClass("text-red-500"); }
            else ($('#AccScore').addClass("text-green-400"))
        });
}

function LogoutUser() {
    url = "http://localhost:3000/force-logout/"
    options = { method: 'POST', headers: { 'Content-Type': 'application/json' } }
    fetch(url, options)
    ShowToast("User has been logged out", "green", icon = "🔐", isSuccessful = true);
}

function SendBroadcast() {
    $("body").prepend(`
        <div class="backdrop-blur-3xl bg-black/50 min-h-screen flex flex-wrap max-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-20" id="BroadcastModal">
            <div class="backdrop-blur-3xl bg-black/50 flex flex-wrap content-center justify-center rounded-lg shadow-md w-[30rem] h-[20rem] p-5 shadow-md z-50">
            <div class="p-5">
                <!-- Header Text -->
                <div class="flex flex-col">
                    <p class="text-white text-2xl">Broadcast</p> 
                </div>
                <br>
                <div class="w-96 mb-5">
                <div class="relative w-full min-w-[200px]">
                    <textarea id="BroadcastMessage"
                    class="p-2 text-white peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    ></textarea>
                    <label class="text-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Message
                    </label>
                </div>
                </div>
                <div class="flex flex-row content-center items-center justify-center">
                <button class="rounded-md w-1/2 py-4 text-center text-white cursor-pointer hover:bg-rose-700 transition ease-in-out delay-10 hover:scale-105 duration-150 font-bold" onclick="DismissBroadcast(false)">X</button>
                <button class="rounded-md w-1/2 text-center text-white cursor-pointer hover:bg-green-700 transition ease-in-out delay-10 hover:scale-105 duration-150 py-2" onclick="DismissBroadcast()">
                    <div class="flex flex-row content-center items-center justify-center space-x-3">
                        <img src="../../../Assets/Images/Dashboard/broadcast.svg" class="w-8 icon-white">
                    </div> 
                </button>
                </div>
            </div>
        </div>
    `);
}

function DismissBroadcast(status = true) {
    // Send Broadcast
    if (status && $("#BroadcastMessage").val() != "") {
        url = "http://localhost:3000/broadcast/"
        data = { "message": $("#BroadcastMessage").val() }
        options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        fetch(url, options)
        ShowToast("Broadcast Sent", "green", icon = "📢", isSuccessful = true);
        SendLog("Broadcast Message Send")
    }

    $("#BroadcastModal").remove();
}

function EditUserInfo(){
    console.log("hello world")
    $("body").prepend(`
        <div class="backdrop-blur-3xl bg-black/50 min-h-screen flex flex-wrap max-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-20" id="EditInfoModal">
            <div class="backdrop-blur-3xl bg-black/50 flex flex-wrap content-center justify-center rounded-lg shadow-md w-[30rem] h-[20rem] p-5 shadow-md z-50">
            <div class="p-5">
                <!-- Header Text -->
                <div class="flex flex-col">
                    <p class="text-white text-2xl">Edit User Info</p> 
                </div>
                <br>
                <div class="w-96 mb-5">
                <div class="flex flex-row text-gray-300">
                    <p class="font-bold">Name: </p>
                    <input type="text" id="EditName" placeholder="- Enter Value Here -" class="form-control px-2 text-base font-normal text-white bg-transparent bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-transparent focus:border-blue-600 focus:outline-none" />
                </div>
                <div class="flex flex-row text-gray-300">
                    <p class="font-bold">Email: </p>
                    <input type="text" id="EditEmail" placeholder="- Enter Value Here -" class="form-control px-2 text-base font-normal text-white bg-transparent bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-transparent focus:border-blue-600 focus:outline-none" />
                </div>
                <div class="flex flex-row text-gray-300">
                    <p class="font-bold">Age: </p>
                    <input type="text" id="EditAge" placeholder="- Enter Value Here -" class="form-control px-2 text-base font-normal text-white bg-transparent bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-transparent focus:border-blue-600 focus:outline-none" />
                </div>
                <div class="flex flex-row text-gray-300">
                    <p class="font-bold">Acc Score: </p>
                    <input type="text" id="EditScore" placeholder="- Enter Value Here -" class="form-control px-2 text-base font-normal text-white bg-transparent bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-transparent focus:border-blue-600 focus:outline-none" />
                </div>
                </div>
                <div class="flex flex-row content-center items-center justify-center">
                <button class="rounded-md w-1/2 py-4 text-center text-white cursor-pointer hover:bg-rose-700 transition ease-in-out delay-10 hover:scale-105 duration-150 font-bold" onclick="DismissEditUserInfo(false)">X</button>
                <button class="rounded-md w-1/2 text-center text-white cursor-pointer hover:bg-green-700 transition ease-in-out delay-10 hover:scale-105 duration-150 py-2" onclick="DismissEditUserInfo()">
                    <div class="flex flex-row content-center items-center justify-center space-x-3">
                        <img src="../../../Assets/Images/Dashboard/edit.svg" class="w-8 icon-white">
                    </div> 
                </button>
                </div>
            </div>
        </div>
    `)

    // Get User Info
    url = "http://localhost:3000/dashboard/user/edit/"
    fetch(url)
    .then(response => response.json())
    .then(data => {
        $("#EditName").val(data.name)
        $("#EditEmail").val(data.email)
        $("#EditAge").val(data.age)
        $("#EditScore").val(data.score)
    });
}

function DismissEditUserInfo(status = true) {
    // Send Broadcast
    if (status) {
        username = $("#EditName").val()
        email = $("#EditEmail").val()
        age = $("#EditAge").val()
        score = $("#EditScore").val()

        data = { "name": username, "email": email, "age": age, "score": score }

        url = "http://localhost:3000/dashboard/user/edit/"
        options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        console.log(data)
        fetch(url, options)


        ShowToast(`Sucessfully Edited User Information`, "green", icon = "📝", isSuccessful = true);
        SendLog("Edited User Information")
    }

    $("#EditInfoModal").remove();
}



// If page is on "main.html" for dashboard, call functions on load
$(document).ready(function () {
    pageName = window.location.pathname.split("/").pop();

    if (pageName == "dashboard.html") {
        GetStaffName();
        GetLogs();
        GetATMStatus();
        Graph()

        setInterval(GetLogs, 2000);
        setInterval(GetATMStatus, 2000);
    }

    if (pageName == "atm.html") {
        GetLogs();
        GetATMFeed();
        GetATMInfo();

        setInterval(GetLogs, 2000);
        setInterval(GetATMFeed, 500);
        setInterval(GetATMInfo, 2000);
    }
});

setInterval(updateData, 100);