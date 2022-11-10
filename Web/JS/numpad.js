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

async function ValidatePin(){
    console.log("Validating pin...")
    const options = {method: 'POST', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};

    // Get result element
    var pin = $('#result').val()
    if (pin.length == 6){
        // Send pin to server
        fetch(`http://localhost:3000/auth/1/${pin}`,options)
        .then(response => response.json())
        .then(async data => {
            console.log(data)
            if (data.valid){
                SendHook("[🔓] Pin Authenticated", `Pin: ${pin} \nUser: ${data.user} \nEmail: ${data.email}`)  
                // [DELAY : 2 Seconds] :: Wait for webhook to send before redirect.
                window.setTimeout(function(){
                    window.location.href = "navigation.html";
                }, 2000);              
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
