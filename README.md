# React-Event-Listener [![npm version](https://badge.fury.io/js/react-event-listener.svg)](http://badge.fury.io/js/react-event-listener)

> A React mixin that enable components to bind events


## Getting Started

```sh
npm install react-event-listener
```

## Usage

```js
var React = require('react');
var EventListener = require('react-event-listener');

React.createClass({
  mixins: [EventListener],
  listeners: {
    window: {
      resize: 'onResize',
    },
    document: {
      mousemove: 'onMouseMove',
    },
  },
  onResize: function() {
    // the variable this refers to the window object
  },
  onMouseMove: function() {
    // the variable this refers to the document object
  },
});

```

## License

MIT
