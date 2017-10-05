// @flow

import { JSDOM } from 'jsdom';

// We can use jsdom-global at some point if maintaining that list turns out to be a burden.
const KEYS = ['HTMLElement'];

function createDOM() {
  const dom = new JSDOM('');
  global.window = dom.window;
  global.document = undefined;

  Object.keys(dom.window).forEach(property => {
    if (typeof global[property] === 'undefined') {
      global[property] = dom.window[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };

  KEYS.forEach(key => {
    global[key] = window[key];
  });
}

export default createDOM;
