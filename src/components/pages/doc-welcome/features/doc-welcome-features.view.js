import { Heading } from 'components/shared/heading';
import { Trait } from 'components/shared/trait';
import { useI18n } from 'contexts/i18n-provider';
import { useLocale } from 'contexts/locale-provider';
import { Link } from 'gatsby';
import React from 'react';

import styles from './doc-welcome-features.module.scss';

export const Features = () => {
  const { t } = useI18n();
  const { urlLocale } = useLocale();

  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        {t('welcome.features.title')}
      </Heading>
      <p>{t('welcome.features.description')}</p>

      <div className={'row'}>
        <div className="col-md-12">
          <Trait className={styles.trait}>
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/usando-k6/opciones/'
                  : '/using-k6/k6-options/how-to/'
              }
            >
              {t('welcome.features.cli-tool')}
            </Link>{' '}
            {t('welcome.features.cli-tool.dev-friendly-apis')}
          </Trait>

          <Trait className={styles.trait}>
            {t('welcome.features.scripting')}{' '}
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/usando-k6/modulos/'
                  : '/using-k6/modules/'
              }
            >
              {t('welcome.features.modules')}
            </Link>
          </Trait>
          <Trait className={styles.trait}>
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/usando-k6/checks/'
                  : '/using-k6/checks/'
              }
            >
              {t('welcome.features.checks')}
            </Link>{' '}
            {t('welcome.features.and')}{' '}
            <Link
              className={'link'}
              to={
                urlLocale === 'es'
                  ? '/es/usando-k6/thresholds/'
                  : '/using-k6/thresholds/'
              }
            >
              {t('welcome.features.thresholds')}
            </Link>{' '}
            {t('welcome.features.testing')}
          </Trait>
        </div>
      </div>
    </section>
  );
};
