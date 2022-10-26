function ShowWithdrawToast() {
    // Get the toast element
    withdrawToast = document.getElementById("withdrawToast")
    // Remove hidden class
    withdrawToast.classList.remove("hidden")

    // After 3 seconds, add hidden class
    setTimeout(function(){withdrawToast.classList.add("hidden"); }, 3000);
  }