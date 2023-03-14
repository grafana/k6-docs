import { Heading } from 'components/shared/heading';
import { useI18n } from 'contexts/i18n-provider';
import { useLocale } from 'contexts/locale-provider';
import { Link } from 'gatsby';
import React from 'react';

import styles from './use-cases.module.scss';

export const UseCases = () => {
  const { t } = useI18n();
  const { urlLocale } = useLocale();
  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        {t('welcome.use-cases.title')}
      </Heading>
      <p>{t('welcome.use-cases.description')}</p>
      <ul>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.load-testing.title')}
          </Heading>
          <p>
            {t('welcome.use-cases.load-testing.description1')}
            {' ('}
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/tipos-de-prueba/stress-testing/#spike-testing'
                  : '/test-types/stress-testing#spike-testing-in-k6'
              }
            >
              spike
            </Link>
            ,{' '}
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/tipos-de-prueba/stress-testing/'
                  : '/test-types/stress-testing/'
              }
            >
              stress
            </Link>
            ,{' '}
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/tipos-de-prueba/soak-testing/'
                  : '/test-types/soak-testing/'
              }
            >
              soak tests
            </Link>
            {') '}
            {t('welcome.use-cases.load-testing.description2')}
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.browser-testing.title')}
          </Heading>
          <p>
            {t('welcome.use-cases.browser-testing.pre-description')}
            <Link className={'link'} to={'/using-k6-browser/overview/'}>
              k6 browser
            </Link>
            {t('welcome.use-cases.browser-testing.description')}
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.chaos-testing.title')}
          </Heading>
          <p>
            {t('welcome.use-cases.chaos-testing.description')}
            <Link className={'link'} to={'/javascript-api/xk6-disruptor/'}>
              xk6-disruptor
            </Link>
            .
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.performance-monitoring.title')}
          </Heading>
          <p>{t('welcome.use-cases.performance-monitoring.description')}</p>
        </li>
      </ul>
    </section>
  );
};
