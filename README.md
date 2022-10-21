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
