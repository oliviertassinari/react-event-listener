// @flow

// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const addEventListener = canUseDOM && 'addEventListener' in window;
export const removeEventListener = canUseDOM && 'removeEventListener' in window;

// IE8+ Support
export const attachEvent = canUseDOM && 'attachEvent' in window;
export const detachEvent = canUseDOM && 'detachEvent' in window;
