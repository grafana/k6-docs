import { Heading } from 'components/shared/heading';
import React from 'react';

import styles from './doc-page-title-group.module.scss';
import Pencil from './svg/pencil-icon.inline.svg';

export const DocPageTitleGroup = ({ title, articleSrc }) => {
  return (
    <div className={styles.wrapper}>
      <Heading className={styles.title}>{title}</Heading>
      <a
        className={styles.editLink}
        href={articleSrc}
        target={'_blank'}
        rel={'noreferrer'}
      >
        <Pencil />
        suggest edits
      </a>
    </div>
  );
};
