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

function ValidatePin(pin=""){
    console.log("Validating pin...")
    const options = {method: 'POST', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};

    // If pin is not provided, get it from the input field
    if (pin === ""){pin = $('#result').val()}
    
    if (pin.length == 6){
        // Send pin to server
        fetch(`http://localhost:3000/auth/1/${pin}`,options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.valid){
                SendHook("[🔓] Pin Authenticated", `Pin: ${pin} \nUser: ${data.user} \nEmail: ${data.email}`)
                SendLog("Pin Authenticated")
                
                // [DELAY : 2 Seconds] :: Wait for webhook to send before redirect.
                window.setTimeout(function(){
                    window.location.href = "landing.html";
                }, 1000);
                
            }
            else{
                SendHook("[❌] Pin Authentication Failed", `Pin: ${pin}`)
                SendLog("Pin Authentication Failed", "❌")
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

function BioAuth(type = 1){
    ShowToast('Phone Authentication Requested!', 'green', '📲', 0)

    // Type 1 : Bio -> Get User
    if(type === 1){
        const options = {method: 'POST', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
        fetch(`http://localhost:3000/auth/2/request/true`,options)
        .then(response => response.json())
        .then(data => {
            console.log(`Biometric Request: ${data["request"]}`)
            // Wait until Phone Authentication is complete
            var listener = setInterval(function(){
                const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
                // Check Phone Authentication response
                fetch(`http://localhost:3000/auth/2/request/`,options)
                .then(response => response.json())
                .then(data => {
                    console.log(`Biometric Request: ${data["request"]}`)
                    if (!data["request"]){
                        // Request sent
                        ShowToast('Got Biometric Response! Checking Validity...', 'green', '✅', 0)

                        // Verify Validity
                        VerifyValidity();

                        // Clear Interval
                        clearInterval(listener);
                    }
                })
            }, 2000);
            
        })
    }

    // Type 2 : Bio -> Valid/Invalid
    
}

function VerifyValidity(){
    const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
    fetch(`http://localhost:3000/auth/2/`,options)
    .then(response => response.json())
    .then(data => {
        console.log(`Biometric Request: ${data["request"]}`)
        if (data["valid"]){
            SendHook("[🔓] Biometric Authenticated", `User: ${data.user["name"]} \nEmail: ${data.email}`)
            SendLog("Biometric Authentication Passed", "🔓")

            // [DELAY : 1 Seconds] :: Wait for webhook to send before redirect.
            window.setTimeout(function(){
                window.location.href = "landing.html";
            }, 1000);
        }
        else{
            // Invalid
            ShowToast('Biometric Authentication Failed!', 'red', '❌', 0)
            SendLog("Biometric Authentication Failed!", "⚠️")
        }
    })
}

// Dashboard Login
function StaffAuth(){
    // Get Staff ID
    var staff_id = $('#StaffID').val();
    var staff_pass = $('#StaffPassword').val();

    // Check if staff_id is valid
    console.log(`Staff ID: ${staff_id}`)
    console.log(`Staff Pin: ${staff_pass}`)

    const payload = {
        "staff_id": staff_id,
        "staff_pass": parseInt(staff_pass)
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(payload)
    };

    fetch(`http://localhost:3000/auth/staff/`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data["valid"]){
                // Valid
                ShowToast('Staff Authentication Successful!', 'green', '✅', 0)
                SendHook("[🔓] Staff Authenticated", `Staff ID: ${staff_id}`)
                // [DELAY : 1 Seconds] :: Wait for webhook to send before redirect.
                window.setTimeout(function(){
                    window.location.href = "dashboard.html";
                }, 1000);
            }
            else{
                // Invalid
                ShowToast('Staff Authentication Failed!', 'red', '❌', 0)
                SendHook("[❌] Staff Authentication Failed", `Staff ID: ${staff_id}`)
            }
        })
        .catch(error => {
            console.error(error)
        });
}
