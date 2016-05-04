/* @flow */

import React, {Component, PropTypes} from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

function on(target: Object, eventName: string, callback: Function, capture?: boolean): void {
  if (target.addEventListener) {
    target.addEventListener(eventName, callback, capture);
  } else if (target.attachEvent) { // IE8+ Support
    target.attachEvent(`on${eventName}`, () => {
      callback.call(target);
    });
  }
}
function off(target: Object, eventName: string, callback: Function, capture?: boolean): void {
  if (target.removeEventListener) {
    target.removeEventListener(eventName, callback, capture);
  } else if (target.detachEvent) { // IE8+ Support
    target.detachEvent(`on${eventName}`, callback);
  }
}

type Props = {
  children?: React.Element,
  capture: boolean,
  target?: EventTarget,
  [event: string]: Function
};

type DefaultProps = {
  capture: boolean
};

function forEachListener(props: Props, iteratee: (eventName: string, listener: Function) => any): void {
  for (const name in props) {
    if (name.substring(0, 2) === 'on' && props[name] instanceof Function) {
      const eventName = name.substring(2).toLowerCase();
      iteratee(eventName, props[name]);
    }
  }
}

export default class EventListener extends Component<DefaultProps, Props, void> {
  static propTypes = {
    /**
     * Whether to use capturing listeners.
     */
    capture: PropTypes.bool.isRequired,
    /**
     * You can provide a children too.
     */
    children: PropTypes.node,
    /**
     * The DOM target to listen to.
     */
    target: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
    ]),
  };

  static defaultProps = {
    capture: false,
  };

  componentDidMount(): void {
    this.addListeners();
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUpdate(): void {
    this.removeListeners();
  }

  componentDidUpdate(): void {
    this.addListeners();
  }

  componentWillUnmount(): void {
    this.removeListeners();
  }

  addListeners(): void {
    const {
      capture,
      target,
    } = this.props;

    if (target) {
      let element = target;

      if (typeof target === 'string') {
        element = window[target];
      }

      forEachListener(this.props, (eventName, listener) => on(element, eventName, listener, capture));
    }
  }

  removeListeners(): void {
    const {
      capture,
      target,
    } = this.props;

    if (target) {
      let element = target;

      if (typeof target === 'string') {
        element = window[target];
      }

      forEachListener(this.props, (eventName, listener) => off(element, eventName, listener, capture));
    }
  }

  render() {
    return this.props.children || null;
  }
}
