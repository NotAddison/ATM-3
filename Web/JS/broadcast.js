function GetBroadcast(){
    url = "http://localhost:3000/broadcast/";
    var options = { method: "GET", headers: { "Content-Type": "application/json" } };
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (!data["broadcast-switch"]) return;

        $("body").prepend(`
            <div class="announcement">
                <div class="banner__content">
                    <div class="banner__text w-[100vw]">
                        <strong>Announcement (📢): </strong> ${data["message"]}
                    </div>
                    <button class="banner__close" type="button" onclick="CloseAnnouncement()">
                        <span class="material-icons">
                            close
                        </span>
                    </button>
                </div>
            </div>
        `);
    })
}

function CloseAnnouncement(){
    $(".announcement").remove();
}

// Set Interval
setInterval(GetBroadcast, 5000);