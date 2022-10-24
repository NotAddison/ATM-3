from threading import Thread
# Purpose: Run multiple OpenCV Scripts at the same time (via threads; parallel processing.)
print("\n"*100)
print("Loading Vision.py...")

# --- ⚙ Dependencies ⚙ ---
import cv2
from cv2 import cuda
import requests
from time import time
import os
from deepface import DeepFace

# --- ⚙ OpenCV Settings ⚙ ---
threshold = 0.55        # Main threshold for obj detection [aka, sensitivity]
toMirror = True         # Mirrors the projected frames (Use True if you're using a webcam & Left and right are mirrored)

font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.6
thickness = 2
bbox_color = (255,169,0)
text_colour = (0,255,0)
debug_Colour = (77, 40, 225)    # Colour of debugging text

# Webcam Resolution Settings
width = 1920
height = 720

# --- ⚙ Settings ⚙ ---
danger_item = ["scissors", "knife"]
emotion = ["worried", "nervous", "fearful", "fear"]
isLight = False

isSent = False

# --- ⚙ Load Models ⚙ ---
# > Object Detection <
print(">> Loading Object Detection Models...")
if isLight:
    weights = r"Python\OpenCV\Assets\Object\yolov4-tiny.weights"
    config = r"Python\OpenCV\Assets\Object\yolov4-tiny.cfg"
else:
    weights = r"Python\OpenCV\Assets\Object\yolov4.weights"
    config = r"Python\OpenCV\Assets\Object\yolov4.cfg"
classes = r"Python\OpenCV\Assets\Object\classes.txt"

net = cv2.dnn.readNet(weights, config)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

model = cv2.dnn_DetectionModel(net)
model.setInputParams(size=(512, 512), scale=1/255)

# > Emotion Recognition <
print(">> Loading Emotion Recognition Models...")
cascadeDir = "C:\Python310\Lib\site-packages\cv2\data\haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadeDir)

# --- ⚙ Load Classes ⚙ ---
with open(classes, 'r') as f:
    classes = [line.strip() for line in f.readlines()]
print(f">> Loaded {len(classes)} classes...")


# --- ⚙ Detection Functions ⚙ ---
def ObjectDetection(frame):
    classid, scores, boxes = model.detect(frame, threshold, 0.4)
    for (classid,score,box) in zip(classid,scores,boxes):
        if classes[classid] in danger_item:
            x,y,w,h = box

            label = f"{classes[classid]} | {score}"
            cv2.rectangle(frame, (x,y), (x+w,y+h), bbox_color, thickness)
            cv2.putText(frame, label, (x,y-10), font, font_scale, text_colour, thickness)
            return classes[classid] in danger_item

    

def EmotionRecognition(frame):
    result = DeepFace.analyze(frame, actions = ['emotion'], enforce_detection=False, prog_bar=False)
    # print(result['dominant_emotion'])

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray, 1.1, 4)
    
    # Bounding Boxes (Detected Faces)
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), bbox_color, thickness)
        
    cv2.putText(frame, f"Emotion: {result['dominant_emotion']}", (20, 30), font, font_scale, text_colour, thickness)

    return result['dominant_emotion'] in emotion


# --- ⚙ Main ⚙ ---
# > Camera Setup [0 = Default Camera | 1 = External Camera | addr = Path to Video File]
video = cv2.VideoCapture(0)
video.set(cv2.CAP_PROP_FRAME_WIDTH, width)
video.set(cv2.CAP_PROP_FRAME_HEIGHT, height)

loop_time = time() # Time Bookmark (FOR FPS)
# > Main Loop
while True:
    # > Read Video Frame
    ret,frame = video.read()

    # Camera Check (Checks if camera is working)
    if not ret: break
    if toMirror: frame = cv2.flip(frame, 1)

    # Detections
    hasWeapon = ObjectDetection(frame)
    hasNegativeEmotion = EmotionRecognition(frame)

    # FPS Calculation & output
    fps = (1/(time() - loop_time))
    loop_time = time()
    cv2.putText(frame, f'FPS: {fps}', (20,700), font, font_scale, debug_Colour, 1, cv2.LINE_AA)  # Display FPS Count

    print("\n"*100)
    cv2.putText(frame, f"HasWeapon: {hasWeapon}", (20, 50), font, font_scale, text_colour, thickness)
    print(f"[Vision.py] >> HasWeapon: {hasWeapon} | NegativeEmotions: {hasWeapon} | isSent: {isSent}")

    # Display Output
    cv2.imshow("Object & Emotion Detection", frame)
    
    if hasWeapon and hasNegativeEmotion:
        print("[Alert!] >> Weapon and Negative Emotion Detected!")
        # Send Alert to Server
        if not isSent: # Check if request is already sent.
            print("[!] DANGEROUS OBJECT DETECTED!")
            isSent = True
            try:
                r = requests.post(f'http://localhost:3000/auth/3/{True}')
                print(f"Object.py: {r.status_code}")
            except:
                print("Object.py: Failed to send request.")
                pass

    # Exit on 'ESC' Key
    if cv2.waitKey(1) == 27: 
        break 
video.release()
cv2.destroyAllWindows()
        