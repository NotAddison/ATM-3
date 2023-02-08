# ATM 3.0 - Bytehackz NP OCBC Hackathon 2022

<img src="Assets/README/Banner.png">
<p align="center">
  OCBC Hackathon 2022 - <b>#1</b> Place Overall Winner 🏆
</p>
<br>

> Index Deployment: https://notaddison.github.io/PFD-2022/Web/HTML/Index/ <br>
> Dashboard Deployment: https://notaddison.github.io/PFD-2022/Web/HTML/Dashboard/ <br>
> Ideation Notion Link: https://not-addison.notion.site/PFD-Plan-b576caeb2021486b8e30266434d8c97d <br>

<details>
<summary><b>API Flow</b></summary>
API Documentation: https://github.com/NotAddison/PFD-2022/blob/main/API/README.md <br>
<img src="Assets\README\APIFlow.jpg" width="800">
<br><br>
</details>

## Security Risks
> Possible security risks that ATMs faces
1. PIN Thermal Imaging
2. Shoulder Surfing
3. Database Leaks
4. Scams
5. Card Skimming
6. ~~Network Attack~~ [Implemented alr (ATM Firewall)]
7. ~~Lebanese Loop~~ [ Hard to Detect ]
8. ~~Cash Trapping~~ [ Hard to Detect ]

## Ideas
> Possible ideas to mitigate the risks
1. **Computer Vision** (OpenCV)
   - Facial / Emotion Recognition
   - Hostile Object Recognition (E.g; Knife, Gun)


2. **Covered Camera Check**
   - Checks if camera of ATM is covered / broken.


3. **Mobile App**
   - To utilize Biometrics (fingerprint / face recognition)
   - Listen to ATM response > Request from device (on request auth)


4. **Outlier Analysis** (ML)
   - Check for outlier when withdrawing cash.
   - If an account receives a large amount of money within a short period, mark account as "Suspicious".
   - If an account withdraws a large amount of money within a short period, mark account as "Suspicious".
   - If an account receives many transactions from multiple accounts within a short period, mark account as "Suspicious".

5. **Extra Validations**
   - Withdrawal : Fingerprint + Age Check (if elderly / large amount :: show warning prompt of scam possibility)
   - Transfer of Funds : Check if address of transfer is "Blacklisted" or "Suspicious"
   - Integrate w/ ML to detect outliers > Prompt/Notify users.
   - (esp for Senior Citizen) & Scams.

6. **Database Leak Checker** (HaveIBeenPwned API)
   - Check if user's data has been leaked, send a pop-up notification on the ATM **ONCE**.

