/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import EventListener from './index';

import {
  render,
  unmountComponentAtNode,
} from 'react-dom';
import {
  Simulate,
} from 'react-addons-test-utils';

describe('EventListener', () => {
  describe('props: children', () => {
    it('should work without', () => {
      const wrapper = shallow(
        <EventListener />
      );

      assert.strictEqual(wrapper.children().length, 0,
        'Should work without children');
    });

    it('should render it', () => {
      const wrapper = shallow(
        <EventListener>
          <div>{'Foo'}</div>
        </EventListener>
      );

      assert.strictEqual(wrapper.children().length, 1,
        'Should render his children.');
    });
  });

  let node;
  beforeEach(() => {
    // Pattern from "react-router": http://git.io/vWpfs
    node = document.createElement('div');
    document.body.appendChild(node);
  });

  afterEach(() => {
    unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
  });

  [
    {
      contextName: 'using Simulate.click(extraNode)',
      name: 'should not invoke event listener to document',
      invokeFn(extraNode) {
        Simulate.click(extraNode);
      },
      expectFn(handle) {
        assert.strictEqual(handle.callCount, 0);
      },
    },
    {
      contextName: 'using extraNode.click()',
      name: 'should invoke event listener to document',
      invokeFn(extraNode) {
        extraNode.click();
      },
      expectFn(handle) {
        assert.strictEqual(handle.callCount, 1);
      },
    },
  ].forEach(({contextName, name, invokeFn, expectFn}) => {
    describe(contextName, () => {
      it(name, (done) => {
        class TextComponent extends React.Component {
          static propTypes = {
            onClick: React.PropTypes.func,
          };

          handleClick = () => {
            this.props.onClick();
          };

          render() {
            return (
              <EventListener target={document} onClick={this.handleClick} />
            );
          }
        }

        const handleClick = spy();

        render((
          <TextComponent onClick={handleClick} />
        ), node, () => {
          assert.strictEqual(handleClick.callCount, 0);

          const extraNode = document.createElement('button');
          document.body.appendChild(extraNode);

          invokeFn(extraNode);
          expectFn(handleClick);

          extraNode.parentNode.removeChild(extraNode);
          done();
        });
      });
    });
  });

  describe('with no node', () => {
    it("doesn't throw error", () => {
      render(<EventListener onClick={() => {}} />, node);
    });
  });

  describe('when props change', () => {
    it('removes old listeners', () => {
      const handleClick = spy();

      render(<EventListener target={document.body} onClick={handleClick} />, node);
      render(<EventListener target={document.body} />, node);

      document.body.click();
      assert.strictEqual(handleClick.callCount, 0);
    });

    it('adds new listeners', () => {
      const handleClick = spy();

      render(<EventListener target={document.body} />, node);

      document.body.click();
      assert.strictEqual(handleClick.callCount, 0);

      render(<EventListener target={document.body} onClick={handleClick} />, node);

      document.body.click();
      assert.strictEqual(handleClick.callCount, 1);
    });

    it('removes listeners from old node', () => {
      const handleClick = spy();

      render(<EventListener target={document.body} onClick={handleClick} />, node);
      render(<EventListener onClick={handleClick} />, node);

      document.body.click();
      assert.strictEqual(handleClick.callCount, 0);
    });

    it('adds listeners to new node', () => {
      const handleClick = spy();

      render(<EventListener onClick={handleClick} />, node);
      render(<EventListener target={document.body} onClick={handleClick} />, node);
      document.body.click();
      assert.strictEqual(handleClick.callCount, 1);
    });

    it("doesn't update if props are shallow equal", () => {
      const handleClick = spy();
      const inst = render(<EventListener target={document.body} onClick={handleClick} />, node);
      const _componentWillUpdate = inst.componentWillUpdate;
      let updated = false;
      inst.componentWillUpdate = (...args) => {
        updated = true;
        _componentWillUpdate(...args);
      };
      render(<EventListener target={document.body} onClick={handleClick} />, node);
      assert.strictEqual(updated, false);
    });
  });

  describe('props: capture', () => {
    it('attaches listeners with capture', () => {
      let button;
      const calls = [];

      render(
        <div>
          <EventListener
            target={document}
            capture={true}
            onClick={() => calls.push('outer')}
          />
          <button
            ref={(c) => button = c}
            onClick={() => calls.push('inner')}
          />
        </div>,
        node
      );

      assert.strictEqual(calls.length, 0);
      button.click();
      assert.deepEqual(calls, [
        'outer',
        'inner',
      ], 'Should be called in the right order.');
    });
  });
});
