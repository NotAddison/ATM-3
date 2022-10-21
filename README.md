# PFD-2022
Portfolio Development (2022) - **OCBC ATM 3.0**
> Notion Link: https://not-addison.notion.site/PFD-Plan-b576caeb2021486b8e30266434d8c97d

> APP/API Flow: -soon-

## Security Risks
> Possible security risks that ATMs faces
1. PIN Thermal Imaging [❌ - #2]
2. Shoulder Surfing [❌ - #2]
3. Database Leaks [❌ - #5]
4. Scams [❌ - #3 & #4]
5. Card Skimming [❌ - #7]
6. ~~Network Attack~~ [❌ - Implemented alr (ATM Firewall)]
7. ~~Lebanese Loop~~ [ Hard to Detect ]
8. ~~Cash Trapping~~ [ Hard to Detect ]

## Ideas
> Possible ideas to mitigate the risks
1. **Computer Vision** (OpenCV) - Addison
   - Facial / Emotion Recognition
   - Hostile Object Recognition (E.g; Knife, Gun)
2. **Digital Numberpad** - Addison
3. **Outlier Analysis** (ML) - Paul
4. **Extra Validations** - 
   - Integrate w/ ML to detect outliers > Prompt/Notify users
   - (esp for Senior Citizen) & Scams
5. **Database Leak Checker** (HaveIBeenPwned API) - 
6. **Message Alert** (Webhook) - 
7. **NFC/EVC Chip Biometrics Embedding** - [ If have time ]

## Misc
> Naming Conventions, Git, References & Credits

<details>
<summary><b>Naming Conventions</b></summary>
- <b>Commits</b> : Buff a unit by 1 Attack and 1 Defense (HP) <br>
- <b>Functions</b> : PascalCase, Function names start with a capital letter. (E.g: ParseJson()) <br>
- <b>Variables</b>: camelCase or Hungarian Notation. (E.g: isValid or **b**IsValid)<br>
- <b>Constants</b>: All uppercase. (E.g: const int MAX_SIZE = 100;)<br>
- <b>Classes</b>: PascalCase, Class names start with a capital letter. (E.g: class MyClass)<br>
- <b>Asset Files</b>: PascalCase, File names start with a capital letter. (E.g: MyFile.txt)<br>
- <b>Script Files</b>: PascalCase or snake_case, File names start with a lowercase letter. (E.g: my_script.py or MyScript.py)<br>

- **References**: 
- > Commit: https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/
- > Coding Practices: https://curc.readthedocs.io/en/latest/programming/coding-best-practices.html
</details>

<details>
<summary><b>References / Credits</b></summary>
- UX of digital randomized Numberpad : https://uxpajournal.org/usability-evaluation-of-randomized-keypad/<br>

</details>