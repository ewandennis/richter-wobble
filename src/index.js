import frame from './frame';
import { render } from './canvas';

import { record } from './record';

// ----------------------------------------------------------------------------

const runOptions = {
  renderFn: render,
  parentId: 'gerhardt',
  fps: 30
};

const recordingDuration = 5;
const videoDims = { width: 800, height: 800 };
const enableVideoRecording = true;

// ----------------------------------------------------------------------------

window.addEventListener('error', err => {
  alert(`${err.filename} ${err.lineno}:${err.colno}: ${err.message}`);
});

const documentDims = () => ({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
});

const identityFn = arg => () => arg;

const yes = () => true;

const limitFps = fps => {
  let lastT = 0;
  const frameDelta = (1 / fps) * 1000;
  return t => {
    if (t - lastT < frameDelta) {
      return false;
    }
    lastT = t;
    return true;
  };
};

// ----------------------------------------------------------------------------

const run = ({ parentId, renderFn, dimsFn = documentDims, fps = 0 }) => {
  const fpsLimitFn = fps ? limitFps(fps) : yes;
  const renderFrame = t => {
    requestAnimationFrame(renderFrame);
    if (!fpsLimitFn(t)) {
      return;
    }
    const { width, height } = dimsFn();
    frame({ parentId, renderFn, width, height, t });
  };
  renderFrame();
};

document.addEventListener('DOMContentLoaded', () => {
  if (enableVideoRecording) {
    record({
      ...runOptions,
      run,
      duration: recordingDuration,
      dimsFn: identityFn(videoDims)
    });
  } else {
    run(runOptions);
  }
});

// ----------------------------------------------------------------------------

window.addEventListener('error', err => {
  alert(`${err.filename} ${err.lineno}:${err.colno}: ${err.message}`);
});
