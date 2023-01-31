// Attempt socket connection
// const socket = new WebSocket('ws://localhost:8765');
// socket.onmessage = function (event) {
//     let blob = new Blob([event.data], {type: 'image/jpeg'});
//     let objectURL = URL.createObjectURL(blob);
//     document.getElementById('feed-img').src = objectURL;
// };


function RefreshFeed(){
    // Forces browser to download image by chaning the URL
    document.getElementById('feed-img').src = "../../../feed.jpg?random="+new Date().getTime();
}

// Every 5 seconds, refresh the feed
setInterval(RefreshFeed, 500);