import React from "react";
import logOnlyDevelopment from "../log/log";

export default class Recorder {
  constructor(doAfterOnStart) {
    this.doAfterOnRecording = doAfterOnStart;
  }

  setRecorder(setOptions, setDefaultOption, setRecordingState) {
    this.setAudioEnvironment(null);

    this.getConnectedAudioDevices().then((devices) => {
      const options = [];
      for (let i = 0; i < devices.length; ++i) {
        options.push(devices[i]);
        logOnlyDevelopment("푸시");
      }
      setOptions(options);
      setDefaultOption(options[0]);
      setRecordingState({
        options: options,
        defaultOption: options[0],
        isRecording: false,
      });
    });
  }

  async getConnectedAudioDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter((device) => device.kind === "audioinput")
      .map((device) => {
        return { value: device.deviceId, label: device.label };
      });
  }

  setAudioEnvironment(deviceId) {
    const record = document.getElementById("record");
    const stop = document.getElementById("stop");
    const audio = document.getElementById("audio");
    const chkHearMic = document.getElementById("chk-hear-mic");

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 오디오 컨텍스트 정의

    const analyser = audioCtx.createAnalyser();

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    if (navigator.mediaDevices) {
      logOnlyDevelopment("getUserMedia supported.");

      const constraint = {
        audio: { deviceId: deviceId ? { exact: deviceId } : undefined },
      };
      let chunks = [];

      navigator.mediaDevices
        .getUserMedia(constraint)
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          chkHearMic.onchange = (e) => {
            logOnlyDevelopment("되나?");
            if (e.target.checked) {
              audioCtx.resume();
              makeSound(stream);
            } else {
              audioCtx.suspend();
            }
          };

          record.onclick = () => {
            mediaRecorder.start();
            logOnlyDevelopment(mediaRecorder.state);
            logOnlyDevelopment("recorder started");
            this.doAfterOnRecording(true);
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            logOnlyDevelopment(mediaRecorder.state);
            logOnlyDevelopment("recorder stopped");
            this.doAfterOnRecording(false);
          };

          mediaRecorder.onstop = (e) => {
            logOnlyDevelopment(
              "data available after MediaRecorder.stop() called."
            );

            const blob = new Blob(chunks, {
              type: "audio/ogg codecs=opus",
            });
            chunks = [];
            audio.src = URL.createObjectURL(blob);
            logOnlyDevelopment("recorder stopped", audio.src);
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
        })
        .catch((err) => logOnlyDevelopment(err));
    }
  }
}
