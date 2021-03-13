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


cough_audio_filename = "cough_sample_audio_mel.png"
breath_audio_filename = "breath_sample_audio_mel.png"
count_audio_filename = "count_sample_audio_mel.png"
a_audio_filename = "aaa_sample_audio_mel.png"
e_audio_filename = "eee_sample_audio_mel.png"
o_audio_filename = "ooo_sample_audio_mel.png"

cnn_mel_a = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_a.h5'))
cnn_mel_breath = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_breath.h5'))
cnn_mel_cough = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_cough.h5'))
cnn_mel_counting = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_counting.h5'))
cnn_mel_e = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_e.h5'))
cnn_mel_o = load_model(os.path.join(model_dir_path, 'h5', 'cnn_mel_o.h5'))

# print(" ***** h5 models loaded ")

def mel(file, model):
    if '.png' in file:
        img_mel = cv2.imread(file)
        resized_mel = cv2.resize(img_mel, (128, 128))
        reshaped_mel = resized_mel.reshape(1, 128, 128, 3)
        reshaped_norm_mel = reshaped_mel.astype('float32')
        reshaped_norm_mel = reshaped_norm_mel/255.0

        pred = np.argmax(model.predict(reshaped_norm_mel), axis =  1)
        return pred

pred_cough = mel(os.path.join(assets_dir, cough_audio_filename), cnn_mel_cough)
pred_breath = mel(os.path.join(assets_dir, breath_audio_filename), cnn_mel_breath)
pred_count = mel(os.path.join(assets_dir, count_audio_filename), cnn_mel_counting)
pred_a = mel(os.path.join(assets_dir, a_audio_filename), cnn_mel_a)
pred_e = mel(os.path.join(assets_dir, e_audio_filename), cnn_mel_e)
pred_o = mel(os.path.join(assets_dir, o_audio_filename), cnn_mel_o)

# print(pred_cough)
# print(pred_breath)
# print(pred_count)
# print(pred_a)
# print(pred_e)

# print(pred_o)

prediction = (0.2*pred_cough + 0.05*pred_breath + 0.2*pred_count + 0.2*pred_a + 0.2*pred_e + 0.15*pred_o)*100
print(prediction[0])

# for filename in os.listdir(assets_dir):
#     file = os.path.join(assets_dir, filename)
#     os.remove(file)

# end = time.time()

# print(end-start)