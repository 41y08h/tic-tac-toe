export default async function getMediaStream() {
  const cameraSupported = "mediaDevices" in navigator;
  if (!cameraSupported) throw new Error("Bad camera support");

  const options = { video: true, audio: true, facingMode: "user" };
  const stream = await navigator.mediaDevices.getUserMedia(options);
  return stream;
}
