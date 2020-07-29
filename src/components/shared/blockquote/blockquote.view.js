import React from 'react';
import classNames from 'classnames';
import styles from './blockquote.module.scss';

const Blockquote = ({ children, mod = 'default' }) => {
  // prevent nesting blockquote tags
  // const blockquoteInner = children.replace(/<\/?blockquote>/g, '');
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
      {mod === 'default' ? children : children.props.children}
    </blockquote>
  );
};
export default Blockquote;
