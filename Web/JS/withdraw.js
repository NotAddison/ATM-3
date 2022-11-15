function CheckAllowed(){
    // Do stuff to check if person is allowed to withdraw
    isAllowed = true;
    if (isAllowed) ShowToast(null,"green","i",500,500,true,true)
    else ShowToast(null,"red","i",500,500,true,false)
}