import { Heading } from 'components/shared/heading';
import { useI18n } from 'contexts/i18n-provider';
import { Link } from 'gatsby';
import React from 'react';

import styles from './use-cases.module.scss';

export const UseCases = () => {
  const { t } = useI18n();
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
              to="/test-types/stress-testing#spike-testing-in-k6"
            >
              spike
            </Link>
            ,{' '}
            <Link className={'link'} to="/test-types/stress-testing">
              stress
            </Link>
            ,{' '}
            <Link className={'link'} to="/test-types/soak-testing">
              soak tests
            </Link>
            {') '}
            {t('welcome.use-cases.load-testing.description2')}
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.performance-monitoring.title')}
          </Heading>
          <p>
            {t('welcome.use-cases.performance-monitoring.description1')}{' '}
            <Link
              className={'link'}
              to="/testing-guides/automated-performance-testing"
            >
              {t('welcome.use-cases.performance-monitoring.testing-automation')}
            </Link>
            {'. '}
            {t('welcome.use-cases.performance-monitoring.description2')}
          </p>
        </li>
      </ul>
    </section>
  );
};
