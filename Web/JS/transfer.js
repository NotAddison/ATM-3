function GetTransferInfo(){
    accountNo = $("#transferAcc").val();

    if (accountNo.length > 10) {
        const options = {method: 'GET', headers: {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}};
        fetch('http://localhost:3000/variables', options)
        .then(response => response.json())
        .then(response => {
            dict = response["dPins"];
            for (key in dict){
                if (dict[key]["accountNo"] === accountNo){
                    $("#transferName").text(dict[key]["name"]);
                    $("#transferAccVerify").text(dict[key]["accountNo"]);
                    $("#transferEmail").text(dict[key]["email"]);
                    $("#transferScore").text(100);
                    clearInterval(4);
                    break;
                }
                else{
                    $("#transferName").text(" ");
                    $("#transferAccVerify").text(" ");
                    $("#transferEmail").text(" ");
                    $("#transferScore").text(" ");
                }
            }
            
        })
    }
}

var listener = setInterval(GetTransferInfo, 2000);

