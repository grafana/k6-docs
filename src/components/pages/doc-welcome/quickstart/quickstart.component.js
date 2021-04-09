import { useI18n } from 'contexts/i18n-provider';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';

import { ItemCardsRow } from '../../../blocks/item-cards-row';

import styles from './quickstart.module.scss';

export const Quickstart = () => {
  const { t } = useI18n();
  const { urlLocale } = useLocale();

  const quickstart = {
    blockTitle: t('welcome.quickstart.title'),
    cardsData: [
      {
        to:
          urlLocale === 'es'
            ? '/es/empezando/instalacion/'
            : '/getting-started/installation/',
        title: `🚀 ${t('welcome.quickstart.installation.title')}`,
        text: t('welcome.quickstart.installation.text'),
      },
      {
        to:
          urlLocale === 'es'
            ? '/es/empezando/ejecucion-de-k6/'
            : '/getting-started/running-k6/',
        title: `🏎💨 ${t('welcome.quickstart.running-k6.title')}`,
        text: t('welcome.quickstart.running-k6.text'),
      },
      {
        to:
          urlLocale === 'es'
            ? '/es/empezando/instalacion/'
            : '/getting-started/salida-de-resultados/',
        title: `⏱ ${t('welcome.quickstart.results-output.title')}`,
        text: t('welcome.quickstart.results-output.text'),
      },
    ],
  };

  return (
    <ItemCardsRow
      {...quickstart}
      label={styles.quickstartCard}
      linkText={t('read-more')}
    />
  );
};
