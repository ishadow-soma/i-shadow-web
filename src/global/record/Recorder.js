import React from "react";

export default class Recorder {
  constructor(doAfterOnStart) {
    this.doAfterOnRecording = doAfterOnStart;
  }

  async setRecorder() {
    this.setAudioEnvironment(null);

    const res = await this.getConnectedAudioDevices().then((devices) => {
      const options = [];
      for (let i = 0; i < devices.length; ++i) {
        options.push(devices[i]);
        console.log("푸시");
      }
      return options;
    });

    console.log("res", res);
    return res;
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
      console.log("getUserMedia supported.");

      const constraint = {
        audio: { deviceId: deviceId ? { exact: deviceId } : undefined },
      };
      let chunks = [];

      navigator.mediaDevices
        .getUserMedia(constraint)
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          chkHearMic.onchange = (e) => {
            console.log("되나?");
            if (e.target.checked) {
              audioCtx.resume();
              makeSound(stream);
            } else {
              audioCtx.suspend();
            }
          };

          record.onclick = () => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            this.doAfterOnRecording(true);
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            this.doAfterOnRecording(false);
          };

          mediaRecorder.onstop = (e) => {
            console.log("data available after MediaRecorder.stop() called.");

            const blob = new Blob(chunks, {
              type: "audio/ogg codecs=opus",
            });
            chunks = [];
            audio.src = URL.createObjectURL(blob);
            console.log("recorder stopped");
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
        })
        .catch((err) => console.log(err));
    }
  }
}
