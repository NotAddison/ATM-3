var req = new XMLHttpRequest()
req.open('POST', 'http://localhost:3000/auth/1/123456', true)
req.send()

var req = new XMLHttpRequest()
req.open('GET', 'http://localhost:3000/auth/1/', true)
req.onload = function(){
    email = this.response["email"]
}
req.send()

encoded_email = encodeURIComponent(email)

hibp_link = 'https://haveibeenpwned.com/api/v3/breachedaccount/'+ encoded_email

var req = new XMLHttpRequest()
req.open('GET',hibp_link, true)
req.setRequestHeader('hibp-api-key',cc9cbc26678d4e959e80f4ab36bc7dff)
req.onload = function(){
    breached_site = this.response["Name"]
}