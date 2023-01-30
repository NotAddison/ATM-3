ATMID = 2729;

// On page load
$(document).ready(function () {
    var url = "http://localhost:3000/atm";
    var data = {
        "atmID": ATMID
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
});