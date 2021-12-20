import { Heading } from 'components/shared/heading';
import { useI18n } from 'contexts/i18n-provider';
import { Link } from 'gatsby';
import React from 'react';

import styles from './doc-welcome-what-is.module.scss';

export const WhatIs = () => {
  const { t } = useI18n();
  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        {t('welcome.what-is.title')}
      </Heading>
      <p className={styles.description}>{t('welcome.what-is.description1')}</p>
      <p className={styles.description}>{t('welcome.what-is.description2')}</p>
      <p className={styles.description}>
        {t('welcome.what-is.description3')}{' '}
        <Link to="https://grafana.com/" className="link">
          {t('welcome.what-is.description4')}
        </Link>
        {t('welcome.what-is.description5')}
      </p>
    </section>
  );
};
