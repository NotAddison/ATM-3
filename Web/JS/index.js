ATMID = 2729;


async function CheckOnline() {
    var url = "http://localhost:3000/atm";
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response["ATMs"].includes(ATMID))
        if (!response["ATMs"].includes(ATMID)){ SetOnline(); }
    })
}

function SetOnline(){
    console.log(">> Setting ATM Online...")
    var url = "http://localhost:3000/atm";
    var data = {
        "atmID": ATMID
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })

    // Send Logs
    SendLog("ATM Online", "📶");
}

CheckOnline();