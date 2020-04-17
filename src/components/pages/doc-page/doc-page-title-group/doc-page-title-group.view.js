import React from 'react';
import styles from './doc-page-title-group.module.scss';
import Pencil from './svg/pencil-icon.inline.svg';
import { Heading } from 'components/shared/heading';

export const DocPageTitleGroup = ({ title, articleSrc }) => {
  if (process.env.GATSBY_FEATURE_EDIT_ARTICLE_BTN) {
    console.log(typeof process.env.GATSBY_FEATURE_EDIT_ARTICLE_BTN);
    return (
      <div className={styles.wrapper}>
        <Heading className={styles.title}>{title}</Heading>
        <a className={styles.editLink} href={articleSrc} target={'_blank'}>
          <Pencil />
          suggest edits
        </a>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <Heading className={styles.title}>{title}</Heading>
    </div>
  );
};
