var breachDismissed = false
var email = ""
var user = ""

const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}}
fetch("http://localhost:3000/auth/1/", options)
.then(response => response.json())
.then(response => {
    console.log(response)
    console.log("Name: " + response["name"])
    console.log("Email: " + response["email"])
    email = response["email"]
    user = response["name"]
    encoded_email = encodeURIComponent(email)
    CheckBreached(email)
});

// -- Check if user dismissed previous popup --
fetch("http://localhost:3000/pwned/dismiss/", options)
.then(response => response.json())
.then(response => {
    console.log("dismiss: " + response["dismiss"])
    breachDismissed = response["dismiss"]
});

function CheckBreached (email) { 
    hibp_link = 'http://localhost:3000/pwned/check/'+ encoded_email
    const options = {method: 'GET'}

    fetch(hibp_link, options)
        .then(response => response.json())
        .then(response => {
            console.log("isBreached: " + response["isBreached"])
            if (response["isBreached"] && !breachDismissed) {
                // Show POPUP Message to user : Inform them their email been breached
                $("body").prepend(`
                    <div class="min-h-screen flex flex-wrap max-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-40" id="BreachPopup">
                        <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-gray-200">
                            <div class="p-5">
                            <!-- Header Text -->
                            <div class="flex flex-col">
                                <div class="flex content-center justify-center mb-2">
                                    <img src="https://img.icons8.com/ios-glyphs/30/null/delete-database.png"/>
                                </div>
                                <p class="text-black text-2xl text-center">Info Leak Detected</p> 
                            </div>
                            <hr class="border-t-4 grey mt-2">
                            <br>
                            <div class="text-black h-32 mb-5 text-center flex flex-col justify-between">
                                <p>Dear ${user},</p>
                                <p>your email <b class="text-rose-500">${email}</b> has been found in a database leak.</p>
                                <p>Please be wary of any spam/suspicious emails that you may receive.</p>
                            </div>
                            <button class="rounded-md bg-gray-600 w-full py-4 text-center text-white cursor-pointer hover:bg-gray-700 transition ease-in-out delay-10 hover:scale-105 duration-150 " onclick="DismissBreach()">
                                <div class="flex row justify-center">
                                    <span>Noted !</span>
                                </div> 
                            </button>
                            </div>
                        </div>
                    </div>
                `);
            }
        })
        .catch(err => console.error(err));
}

function DismissBreach(){
    // CALL THIS FUNCTION WHEN BUTTON IS PRESSED!
    $("#BreachPopup").remove();

    // Send POST request to server to update breachDismissed to true
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}}
    fetch("http://localhost:3000/pwned/dismiss/true", options)
    .then(response => response.json())
    .then(response => {
        console.log("Email: " + response["email"])
    });
}