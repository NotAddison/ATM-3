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

$('#pin').submit(function(e){
    e.preventDefault();
    ValidatePin();
});

function ValidatePin(){
    console.log("Validating pin...")
    const options = {method: 'POST', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};

    // Get result element
    var pin = $('#result').val()
    if (pin.length == 6){
        // Send pin to server
        fetch(`http://localhost:3000/auth/1/${pin}`,options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.valid){
                SendHook("[🔓] Pin Authenticated", `Pin: ${pin} \nUser: ${data.user} \nEmail: ${data.email}`)
                // redirect to navigation.html
                window.location.href = "navigation.html";
            }
            else{
                SendHook("[❌] Pin Authentication Failed", `Pin: ${pin}`)
                alert("Invalid Pin!")
                ClearPin()
            }
        })
    }
    else{
        alert("Pin must be 6 digits long!")
        // Clear pin
        ClearPin()
    }
}
