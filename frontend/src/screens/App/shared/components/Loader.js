import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Loader = () => (
  <div className={css(styles.container)}>
    <div className={css(styles['fading-circle'])}>
      <div className={css(styles.circle1, styles.circle)}></div>
      <div className={css(styles.circle2, styles.circle)}></div>
      <div className={css(styles.circle3, styles.circle)}></div>
      <div className={css(styles.circle4, styles.circle)}></div>
      <div className={css(styles.circle5, styles.circle)}></div>
      <div className={css(styles.circle6, styles.circle)}></div>
      <div className={css(styles.circle7, styles.circle)}></div>
      <div className={css(styles.circle8, styles.circle)}></div>
      <div className={css(styles.circle9, styles.circle)}></div>
      <div className={css(styles.circle10, styles.circle)}></div>
      <div className={css(styles.circle11, styles.circle)}></div>
      <div className={css(styles.circle12, styles.circle)}></div>
    </div>
  </div>
);

export default Loader;

const keyframes = {
  from: {
    opacity: 0,
  },
  '40%': {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
  'fading-circle': {
    width: '40px',
    height: '40px',
    position: 'relative',
  },
  circle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    ':before': {
      content: "''",
      display: 'block',
      margin: '0 auto',
      width: '15%',
      height: '15%',
      backgroundColor: '#333',
      borderRadius: '100%',
      animationName: keyframes,
      animationDuration: '1.2s',
      animationCount: 'infinite',
    },
  },
  circle2: {
    transform: 'rotate(30deg)',
    ':before': {
      animationDelay: '-1.1s',
    },
  },
  circle3: {
    transform: 'rotate(60deg)',
    ':before': {
      animationDelay: '-1s',
    },
  },
  circle4: {
    transform: 'rotate(90deg)',
    ':before': {
      animationDelay: '-0.9s',
    },
  },
  circle5: {
    transform: 'rotate(120deg)',
    ':before': {
      animationDelay: '-0.8s',
    },
  },
  circle6: {
    transform: 'rotate(150deg)',
    ':before': {
      animationDelay: '-0.7s',
    },
  },
  circle7: {
    transform: 'rotate(180deg)',
    ':before': {
      animationDelay: '-0.6s',
    },
  },
  circle8: {
    transform: 'rotate(210deg)',
    ':before': {
      animationDelay: '-0.5s',
    },
  },
  circle9: {
    transform: 'rotate(240deg)',
    ':before': {
      animationDelay: '-0.4s',
    },
  },
  circle10: {
    transform: 'rotate(270deg)',
    ':before': {
      animationDelay: '-0.3s',
    },
  },
  circle11: {
    transform: 'rotate(300deg)',
    ':before': {
      animationDelay: '-0.2s',
    },
  },
  circle12: {
    transform: 'rotate(330deg)',
    ':before': {
      animationDelay: '-0.1s',
    },
  },
});
