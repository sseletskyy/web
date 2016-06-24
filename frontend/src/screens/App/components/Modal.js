import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';


const Modal = ({
  returnTo,
  children,
}) => (
  <div className={css(styles.overlay)}>
    <Link to={returnTo}><div className={css(styles.background)} /></Link>
    <div className={css(styles.navigation)}>
      <Link to={returnTo}>
        <i className={`fa fa-times ${css(styles.close)}`} aria-hidden="true"></i>
      </Link>
    </div>
    {children}
  </div>
);

Modal.propTypes = {
  children: React.PropTypes.node,
  returnTo: React.PropTypes.string,
};

export default Modal;

const styles = StyleSheet.create({
  background: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    cursor: 'default',
  },
  close: {
    fontSize: '18px',
    backgroundColor: '#CCCCCC',
    color: '#fff',
  },
  navigation: {
    position: 'fixed',
    top: '10px',
    left: '10px',
  },
  overlay: {
    background: 'rgba(255,255,255,0.9)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    overflowY: 'scroll',
  },
});
