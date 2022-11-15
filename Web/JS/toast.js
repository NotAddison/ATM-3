function ShowToast(message, color, icon="i", iconIntensity = 500, outlineIntensity = 500 ,isCashToast = false, isSuccessful = false) {
    
    // Special Message for cash related toast messages
    if(isCashToast) {
        if (!isSuccessful){
            color = "red";
            message = "Cash withdrawal is unsuccessful."
        }
        else {
            color = "blue";
            message = "Cash has been successfully withdrawn.";
        }
    }

    $("body").append(`
        <div id="ToastMessage" class="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-${color}-${outlineIntensity} bg-white drop-shadow-lg text-black">
            <p class="text-sm text-black">
                <!-- Polish the toast with an circle blue "i" (stands for information) -->
                <span class="mr-2 inline-block px-3 py-1 rounded-lg bg-${color}-${iconIntensity} text-white font-extrabold">${icon}</span>
                ${message}
            </p>
        </div>
    `);

    // Remove the toast after 5 seconds
    toast = document.getElementById("ToastMessage");

    setTimeout(function(){
        console.log(">> Removing toast message")
        toast.remove();
    }, 2000);
}