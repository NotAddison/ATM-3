// Attempt socket connection
// const socket = new WebSocket('ws://localhost:8765');
// socket.onmessage = function (event) {
//     let blob = new Blob([event.data], {type: 'image/jpeg'});
//     let objectURL = URL.createObjectURL(blob);
//     document.getElementById('feed-img').src = objectURL;
// };

isOnline = false
function RefreshFeed(){
    // Forces browser to download image by chaning the URL
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
        currect_source_name = document.getElementById('feed-img').src.split('/').pop()
        

        if (currect_source_name != source.split('/').pop()){
            document.getElementById('feed-img').src = source;
        }
        console.log(">> [Live Feed]: CV is offline");
    }
}

// Every 5 seconds, refresh the feed
setInterval(RefreshFeed, 500);