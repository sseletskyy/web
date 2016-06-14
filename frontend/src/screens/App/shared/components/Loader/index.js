import React from 'react';

import styles from './Loader.scss';

const Loader = () => (
  <div className={styles.container}>
    <div className={styles['fading-circle']}>
      <div className={`${styles.circle1} ${styles.circle}`}></div>
      <div className={`${styles.circle2} ${styles.circle}`}></div>
      <div className={`${styles.circle3} ${styles.circle}`}></div>
      <div className={`${styles.circle4} ${styles.circle}`}></div>
      <div className={`${styles.circle5} ${styles.circle}`}></div>
      <div className={`${styles.circle6} ${styles.circle}`}></div>
      <div className={`${styles.circle7} ${styles.circle}`}></div>
      <div className={`${styles.circle8} ${styles.circle}`}></div>
      <div className={`${styles.circle9} ${styles.circle}`}></div>
      <div className={`${styles.circle10} ${styles.circle}`}></div>
      <div className={`${styles.circle11} ${styles.circle}`}></div>
      <div className={`${styles.circle12} ${styles.circle}`}></div>
    </div>
  </div>
);

export default Loader;
