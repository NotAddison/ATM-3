console.log(">> [Running Blacklist.js]");
var current = 891011
var blackList;

function CheckBlacklist() { 
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/blacklist/`, options)
        .then(response => response.json())
        .then(response => {     
            blackList = response["sus"];
            console.log(blackList);
            if (blackList.length > 0) {
                if (blackList.includes(current)) {
                    SendHook("[⚠] Blacklist alert", "Potential scam occuring.")
                    $("body").prepend(`
                    <div class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-40" id="BlacklistPopup">
                        <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-gray-200">
                            <div class="p-5">
                            <!-- Header Text -->
                            <div class="flex flex-col">
                                <div class="flex content-center justify-center mb-2">
                                    <img class="w-10" src="https://img.icons8.com/ios/512/delete-user-male.png"/>
                                </div>
                                <p class="text-black text-2xl text-center">Blacklisted Account Detected</p> 
                            </div>
                                <hr class="border-t-4 grey mt-2">
                                <br>
                                <div class="text-black h-32 mb-5 text-center">
                                    <p>Please be careful.</p>
                                    <p>Your are currently transfering/withdrawing money regarding a blacklisted account</p>
                                    <br>
                                    <p>Are you sure you want to continue?</p>
                                </div>
                                <div class="flex flex-wrap content-center justify-between">
                                <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg" onclick="DismissBlacklist()">Dismiss</button>
                                <button class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg" onclick="ConfirmBlacklist()">Confirm</button>
                            </div>
                        </div>
                    </div>
                `);
                    console.log(">> [Blacklist]: SHOWING POPUP");
                }
            }
        })
        .catch(err => console.error(err));
}

function DismissBlacklist(){
    $("#BlacklistPopup").remove();
    console.log("dismiss")
}

function ConfirmBlacklist(){
    $("#BlacklistPopup").remove();
    console.log("confirm")
    // TODO: Show toast message confirming transfer
    ShowToast("Transfer Successful", "green");
}

