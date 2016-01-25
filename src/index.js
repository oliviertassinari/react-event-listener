function on(element, type, callback) {
  if (element.addEventListener) {
    element.addEventListener(type, callback);
  } else { // IE8+ Support
    element.attachEvent('on' + type, () => {
      callback.call(element);
    });
  }
}

function off(element, type, callback) {
  if (element.removeEventListener) {
    element.removeEventListener(type, callback);
  } else { // IE8+ Support
    element.detachEvent('on' + type, callback);
  }
}

function listenersForEach(listeners, callback) {
  for (const elementName in listeners) {
    const element = window[elementName];
    const eventNames = listeners[elementName];

    for (const eventName in eventNames) {
      callback(element, eventName, eventNames[eventName]);
    }
  }
}

export default {
  componentDidMount() {
    listenersForEach(this.listeners, (element, eventName, callbackName) => {
      on(element, eventName, this[callbackName]);
    });
  },
  componentWillUnmount() {
    listenersForEach(this.listeners, (element, eventName, callbackName) => {
      off(element, eventName, this[callbackName]);
    });
  },
};
