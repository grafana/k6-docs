import classNames from 'classnames';
import React from 'react';

import styles from './blockquote.module.scss';
import AttentionIcon from './svg/attention.inline.svg';
import InfoIcon from './svg/pencil-note.inline.svg';
import WarningIcon from './svg/warning.inline.svg';

const Blockquote = ({ children, title, mod = 'default' }) => {
  // create optional kicker in case of modifications
  const getKicker = (mod) => {
    const kickers = {
      attention: 'attention',
      info: 'info',
      warning: 'warning',
      default: '',
    };

    const icons = {
      attention: AttentionIcon,
      info: InfoIcon,
      warning: WarningIcon,
    };

    const Icon = icons[mod] ?? null;

    return (
      <div className={styles.wrapper}>
        {Icon && <Icon className={styles.icon} src={icons[mod]} />}
        <span className="kicker">{!title ? kickers[mod] : title}</span>
      </div>
    );
  };
  return (
    <blockquote
      className={classNames({
        [styles.docBlockquoteWarning]: mod === 'warning',
        [styles.docBlockquoteAttention]: mod === 'attention',
        [styles.docBlockquoteInfo]: mod === 'info',
      })}
    >
      {getKicker(mod)}
      {children}
    </blockquote>
  );
};
export default Blockquote;
