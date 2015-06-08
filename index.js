'use strict';

function on(element, type, callback) {
  if (element.addEventListener) {
    element.addEventListener(type, callback);
  } else { // IE8+ Support
    element.attachEvent('on' + type, function () {
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
  for (var elementName in listeners) {
    var element = window[elementName];
    var eventNames = listeners[elementName];

    for (var eventName in eventNames) {
      callback(element, eventName, eventNames[eventName]);
    }
  }
}

module.exports = {
  componentDidMount: function componentDidMount() {
    var self = this;

    listenersForEach(this.listeners, function(element, eventName, callbackName) {
      on(element, eventName, self[callbackName]);
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    var self = this;

    listenersForEach(this.listeners, function(element, eventName, callbackName) {
      off(element, eventName, self[callbackName]);
    });
  },
};
