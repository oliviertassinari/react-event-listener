# React-Event-Listener [![Travis CI][travis-image]][travis-url] [![Quality][codeclimate-image]][codeclimate-url] [![Coverage][codeclimate-coverage-image]][codeclimate-coverage-url] [![Dependencies][gemnasium-image]][gemnasium-url] [![Gitter][gitter-image]][gitter-url]
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
  },
  onMouseMove: function() {
  },
});

```


## Contributing

[![devDependency Status][david-dm-image]][david-dm-url]

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## License

MIT


[npm-image]: https://img.shields.io/npm/v/react-event-listener.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/react-event-listener

[travis-image]: https://img.shields.io/travis/oliviertassinari/react-event-listener.svg?style=flat-square
[travis-url]: https://travis-ci.org/oliviertassinari/react-event-listener
[codeclimate-image]: https://img.shields.io/codeclimate/github/oliviertassinari/react-event-listener.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/oliviertassinari/react-event-listener
[codeclimate-coverage-image]: https://img.shields.io/codeclimate/coverage/github/oliviertassinari/react-event-listener.svg?style=flat-square
[codeclimate-coverage-url]: https://codeclimate.com/github/oliviertassinari/react-event-listener
[gemnasium-image]: https://img.shields.io/gemnasium/oliviertassinari/react-event-listener.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/oliviertassinari/react-event-listener
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/oliviertassinari/react-event-listener?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[david-dm-image]: https://img.shields.io/david/dev/oliviertassinari/react-event-listener.svg?style=flat-square
[david-dm-url]: https://david-dm.org/oliviertassinari/react-event-listener#info=devDependencies
