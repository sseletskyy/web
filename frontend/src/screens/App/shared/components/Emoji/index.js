import React from 'react';
import emojione from 'emojione';

import styles from './Emoji.scss';

const Emoji = ({
  str,
  ...props,
}) => (
  <div
    dangerouslySetInnerHTML={{ __html: emojione.toImage(str) }}
    {...props}
  />
);

Emoji.propTypes = {
  str: React.PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  str: ':ghost:',
};

export default Emoji;
