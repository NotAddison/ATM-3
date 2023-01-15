console.log(">> [Running Validation.js]");

// ---- Banner ----
function CheckAge() { 
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/auth/1/`, options)
        .then(response => response.json())
        .then(response => {
            isElderly = response["valid"];
            age = response["age"];
            console.log(`>> isElderly: ${isElderly}`);
            if (isElderly) {
                if (age > 60) {
                    SendHook("[⚠] Elderly withdrawer detected", "Potential Scam")
                    console.log(">> [Covered]: SHOWING POPUP");
                    // Show POPUP Message to user : Inform them that a potential scam is happening
                    $("body").prepend(`
                        <div class="banner">
                            <div class="banner__content">
                                <div class="banner__text w-[100vw]">
                                    <strong>Reminder: </strong> There have been cases of hoax scams occuring recently. Please proceed with caution.
                                </div>
                                <button class="banner__close" type="button" onclick="CloseBanner()">
                                    <span class="material-icons">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                    `);
                    isElderly = false;
                }
            }
        })
        .catch(err => console.error(err));
}

CheckAge();

function CloseBanner(){
    $(".banner").remove();
}