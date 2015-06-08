# React-Event-Listener

> A React mixin that enable components to bind events


## Getting Started

Install via [npm](http://npmjs.org/react-event-listener)

```shell
   npm install react-event-listener --save-dev
```

## Usage

```Javascript
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
    // Body
  },
  onMouseMove: function() {
    // Body
  },
});

```

## License

MIT
