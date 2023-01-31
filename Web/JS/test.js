
function RefreshFeed(){
    // Forces browser to download image by chaning the URL
    document.getElementById('feed-img').src = "../../../feed.jpg?random="+new Date().getTime();
}

// Every 5 seconds, refresh the feed
setInterval(RefreshFeed, 500);