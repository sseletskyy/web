import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';


import styles from './Modal.scss';

const Modal = ({
  returnTo,
  children,
}) => (
  <div className={styles['modal-overlay']}>
    <Link to={returnTo}><div className={styles['modal-background']} /></Link>
    <div className={styles['modal-navigation']}>
      <Link to={returnTo}>
        <i className={classNames('fa fa-times', styles.close)} aria-hidden="true"></i>
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
