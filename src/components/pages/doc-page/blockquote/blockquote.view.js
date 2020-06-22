import React from 'react';
import classNames from 'classnames';
import styles from './blockquote.module.scss';

const Blockquote = ({ mdBlockContent, mod = 'default' }) => {
  // prevent nesting blockquote tags
  const blockquoteInner = mdBlockContent.replace(/<\/?blockquote>/g, '');
  // create optional kicker in case of modifications
  const getKicker = (mod) => {
    const kickers = {
      warning: 'warning!',
      default: '',
    };
    return kickers[mod] ? `<span>${kickers[mod]}</span>` : kickers[mod];
  };
  return (
    <blockquote
      className={classNames(styles.docBlockquote, {
        [styles.docBlockquoteWarning]: mod === 'warning',
      })}
      dangerouslySetInnerHTML={{
        __html: `${getKicker(mod) + blockquoteInner}`,
      }}
    />
  );
};
export default Blockquote;
