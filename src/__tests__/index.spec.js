import React from 'react';
import expect, {
  createSpy,
} from 'expect';
import {
  render,
  unmountComponentAtNode,
} from 'react-dom';
import {
  Simulate,
} from 'react-addons-test-utils';
import EventListener from '../index';

describe('EventListener', () => {
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
      expectFn(spy) {
        expect(spy).toNotHaveBeenCalled();
      },
    },
    {
      contextName: 'using extraNode.click()',
      name: 'should invoke event listener to document',
      invokeFn(extraNode) {
        extraNode.click();
      },
      expectFn(spy) {
        expect(spy).toHaveBeenCalled();
      },
    },
  ].forEach(({contextName, name, invokeFn, expectFn}) => {
    context(contextName, () => {
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
              <EventListener elementName="document" onClick={this.handleClick} />
            );
          }
        }

        const spy = createSpy();

        render((
          <TextComponent onClick={spy} />
        ), node, () => {
          expect(spy).toNotHaveBeenCalled();

          const extraNode = document.createElement('button');
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
