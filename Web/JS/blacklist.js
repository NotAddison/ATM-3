console.log(">> [Running Blacklist.js]");
var blackList;

<<<<<<< HEAD
function CheckScore() {
=======

function CheckScore() {
    accountNo = $("#transferAcc").val();
>>>>>>> 7c2afc07e36d6f8ea3e063b29b2192a5dd109c82
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/variables`, options)
    .then(response => response.json())
    .then(response => {
        dict = response["dPins"];
        for (key in dict){
            if (dict[key]["accountNo"] === accountNo){
<<<<<<< HEAD
                score = dict[key]["score"]
                if (score < 20){
                    return Blacklist()
                }
                else if (score < 60){
                    SendHook("[⚠] Suspicious Transfer Detected", "A user is transferring money to a suspicious account.")
                    $("body").prepend(`
                    <div class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-40" id="BlacklistPopup">
                        <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-gray-200">
                            <div class="p-5">
                            <!-- Header Text -->
                            <div class="flex flex-col">
                                <div class="flex content-center justify-center mb-2">
                                    <img class="w-10" src="https://img.icons8.com/ios/512/delete-user-male.png"/>
                                </div>
                                <p class="text-black text-2xl text-center">Suspicious Account Detected</p> 
                            </div>
                                <hr class="border-t-4 grey mt-2">
                                <br>
                                <div class="text-black h-32 mb-5 text-center">
                                    <p>Please be careful.</p>
                                    <p>Your are currently transferring/withdrawing money regarding a suspicious account</p>
                                    <br>
                                    <p>Are you sure you want to continue?</p>
                                </div>
                                <div class="flex flex-wrap content-center justify-between">
                                <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg" onclick="DismissBlacklist()">Dismiss</button>
                                <button class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg" onclick="ConfirmBlacklist()">Confirm</button>
                            </div>
                        </div>
                    </div>
                `   );
                    console.log(">> [Blacklist]: SHOWING POPUP");
=======
                console.log("yes")
                score = dict[key]["score"]
                console.log(score)
                if (score < 20){
                    console.log("blacklist")
                    Blacklist()
                }
                else if (score < 60){
                    console.log("sus")
                    CheckSuspicious()
>>>>>>> 7c2afc07e36d6f8ea3e063b29b2192a5dd109c82
                }
            }
        }
    })
}

function CheckSuspicious() { 
    SendHook("[⚠] Suspicious Transfer Detected", "A user is transferring money to a suspicious account.")
    $("body").prepend(`
        <div class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 rounded-lg absolute z-40" id="BlacklistPopup">
            <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-gray-200">
                <div class="p-5">
                <!-- Header Text -->
                <div class="flex flex-col">
                    <div class="flex content-center justify-center mb-2">
                        <img class="w-10" src="https://img.icons8.com/ios/512/delete-user-male.png"/>
                    </div>
                    <p class="text-black text-2xl text-center">Suspicious Account Detected</p> 
                </div>
                    <hr class="border-t-4 grey mt-2">
                    <br>
                    <div class="text-black h-32 mb-5 text-center">
                        <p>Please be careful.</p>
                        <p>Your are currently transferring/withdrawing money regarding a suspicious account</p>
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

function Blacklist() {
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/blacklist/`, options)
        .then(response => response.json())
        .then(response => {     
            blackList = response["sus"];
            console.log(blackList);
            if (blackList.length > 0) {
                if (blackList.includes(parseInt($("#transferAcc").val())))
                    {
                    SendHook("[⚠] Blacklisted Transfer Detected", "A user is transferring money to a blacklisted account.")
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
                                    <p>Your are currently transferring/withdrawing money regarding a blacklist account</p>
                                    <br>
                                    <p>Transfer not allowed.</p>
                                </div>
                                <div class="flex flex-wrap content-center justify-center">
                                <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg" onclick="DismissBlacklist()">Dismiss</button>
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

