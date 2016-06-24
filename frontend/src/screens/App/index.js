import React from 'react';

import { canUseDOM } from 'exenv';

import GlobalProgress from './components/GlobalProgress';
import GlobalSnackbar from './components/GlobalSnackbar';
import Modal from './components/Modal';

import get from 'lodash/get';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  };
  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal &&
      !get(this.props, 'location.state.returnTo') // keep modal open
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children;
      // add no scroll to body
      if (canUseDOM && !document.body.classList.contains('no-scroll')) {
        document.body.classList.add('no-scroll');
      }
    }
    // scroll handler
    if (!nextProps.location.state || !nextProps.location.state.modal) {
      if (canUseDOM && document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
    }
  }
  cloneChildren = (children, props) => {
    return React.Children.map(children, (child) => React.cloneElement(child, props));
  }
  render() {
    const { location } = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );
    return (
      <div>
        <GlobalProgress />
        {isModal ?
          this.cloneChildren(this.previousChildren, { modal: !!isModal }) :
          this.cloneChildren(this.props.children, { modal: !!isModal })
        }
        {isModal && (
          <Modal returnTo={location.state.returnTo}>
            {this.cloneChildren(this.props.children, { modal: !!isModal })}
          </Modal>
        )}
        {/*<GlobalSnackbar />*/}
      </div>
    );
  }
}

export default App;
