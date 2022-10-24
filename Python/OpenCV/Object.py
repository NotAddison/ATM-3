from pickle import TRUE
import cv2
from time import time
import requests

print("\n"*100)

# --- ⚙ Settings ⚙ ---
danger_item = ["scissors", "knife"]
isSent = False
isLight = False         # Toggle for YoloV4 Model type (light = smaller, less accurate | normal = bigger, more accurate)

# --- ⚙ OpenCV Settings ⚙ ---
threshold = 0.55        # Main threshold for obj detection [aka, sensitivity]
toMirror = True         # Mirrors the projected frames (Use True if you're using a webcam & Left and right are mirrored)


font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 0.6
thickness = 2
bbox_color = (255,169,0)
text_colour = (0,255,0)

debug_Colour = (77, 40, 225)    # Colour of debugging text

# --- ⚙ Models / Labels Directory ⚙ ---
if isLight:
    weights = r"Python\OpenCV\Assets\Object\yolov4-tiny.weights"
    config = r"Python\OpenCV\Assets\Object\yolov4-tiny.cfg"
else:
    weights = r"Python\OpenCV\Assets\Object\yolov4.weights"
    config = r"Python\OpenCV\Assets\Object\yolov4.cfg"
    
classes = r"Python\OpenCV\Assets\Object\classes.txt"

# --- ⚙ Load Models ⚙ ---
net = cv2.dnn.readNet(weights, config)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

model = cv2.dnn_DetectionModel(net)
model.setInputParams(size=(512, 512), scale=1/255)

# --- ⚙ Load Classes ⚙ ---
with open(classes, 'r') as f:
    classes = [line.strip() for line in f.readlines()]

print(f">> Loaded {len(classes)} classes...")

# --- ⚙ Main ⚙ ---
# // -- OpenCV Read Video (frames) --
# VideoCapture(0)       : 0 = Default Camera
# VideoCapture(1)       : 1 = External Camera
# VideoCapture(addr)    : addr = Path to Video File
video = cv2.VideoCapture(0)
loop_time = time() # Time Bookmark
while True:
    ret,frame = video.read()
    if not ret:
        break
    if toMirror:
        frame = cv2.flip(frame, 1)
    classid, scores, boxes = model.detect(frame, threshold, 0.4)
    for (classid,score,box) in zip(classid,scores,boxes):
        x,y,w,h = box

        label = f"{classes[classid]} | {score}"
        cv2.rectangle(frame, (x,y), (x+w,y+h), bbox_color, thickness)
        cv2.putText(frame, label, (x,y-10), font, font_scale, text_colour, thickness)

        if classes[classid] in danger_item:
            if not isSent: # Check if request is already sent.
                print("[!] DANGEROUS OBJECT DETECTED!")
                try:
                    r = requests.post(f'http://localhost:3000/auth/3/{True}')
                    print(f"Object.py: {r.status_code}")
                    isSent = True
                except:
                    print("Object.py: Failed to send request.")
                    pass

    # FPS Calculation & output
    fps = (1/(time() - loop_time))
    loop_time = time()
    # print("FPS: ", fps)
    cv2.putText(frame, f'FPS: {fps}', (20,100), font, font_scale, debug_Colour, 1, cv2.LINE_AA)  # Display FPS Count

    cv2.imshow("Object Detection", frame)
    
    # Exit on 'ESC' Key
    if cv2.waitKey(1) == 27: 
        break 
video.release()
cv2.destroyAllWindows()
    
