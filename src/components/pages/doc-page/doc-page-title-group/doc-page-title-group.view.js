import { Heading } from 'components/shared/heading';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';
import Pencil from 'svg/pencil-icon.inline.svg';

import styles from './doc-page-title-group.module.scss';

const SUGGEST_EDIT_TRANSLATIONS = {
  en: 'suggest edits',
  es: 'sugerir editar',
};

export const DocPageTitleGroup = ({ title, articleSrc }) => {
  const { locale } = useLocale();

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
        {SUGGEST_EDIT_TRANSLATIONS[locale]}
      </a>
    </div>
  );
};