7. **Message Alert** (Webhook)
   - Integrate w/ Database Leak Checker & Authentications (OpenCV & Pin failure).
   - Send a message to the user's phone when the ATM detects a suspicious activity (ML - #4).
   - Send alert when user is withdrawing a large amount of money (#5).
   - Send alert if user is transferring money to a suspicious (blacklisted) account (#5).
   - Send an alert if user is in a hostage situation (#1).

8.  **NFC/EVC Chip Biometrics**
       - Read Card Number > Query backend > Get biometric "fingerprint"/hash > Compare with user's biometrics
  
9.  **Operator Dashboard** 
      - Summary of all ATM : [E.G: 3 Hostage situation detected]

10. **Transfer Details**
      - Show details of the transferee (Name, Address, etc).
      - Allow the user to verify the details before transferring money (also can prevent accidental typo).



<br>
<details>
<summary><b>--- Contributions 👤 ---</b></summary>
<b>Addison (@NotAddison)</b><br>
<li>Brainstorm & Ideation </li>
<li>API (NodeJS) </li>
<li>NodeJS API </li>
<li> Hostage Situation Detection (Computer Vision) </li>
<li> Broken/Covered Camera Detection </li>
<li> Discord (SMS) Webhooks </li>
<li> Flutter Mobile App (For auth) </li>
<li> Pin & Biometric Authentication </li>
<li> ATM Transfer Details </li>
<li> Assisted in other features (Toast Message, Website HTML Refactor, Breach Check) </li>
<li>UI Wireframe Design </li>
<li>Assisted in Dashboard Pages (all HTML pages) </li>
<li>Staff Authentication </li>
<li>Live Activity Logs (UI & Functions) </li>
<li>ATM Status (Online/Offline) </li>
<li>Live ATM Information (User & Machine) </li>
<li>Live ATM Camera Feed </li>
<li>Edit ATM User Information </li>
<li>Assisted in ATM Broadcast System (UI & Functions) </li>

<br>
<b>Paul (@realelongatedmusket)</b><br>
<li>Brainstorming & Ideation </li>
<li>UI Wireframe Design </li>
<li>All Website Pages (HTML & CSS) </li>
<li>Toast Notification (HTML & CSS) </li>
<li>Machine Learning (Data Cleaning & Preparation) </li>
<li>Outlier Analysis </li>
<li>Assisted in other features (Data creation) </li>
<li>Force Logout (Functions) </li>

<br>
<b>Fredor (@Lunebun)</b><br>
<li>Brainstorming & Ideation </li>
<li>Extra Validations (Blacklist Popup) </li>
<li>Extra Validations (Elderly Banner) </li>
<li>ATM Main UI </li>
<li>Dashboard Graph  </li>

<br>
<b>Jia Hau (@JiaHauHau)</b><br>
<li>Brainstorming & Ideation </li>
<li>Email Breach check </li>
<li>Breach Pop up </li>
<li>Dashboard Main UI </li>
<li>Broadcast Pop up </li>

<br>
<b>Haziq (@haziqakid)</b><br>
<li>Brainstorming & Ideation </li>
<li>Ideation </li>
<li>Outlier Analysis [data scraping] </li>
<li>Research camera app to use </li>
<li>Login UI </li>

<br>
</details>

## Setup
1. Clone the repo
2. Add a .env file in the API folder
3. Add the following variables in the .env file
```
WEBHOOK_URL = "YOUR_KEY_HERE"
HIBP_API_KEY = "YOUR_KEY_HERE"
```
1. Run the "Start.bat" file
2. Launch your android emulator
3. Press "1" and press "Enter" to start all the services
4. Profit 👍
<br>

## Dependencies
> Dependencies for the project
- **Python** => 3.9
  - OpenCV (Custom CUDA Build) [pip install opencv-python]
  - Deepface [pip install deepface]
  - YoloV4
  - Matplotlib & Pandas
  - Requests
  - Tensorflow-GPU (https://www.tensorflow.org/install/source#gpu)

- **Flutter**\
  - Flutter SDK 3.3.10
  - Android Studio SDK (Virtual Device)

- **NodeJS** (NPM)
  - Express
  - Requests
  - Python-Shell
  
- **CUDA Toolkit**
  - CUDA (Version 11.2)
  - cuDNN (Version 8.1.0)

<br>
<details>
<summary><b>OpenCV CUDA Build Properties</b></summary>
- CMAKE Options: <br>
- (optional) PYTHON3_PACKAGE_PATH <br>
- WITH_CUDA <br>
- BUILD_opencv_dnn <br>
- OPENCV_DNN_CUDA <br>
- ENABLE_FAST_MATH <br>
- BUILD_opencv_world <br>
- OPENCV_EXTRA_MODULES_PATH (set path to opencv contrib folder "contrib/modules") <br>
- (AFTER CONGIRUATION) <br>
- CUDA_FAST_MATH <br>
- CUDA_ARCH_BIN (set gpu architechture: https://en.wikipedia.org/wiki/CUDA)
- config (set to Release)
<br><br>
</details>
<br>

## Misc
> Naming Conventions, Git, References & Credits

<details>
<summary><b>Naming Conventions</b></summary>
- <b>Commits</b> : https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/ <br>
- <b>Functions</b> : PascalCase, Function names start with a capital letter. (E.g: ParseJson()) <br>
- <b>Variables</b>: camelCase or Hungarian Notation. (E.g: isValid or **b**IsValid)<br>
- <b>Constants</b>: All uppercase. (E.g: const int MAX_SIZE = 100;)<br>
- <b>Classes</b>: PascalCase, Class names start with a capital letter. (E.g: class MyClass)<br>
- <b>Asset Files</b>: PascalCase, File names start with a capital letter. (E.g: MyFile.txt)<br>
- <b>Script Files</b>: PascalCase or snake_case, File names start with a lowercase letter. (E.g: my_script.py or MyScript.py)<br>

- **References**: 
- > Coding Practices: https://curc.readthedocs.io/en/latest/programming/coding-best-practices.html
</details>

<details>
<summary><b>References / Credits</b></summary>
- UX of digital randomized Numberpad : https://uxpajournal.org/usability-evaluation-of-randomized-keypad/<br>
- HaveIBeenPwned API: https://haveibeenpwned.com/API/v3 <br>
</details>
