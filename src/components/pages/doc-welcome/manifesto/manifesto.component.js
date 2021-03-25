import { Heading } from 'components/shared/heading';
import { useI18n } from 'contexts/i18n-provider';
import React from 'react';
import { main } from 'utils/urls';

import styles from './manifesto.module.scss';

export const Manifesto = () => {
  const { t } = useI18n();

  const bullets = [
    {
      title: t('welcome.manifesto.bullet1'),
      url: `${main}/our-beliefs/#simple-testing-is-better-than-no-testing`,
    },
    {
      title: t('welcome.manifesto.bullet2'),
      url: `${main}/our-beliefs/#load-testing-should-be-goal-oriented`,
    },
    {
      title: t('welcome.manifesto.bullet3'),
      url: `${main}/our-beliefs/#load-testing-by-developers`,
    },
    {
      title: t('welcome.manifesto.bullet4'),
      url: `${main}/our-beliefs/#developer-experience-is-super-important`,
    },
    {
      title: t('welcome.manifesto.bullet5'),
      url: `${main}/our-beliefs/#load-test-in-a-pre-production-environment`,
    },
  ];

  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        {t('welcome.manifesto.title')}
      </Heading>
      {t('welcome.manifesto.description')}
      <ul>
        {bullets.map((bullet, i) => (
          <li key={`bullet-${i}`}>
            <a className="link" href={bullet.url}>
              {bullet.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
