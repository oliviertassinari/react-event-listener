import {
  default as expect,
  createSpy,
} from "expect";

import {
  default as React,
} from "react";

import {
  render,
  unmountComponentAtNode,
} from "react-dom";

import {
  default as TestUtils,
  Simulate,
} from "react-addons-test-utils";

import {
  default as ReactEventListener,
} from "../index";

describe(`ReactEventListener`, () => {
  let node;
  beforeEach(function () {
    // Pattern from "react-router": http://git.io/vWpfs
    node = document.createElement(`div`);
    document.body.appendChild(node);
  });

  afterEach(function () {
    unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
  });

  [
    {
      contextName: `using Simulate.click(extraNode)`,
      name: `should not invoke event listener to document`,
      invokeFn (extraNode) { Simulate.click(extraNode); },
      expectFn (spy) { expect(spy).toNotHaveBeenCalled(); },
    },
    {
      contextName: `using extraNode.click()`,
      name: `should invoke event listener to document`,
      invokeFn (extraNode) { extraNode.click() },
      expectFn (spy) { expect(spy).toHaveBeenCalled(); },
    },
  ].forEach(({contextName, name, invokeFn, expectFn}) => {
    context(contextName, () => {
      it(name, function (done) {
        const TextComponent = React.createClass({
          mixins: [ReactEventListener],

          listeners: {
            document: {
              click: `handleClick`,
            },
          },

          handleClick () {
            this.props.onClick();
          },

          render () {
            return (
              <div />
            );
          },
        });

        const spy = createSpy();

        render((
          <TextComponent
            onClick={spy}
          />
        ), node, function () {
          expect(spy).toNotHaveBeenCalled();

          const extraNode = document.createElement(`button`);
          document.body.appendChild(extraNode);

          invokeFn(extraNode);
          expectFn(spy);

          extraNode.parentNode.removeChild(extraNode);
          done();
        });
      });
    });
  });
});
