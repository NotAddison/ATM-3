async function SendHook(title, message){
    var url = "https://discord.com/api/webhooks/1036102961996247150/3keTw9J2paixnUpe39wytQEzo0hKP3RnoYWu6TZbhpctne6BKHRMOIntAoEDtECSftZH";
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/json');

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