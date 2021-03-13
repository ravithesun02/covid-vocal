import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.models import load_model
import cv2
import time
import sys
start = time.time()

model_dir_path = 'model'

assets_dir = os.path.join('audio_samples',sys.argv[1])

cough_audio_filename = "cough_sample_audio.wav"
breath_audio_filename = "breath_sample_audio.wav"
count_audio_filename = "count_sample_audio.wav"
a_audio_filename = "aaa_sample_audio.wav"
e_audio_filename = "eee_sample_audio.wav"
o_audio_filename = "ooo_sample_audio.wav"

cnn_mel_all = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_all.h5'))


# print(" ***** h5 models loaded ")

def mel(file, model):
    if '.wav' in file:
        x, sr = librosa.load(file, res_type='kaiser_fast')
        mel = librosa.feature.melspectrogram(x, sr=sr)
        mel = librosa.power_to_db(mel, ref=np.max)
        x = librosa.display.specshow(mel, y_axis='mel', x_axis='time')
        mel_file = file[:-4] + '_mel.png'
        plt.savefig(mel_file, bbox_inches = 'tight', pad_inches = -0.5)
        plt.clf()
        plt.close()

        img_mel = cv2.imread(mel_file)
        resized_mel = cv2.resize(img_mel, (128, 128))
        reshaped_mel = resized_mel.reshape(1, 128, 128, 3)
        reshaped_norm_mel = reshaped_mel.astype('float32')
        reshaped_norm_mel = reshaped_norm_mel/255.0

        pred = np.argmax(model.predict(reshaped_norm_mel), axis =  1)
        return pred

pred_cough = mel(os.path.join(assets_dir, cough_audio_filename), cnn_mel_all)
pred_breath = mel(os.path.join(assets_dir, breath_audio_filename), cnn_mel_all)
pred_count = mel(os.path.join(assets_dir, count_audio_filename), cnn_mel_all)
pred_a = mel(os.path.join(assets_dir, a_audio_filename), cnn_mel_all)
pred_e = mel(os.path.join(assets_dir, e_audio_filename), cnn_mel_all)
pred_o = mel(os.path.join(assets_dir, o_audio_filename), cnn_mel_all)

# print(pred_cough)
# print(pred_breath)
# print(pred_count)
# print(pred_a)
# print(pred_e)
# print(pred_o)
breath_msg=""
cough_msg=""
count_msg=""
a_msg=""
e_msg=""
o_msg=""


if pred_breath[0] != 0:  
    breath_msg="Please re-upload breath sample;" 
if pred_cough[0] != 1:
    cough_msg="Please re-upload cough sample;"
if pred_count[0] != 2:
    count_msg="Please re-upload count sample;"
if pred_a[0] != 3:
    a_msg="Please re-upload aaa sample;"
if pred_e[0] != 4:
    e_msg="Please re-upload eee sample;"
if pred_o[0] != 5:
    o_msg="Please re-upload ooo sample;"

msg=breath_msg+count_msg+cough_msg+a_msg+e_msg+o_msg

print(msg)
