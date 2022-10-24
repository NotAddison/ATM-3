import cv2
from cv2 import cuda
import requests
from time import time

# --- ⚙ Load Models ⚙ ---
from deepface import DeepFace

# --- ⚙ Settings ⚙ ---
target = ["worried", "nervous", "fearful", "fear"]
isSent = False

# --- ⚙ OpenCV Settings ⚙ ---
threshold = 0.55        # Main threshold for obj detection [aka, sensitivity]
toMirror = True         # Mirrors the projected frames (Use True if you're using a webcam & Left and right are mirrored)

font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.6
thickness = 2
bbox_color = (255,169,0)
text_colour = (0,255,0)

debug_Colour = (77, 40, 225)    # Colour of debugging text

# --- ⚙ Main ⚙ ---
faceCascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
print(">> Loaded Haar Cascade Classifier... | " + str(faceCascade.empty()))

video = cv2.VideoCapture(0)
if not video.isOpened():
    raise IOError("Cannot open webcam")

loop_time = time() # Time Bookmark

while True:
    ret, frame = video.read()
    if toMirror:
        frame = cv2.flip(frame, 1)

    result = DeepFace.analyze(frame, actions = ['emotion'], enforce_detection=False)
    print(result['dominant_emotion'])

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray, 1.1, 4)
    
    # Bounding Boxes (Detected Faces)
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), bbox_color, thickness)
        
    cv2.putText(frame, f"Emotion: {result['dominant_emotion']}", (10, 30), font, font_scale, text_colour, thickness)
    cv2.putText(frame, f"Confidence: {result['dominant_emotion']}", (10, 60), font, font_scale, text_colour, thickness)

    # FPS Calculation & output
    fps = (1/(time() - loop_time))
    loop_time = time()
    cv2.putText(frame, f'FPS: {fps}', (20,100), font, font_scale, debug_Colour, 1, cv2.LINE_AA)  # Display FPS Count

    cv2.imshow("Emotion Detection", frame)
    
    # Exit on 'ESC' Key
    if cv2.waitKey(1) == 27: 
        break 
video.release()
cv2.destroyAllWindows()



