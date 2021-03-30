import { Heading } from 'components/shared/heading';
import { useI18n } from 'contexts/i18n-provider';
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
    </section>
  );
};
