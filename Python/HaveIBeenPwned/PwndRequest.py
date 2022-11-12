import requests
import json
import urllib.parse


def GetPwnedStatus():
    # Get the data from the API
    r = requests.get('http://localhost:3000/auth/1')
    data = r.json()
    print(data)
    email = data.get('email')
    email =  urllib.parse.quote(email)
    print("Email: " + email)

    # Get the data from the API
    link = f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}"
    Headers = { 'hibp-api-key' : "cc9cbc26678d4e959e80f4ab36bc7dff"}
    response = requests.get(link, headers=Headers)
    if response.status_code == 200:
        print(">> Email has been pwned!")
        return {"status": "true"}   # Non-capitalized boolean for JavaScript to parse
    else:
        print(">> Email has not been pwned (SAFE)")
        return {"status": "false"}