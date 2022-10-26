# API Documentation:
> Made in NodeJS, you can run the code natively in VSCODE.

## Authentication
> Types of authentication requests:

1. **Pin** (1)
   - Method : POST
   - Parameters: {url}/auth/1/{user}
   - Description: Checks if pin is valid.
2. **OpenCV** (2)
   - Method : POST / GET
   - Parameters (POST): {url}/auth/2/{user}
   - Parameters (GET): {url}/auth/2/
   - Description: Checks if name (based on OpenCV recognition) is valid.


## Generic Requests
> Types of generic requests:

1. Outlier Analysis:
   - Method : POST / GET
   - Parameters (POST): {url}/outlier/{boolean}
   - Parameters (GET): {url}/outlier/
   - Description: Used for communication between Python & HTML Web ; Sets boolean value for "gIsOutlier".

2. Account Blacklist:
   - Method : POST / GET
   - Parameters (POST): {url}/blacklist/add/{address} | {url}/blacklist/remove/{address}
   - Parameters (GET): {url}/blacklist/
   - Description: Used to get a list of the blacklisted account addresses.