console.log(">> [Running Fingerprint.js]");

function CheckFingerprint () { 
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch('http://localhost:3000/auth/2/', options)
        .then(response => response.json())
        .then(response => {
            isFingerprint = response["valid"];
            
            console.log(`>> isFingerprint: ${isFingerprint}`);
            if (isFingerprint) {
                if (is) {
                    SendHook("[⚠] Fingerprint mismatched", "Fingerprint mismatch detected")
                    console.log(">> [Covered]: SHOWING POPUP");
                    $("body").prepend(`
                        <div class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 rounded-lg absolute" id="FingerprintPopup">
                            <div class="flex flex-wrap content-center justify-center rounded-lg bg-gray-50 shadow-md w-[28rem] border border-red-400">
                                <div class="p-5">
                                <!-- Header Text -->
                                <div class="flex flex-col">
                                    <div class="flex content-center justify-center mb-2">
                                        <img class="w-10" src="https://img.icons8.com/ios-glyphs/30/000000/no-video.png"/>
                                    </div>
                                    <p class="text-black text-2xl text-center">Obstruction Detected</p> 
                                </div>
                                <hr class="border-t-4 grey mt-2">
                                <br>
                                <div class="text-black h-32 mb-5 text-center">
                                    <p>Fingerprint mismatched,</p>
                                    <p>You are not allowed to continue withdrawal.</p>
                                    <br>
                                    <p>You may continue with your banking once the fingerprint is matched.</p>
                                </div>
                                <button class="rounded-md bg-gray-600 w-full py-4 text-center text-white cursor-pointer hover:bg-gray-700 transition ease-in-out delay-10 hover:scale-105 duration-150 " onclick="DismissCheckVision()">
                                    <div class="flex row justify-center">
                                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="px" width="20" height="20" viewBox="0 0 172 140" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,17.2c-34.89608,0 -63.75472,26.1059 -68.15052,59.85286c-0.33819,2.06607 0.47653,4.15222 2.12541,5.44225c1.64888,1.29003 3.86978,1.57886 5.79377,0.75348c1.92399,-0.82538 3.2452,-2.63376 3.4467,-4.7176c3.66527,-28.13864 27.59351,-49.86433 56.78464,-49.86433c15.8634,0 30.10329,6.47034 40.46927,16.86406l-11.80261,11.8026l34.4,5.73333l-5.73333,-34.4l-8.76797,8.76797c-12.44134,-12.45138 -29.59211,-20.23464 -48.56536,-20.23464zM148.56276,88.39636c-2.94235,-0.04229 -5.43907,2.1496 -5.77812,5.07265c-3.66527,28.13864 -27.59351,49.86433 -56.78464,49.86433c-17.32668,0 -32.68715,-7.73862 -43.20156,-19.86511l8.80156,-8.80156l-34.4,-5.73333l5.73333,34.4l11.74661,-11.74661c12.59291,14.17019 30.8868,23.21328 51.32005,23.21328c34.89608,0 63.75472,-26.1059 68.15052,-59.85286c0.23499,-1.63127 -0.24332,-3.28477 -1.31288,-4.53867c-1.06957,-1.2539 -2.62697,-1.98694 -4.27488,-2.01211z"></path></g></g></svg>
                                        <span>Retry</span>
                                    </div> 
                                </button>
                                <input type="button" value="Retry" >
                                </div>
                            </div>
                        </div>
                    `);
                    isShown = true;
                }
            }
        })
        .catch(err => console.error(err));
}
