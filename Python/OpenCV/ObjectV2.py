from threading import Thread
# Purpose: Run multiple OpenCV Scripts at the same time (via threads; parallel processing.)
print("\n"*100)
print("Loading ObjectV2.py...")

# --- ⚙ Dependencies ⚙ ---
import cv2
from cv2 import cuda
import requests
from time import time
import os
from deepface import DeepFace

# Import Webhook Python File
import sys
sys.path.insert(1, "Python\Webhook")
import Hook as Webhook

# --- ⚙ OpenCV Settings ⚙ ---
cam = 1                 # Camera ID [0 = Default Camera | 1 = External Camera | addr = Path to Video File]
threshold = 0.55        # Main threshold for obj detection [aka, sensitivity]
toMirror = True         # Mirrors the projected frames (Use True if you're using a webcam & Left and right are mirrored)

font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.6
thickness = 1
bbox_color = (255,169,0)
debug_Colour = (77, 40, 225)    # Colour of debugging text
text_colour = debug_Colour

# Webcam Resolution Settings
width = 1920
height = 720

# --- ⚙ Settings ⚙ ---
danger_item = ["scissors", "knife"]
emotion = ["worried", "nervous", "fearful", "fear"]
isLight = False

useGPU = True
isSentHostage = False
isSentCovered = False
isCovered = False
isCalibrated = False
default_sharpness = 0

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
if useGPU:
    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
    net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

model = cv2.dnn_DetectionModel(net)
model.setInputParams(size=(512, 512), scale=1/255)


# --- ⚙ Load Classes ⚙ ---
with open(classes, 'r') as f:
    classes = [line.strip() for line in f.readlines()]
print(f">> Loaded {len(classes)} classes...")


# --- ⚙ Detection Functions ⚙ ---
def ObjectDetection(frame):
    classid, scores, boxes = model.detect(frame, threshold, 0.4)
    for (classid,score,box) in zip(classid,scores,boxes):
        x,y,w,h = box
        label = f"{classes[classid]} | {score}"
        cv2.rectangle(frame, (x,y), (x+w,y+h), bbox_color, thickness)
        cv2.putText(frame, label, (x,y-10), font, font_scale, text_colour, thickness)
        return classes[classid] in danger_item
            

# --- ⚙ Main ⚙ ---
# > Camera Setup [0 = Default Camera | 1 = External Camera | addr = Path to Video File]
video = cv2.VideoCapture(cam)
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

    # FPS Calculation & output
    fps = (1/(time() - loop_time))
    loop_time = time()
    cv2.putText(frame, f'FPS: {fps}', (20,height-20), font, font_scale, debug_Colour, 1, cv2.LINE_AA)  # Display FPS Count

    cv2.putText(frame, f"HasWeapon: {hasWeapon}", (20, 50), font, font_scale, text_colour, thickness)
    cv2.putText(frame, f"isCovered: {isCovered}", (20, 90), font, font_scale, text_colour, thickness)
    # cv2.putText(frame, f"API (covered) Request Sent: {isSentCovered}", (20, height-60), font, font_scale, text_colour, thickness)
    cv2.putText(frame, f"API (hostage) Request Sent: {isSentHostage}", (20, height-40), font, font_scale, text_colour, thickness)

    # Display Output
    cv2.imshow("Object Detection", frame)
    
    # Check if user is being held hostage (Weapon found & Negative Emotion)
    if hasWeapon:
        print("[Alert!] >> Weapon Detected!")
        try:
            r = requests.post(f'http://localhost:3000/auth/weapon/{True}')   # Send Status to API
            # Webhook.SendHostageHook()   # Send Status to Webhook
        except:
            print("ObjectV2.py: API Connection Error")
            pass
    else:
        print("")
        try:
            r = requests.post(f'http://localhost:3000/auth/weapon/{False}')   # Send Status to API
            # Webhook.SendHostageHook()   # Send Status to Webhook
        except:
            print("ObjectV2.py: API Connection Error")
            pass

    # Exit on 'ESC' Key
    if cv2.waitKey(1) == 27: 
        break 
video.release()
cv2.destroyAllWindows()