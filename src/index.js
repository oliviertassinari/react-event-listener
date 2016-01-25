import React from 'react';

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

function listenersForEach(props, callback) {
  const {
    elementName,
    ...other,
  } = props;

  const element = window[elementName];

  for (const eventIdentifier in other) {
    const eventName = eventIdentifier.substring(2).toLowerCase();

    callback(element, eventName, other[eventIdentifier]);
  }
}

export default class EventListener extends React.Component {
  static propTypes = {
    /**
     * Name of the element that we will be listening to.
     */
    elementName: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    listenersForEach(this.props, (element, eventName, callback) => {
      on(element, eventName, callback);
    });
  }

  componentWillUnmount() {
    listenersForEach(this.props, (element, eventName, callback) => {
      off(element, eventName, callback);
    });
  }

  render() {
    return null;
  }
}
