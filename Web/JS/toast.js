var isSuccessful = true;

function ShowWithdrawToast(message, color, intensity = 500) {
    if (!isSuccessful){
        color = "red";
        message = "Cash withdrawal is unsuccessful."
    }
    if (isSuccessful){
        color = "blue";
        message = "Cash has been successfully withdrawn.";
    }
    $("body").append(`
        <div id="withdrawToast" class="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-${color}-${intensity} bg-white drop-shadow-lg">
            <p class="text-sm text-black">
                <!-- Polish the toast with an circle blue "i" (stands for information) -->
                <span class="mr-2 inline-block px-3 py-1 rounded-full bg-${color}-${intensity} text-white font-extrabold">i</span>
                ${message}
            </p>
        </div>
        `);
    // Get the toast element
    withdrawToast = document.getElementById("withdrawToast");
    
    // After 3 seconds, remove toast
    setTimeout(function(){withdrawToast.remove() }, 3000);
  }