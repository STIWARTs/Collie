import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import EventListener from 'react-event-listener';
import { mod } from 'react-swipeable-views-core';

export default function bindKeyboard(MyComponent) {
  class BindKeyboard extends React.Component {
    static propTypes = {
      /**
       * @ignore
       */
      axis: PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
      /**
       * @ignore
       */
      children: PropTypes.node,
      /**
       * @ignore
       */
      index: PropTypes.number,
      /**
       * @ignore
       */
      onChangeIndex: PropTypes.func,
      /**
       * @ignore
       */
      slideCount: PropTypes.number,
    };

    state = {
      index: this.props.index || 0,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot) {
        this.updateState(snapshot);
      }
    }

    // eslint-disable-next-line camelcase,react/sort-comp
    getSnapshotBeforeUpdate(prevProps) {
      const { index } = this.props;

      if (typeof index === 'number' && index !== prevProps.index) {
        return {
          index,
        };
      }
      return null;
    }

    handleKeyDown = event => {
      let action;
      const { axis = 'x', children, onChangeIndex, slideCount } = this.props;

      switch (keycode(event)) {
        case 'page down':
        case 'down':
          if (axis === 'y') {
            action = 'decrease';
          } else if (axis === 'y-reverse') {
            action = 'increase';
          }
          break;

        case 'left':
          if (axis === 'x') {
            action = 'decrease';
          } else if (axis === 'x-reverse') {
            action = 'increase';
          }
          break;

        case 'page up':
        case 'up':
          if (axis === 'y') {
            action = 'increase';
          } else if (axis === 'y-reverse') {
            action = 'decrease';
          }
          break;

        case 'right':
          if (axis === 'x') {
            action = 'increase';
          } else if (axis === 'x-reverse') {
            action = 'decrease';
          }
          break;

        default:
          break;
      }

      if (action) {
        const indexLatest = this.state.index;
        let indexNew = indexLatest;

        if (action === 'increase') {
          indexNew += 1;
        } else {
          indexNew -= 1;
        }

        if (slideCount || children) {
          indexNew = mod(indexNew, slideCount || React.Children.count(children));
        }

        // Is uncontrolled
        if (this.props.index === undefined) {
          this.setState({
            index: indexNew,
          });
        }

        if (onChangeIndex) {
          onChangeIndex(indexNew, indexLatest);
        }
      }
    };

    handleChangeIndex = (index, indexLatest, meta) => {
      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setState({
          index,
        });
      }

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index, indexLatest, meta);
      }
    };

    updateState(snapshot) {
      this.setState({
        ...snapshot,
      });
    }

    render() {
      const { index: indexProp, onChangeIndex, ...other } = this.props;

      const { index } = this.state;

      return (
        <EventListener target="window" onKeyDown={this.handleKeyDown}>
          <MyComponent index={index} onChangeIndex={this.handleChangeIndex} {...other} />
        </EventListener>
      );
    }
  }

  return BindKeyboard;
}
