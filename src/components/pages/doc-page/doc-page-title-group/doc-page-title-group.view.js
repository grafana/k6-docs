import classNames from 'classnames';
import { Heading } from 'components/shared/heading';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';
import GithubIcon from 'svg/github.inline.svg';
import Pencil from 'svg/pencil-icon.inline.svg';

import styles from './doc-page-title-group.module.scss';

const SUGGEST_EDIT_TRANSLATIONS = {
  en: 'suggest edits',
  es: 'sugerir editar',
};

const GithubLink = ({ githubUrl, githubTitle }) => (
  <a
    href={githubUrl}
    target="_blank"
    rel="noreferrer"
    className={styles.githubLink}
  >
    <GithubIcon />
    {githubTitle}
  </a>
);

export const DocPageTitleGroup = ({
  title,
  articleSrc,
  githubUrl,
  githubTitle,
  heading,
}) => {
  const { locale } = useLocale();

  return (
    <div className={classNames(styles.wrapper)}>
      <Heading className={styles.title}>{heading || title}</Heading>
      <div className={styles.links}>
        {githubUrl && (
          <GithubLink githubUrl={githubUrl} githubTitle={githubTitle} />
        )}
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
    </div>
  );
};
