function DisplayPin(val){
    // Get result element and append value to it
    if (document.getElementById('result').value.length < 6){
        document.getElementById('result').value += val
    }
}

function ClearPin(){
    // Get result element
    document.getElementById('result').value = ""
}

