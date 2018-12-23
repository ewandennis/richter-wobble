import CCapture from "ccapture.js";

export const record = ({ run, renderFn, duration, fps, ...rest }) => {
  const capture = new CCapture({
    framerate: fps,
    format: "png",
    timeLimit: duration
  });

  let frameCount = 0;
  let capturing = true;
  const renderAndCapture = opts => {
    const canvas = renderFn(opts);
    if (frameCount < duration * fps) {
      capture.capture(canvas);
    } else if (capturing) {
      capturing = false;
      capture.stop();
    }
    frameCount += 1;
  };

  capture.start();
  run({ renderFn: renderAndCapture, ...rest });
};
