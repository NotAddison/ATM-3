ATMID = 2729

function SendLog(message, type = ">") {
    var data = {
        "atmID": ATMID,
        "message": message,
        "type": `[${type}]`
    }

    url = "http://localhost:3000/logs/"
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
    });
}