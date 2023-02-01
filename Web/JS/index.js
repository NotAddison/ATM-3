ATMID = 2729;

function CheckOnline(){
    console.log(">> Checking ATM Online Status...")
    var url = `http://localhost:3000/atm`;
    options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        for (var i = 0; i < response["ATMs"].length; i++){
            if (response["ATMs"][i]["ATMID"] == ATMID) if (!response["ATMs"][i]["isOnline"]) SetOnline();
            else console.log(">> ATM is already online.")
        }
    });
}


function SetOnline(){
    console.log(">> Setting ATM Online...")
    var url = `http://localhost:3000/atm/online/${ATMID}`;
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}})
    SendLog("ATM Online", "📶");
}

CheckOnline();