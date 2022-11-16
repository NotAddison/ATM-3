@REM Call API Server
Echo off
Echo ">> Starting API Server . . ."
start cmd /c "cd API && node index.js"


@REM Call Python Scripts
Echo ">> Starting Python (1/2) - Object Detection ..."
start cmd /c "Python Python/OpenCV/ObjectV2.py"
Echo ">> Starting Python (1/2) - Emotion Detection ..."
start cmd /c "Python Python/OpenCV/EmotionV2_Cover.py"

@REM Start ML
Echo ">> Starting Outlier Analysis (ML) . . ."
start cmd /c "Python Python/ML/OutlierAnalysis.py"

@REM Start Flutter
Echo ">> Starting Flutter . . ."
start cmd /c "cd App/pfd_ocbc && flutter run lib/main.dart"

@REM Call Web Server
Echo ">> Starting Web Server . . ."
Echo "<!> Need to manually run live server"
cd Web/HTML
start "" "index.html"
