@REM Seleciton
Echo off
cls

Echo Checking for dependencies . . .
pip install -r requirements.txt

cls

@REM prompt to start emulator
Echo Do you want to start the emulator? (Y/N)
set /p startEmulator=Enter Y or N:

@REM Get Selected mode
if %startEmulator%==Y goto startEmulator
if %startEmulator%==y goto startEmulator


cls
@ REM Start Menu
:menu
cd /d %~dp0
Echo off
cls
Echo Select a mode to start:
Echo 1. Start All
Echo 2. Start API Server
Echo 3. Start Python Computer Vision
Echo 4. Start Outlier Analysis (ML)
Echo 5. Start Flutter
Echo 6. Start Web Server
Echo 7. Exit
set /p mode=Enter a mode number:

@REM Get Selected mode
if %mode%==1 goto startAll
if %mode%==2 goto startAPI
if %mode%==3 goto startPython
if %mode%==4 goto startML
if %mode%==5 goto startFlutter
if %mode%==6 goto startWeb
if %mode%==7 goto exit

@REM Create start API function
:startAPI
Echo off
Echo Starting API Server . . .
start cmd /c "cd API && node index.js"
goto exit


@REM Create start Python function
:startPython
Echo off
Echo Starting Python - Vision Detection . . .
start cmd /c "Python Python/OpenCV/Vision.py"
goto exit


@REM Create start ML function
:startML
Echo off
Echo Starting Outlier Analysis (ML) . . .
start cmd /c "Python Python/ML/OutlierAnalysis.py"
goto exit


@REM Create start Flutter function
:startFlutter
Echo off
Echo Starting Flutter . . .
start cmd /c "cd App && flutter run lib/main.dart"
goto exit


@REM Create start Web function
:startWeb
Echo off
Echo Starting Web Server . . .
Echo Need to manually run live server
@REM cd Web/HTML/Index
start cmd /c  "cd Web/HTML/Index && index.html"
start cmd /c  "cd Web/HTML/Dashboard && index.html"
goto exit


@REM Create start All function
:startAll
Echo off
Echo Starting All . . .
call :startAPI
call :startPython
call :startML
call :startFlutter
call :startWeb
goto exit

@REM Start Emulator
:startEmulator
cls
Echo off
cd C:\Users\%username%\AppData\Local\Android\sdk\tools
emulator -list-avds
set /p android=Enter emulator name:
Echo Selected: %android%
Echo Starting Emulator . . .
cd /d C:\Users\%username%\AppData\Local\Android\Sdk\emulator
start cmd /c "emulator -avd %android%"
goto menu


:exit