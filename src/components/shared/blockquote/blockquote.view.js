import classNames from 'classnames';
import React from 'react';

import styles from './blockquote.module.scss';

const Blockquote = ({ children, mod = 'default' }) => {
  // create optional kicker in case of modifications
  const getKicker = (mod) => {
    const kickers = {
      warning: 'warning!',
      default: '',
    };
    return kickers[mod] ? <span>{kickers[mod]}</span> : kickers[mod];
  };
  return (
    <blockquote
      className={classNames({
        [styles.docBlockquoteWarning]: mod === 'warning',
      })}
    >
      {getKicker(mod)}
      {children}
    </blockquote>
  );
};
export default Blockquote;
