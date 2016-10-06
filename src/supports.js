// @flow

const win = window;

export const addEventListener = 'addEventListener' in win;
export const removeEventListener = 'removeEventListener' in win;

// IE8+ Support
export const attachEvent = 'attachEvent' in win;
export const detachEvent = 'detachEvent' in win;
