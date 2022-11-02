# PFD-2022
Portfolio Development (2022) - **OCBC ATM 3.0**
> Notion Link: https://not-addison.notion.site/PFD-Plan-b576caeb2021486b8e30266434d8c97d

<details>
<summary><b>API Flow</b></summary>
API Documentation: https://github.com/NotAddison/PFD-2022/blob/main/API/README.md <br>
<img src="Assets\README\APIFlow.jpg" width="800">
<br><br>
</details>

## Security Risks
> Possible security risks that ATMs faces
1. PIN Thermal Imaging [❌ - #2]
2. Shoulder Surfing [❌ - #2]
3. Database Leaks [❌ - #6]
4. Scams [❌ - #4 & #5]
5. Card Skimming [❌ - #8]
6. ~~Network Attack~~ [❌ - Implemented alr (ATM Firewall)]
7. ~~Lebanese Loop~~ [ Hard to Detect ]
8. ~~Cash Trapping~~ [ Hard to Detect ]

## Ideas
> Possible ideas to mitigate the risks
1. **Computer Vision** (OpenCV) - Addison
   - Facial / Emotion Recognition
   - Hostile Object Recognition (E.g; Knife, Gun)
2. **Covered Camera Check** - Addison
   - Checks if camera of ATM is covered / broken.
3. **Mobile App** - Addison
   - To utilize Biometrics (fingerprint / face recognition)
4. **Outlier Analysis** (ML) - Paul & Haziq
   - Check for outlier when withdrawing cash.
   - If an account receives a large amount of money within a short period, mark account as "Suspicious".
   - If an account withdraws a large amount of money within a short period, mark account as "Suspicious".
   - If an account receives many transactions from multiple accounts within a short period, mark account as "Suspicious".
5. **Extra Validations** - Fredor
   - Withdrawal : Fingerprint + Age Check (if elderly / large amount :: show warning prompt of scam possibility)
   - Transfer of Funds : Check if address of transfer is "Blacklisted" or "Suspicious"
   - Integrate w/ ML to detect outliers > Prompt/Notify users.
   - (esp for Senior Citizen) & Scams.
6. **Database Leak Checker** (HaveIBeenPwned API) - Jia Hau
   - Check if user's data has been leaked, send a pop-up notification on the ATM **ONCE**.
7. **Message Alert** (Webhook) - Addison
   - Integrate w/ Database Leak Checker & Authentications (OpenCV & Pin failure).
   - Send a message to the user's phone when the ATM detects a suspicious activity (ML - #4).
   - Send alert when user is withdrawing a large amount of money (#5).
   - Send alert if user is transferring money to a suspicious (blacklisted) account (#5).
   - Send an alert if user is in a hostage situation (#1).
8.  **NFC/EVC Chip Biometrics** - Fredor & Addison
       - Read Card Number > Query backend > Get biometric "fingerprint"/hash > Compare with user's biometrics
9.  ~~**Digital Numberpad**~~ 
    ~~- Scrambled "numberpad" to prevent thermal imaging & shoulder surfing.~~

## Potential Validations
> Necessary validations to improve user experience
1. Validation for older people [❌]
2. Validation for large withdrawals [❌]
3. Validation towards potential scams [❌]

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
</details>
