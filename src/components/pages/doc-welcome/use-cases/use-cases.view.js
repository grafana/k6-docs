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
              to={
                'https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/'
              }
            >
              spike
            </Link>
            ,{' '}
            <Link
              className={'link'}
              to={
                'https://grafana.com/docs/k6/latest/testing-guides/test-types/stress-testing/'
              }
            >
              stress
            </Link>
            ,{' '}
            <Link
              className={'link'}
              to={
                'https://grafana.com/docs/k6/latest/testing-guides/test-types/soak-testing/'
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
            <Link
              className={'link'}
              to={'https://grafana.com/docs/k6/latest/using-k6-browser/'}
            >
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
            You can use k6 to simulate traffic as part of your chaos
            experiments, trigger them from your k6 tests or inject different
            types of faults in Kubernetes with{' '}
            <Link
              className={'link'}
              to={
                'https://grafana.com/docs/k6/latest/testing-guides/injecting-faults-with-xk6-disruptor/'
              }
            >
              xk6-disruptor
            </Link>
            .
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            {t('welcome.use-cases.performance-monitoring.title')}
          </Heading>
          <p>
            With k6, you can automate and schedule to trigger tests very
            frequently with a small load to continuously validate the
            performance and availability of your production environment. You can
            also use{' '}
            <Link
              className={'link'}
              to={
                'https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/'
              }
            >
              Grafana Cloud Synthetic Monitoring
            </Link>{' '}
            for a managed solution built specifically for synthetic monitoring
            that supports k6 test scripts.
          </p>
        </li>
      </ul>
    </section>
  );
};
