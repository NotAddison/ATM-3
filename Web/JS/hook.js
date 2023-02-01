async function SendHook(title, message){
    let url = await fetch("http://localhost:3000/webhook/").then(response => response.json()).then(data => data.url);

    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/json');
    // request.setRequestHeader('Access-Control-Allow-Origin', '*');

    var data = {
        "embeds":[{"color": 1014235,
                    "title": title, 
                    "description":message,
                    "footer": {'text': ""},
                    "timestamp": new Date()
                }]
    };
    request.send(JSON.stringify(data));
}