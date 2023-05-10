import classNames from 'classnames/bind';
import React from 'react';
import { slugify } from 'utils';

import styles from './blockquote.module.scss';
import AttentionIcon from './svg/attention.inline.svg';
import NoteIcon from './svg/note.inline.svg';
import WarningIcon from './svg/warning.inline.svg';

const cx = classNames.bind(styles);

const getKicker = ({ mod, title }) => {
  const kickers = {
    attention: 'attention',
    note: 'note',
    warning: 'warning',
    default: '',
  };

  const icons = {
    attention: AttentionIcon,
    note: NoteIcon,
    warning: WarningIcon,
  };

  const Icon = icons[mod] ?? null;
  const kickerContent = kickers[mod];
  const Tag = title ? 'h4' : 'span';

  return title || kickerContent ? (
    <div className={cx('wrapper')}>
      {Icon && <Icon className={cx('icon')} />}
      <Tag
        className={cx('kicker', 'uppercased')}
        id={title ? slugify(title) : undefined}
      >
        {title || kickerContent}
      </Tag>
    </div>
  ) : null;
};

const Blockquote = ({ children, title, mod = 'default' }) => {
  const variation = mod.toLowerCase();
  return (
    <blockquote className={variation && cx(`doc-blockquote-${variation}`)}>
      {getKicker({ mod: variation, title })}
      {children}
    </blockquote>
  );
};

export default Blockquote;
