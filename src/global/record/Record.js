export default class Record {
  getPermission() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((res) => {
        console.log("오디오 권한 요청", res);
      });
  }
}
