import { useI18n } from 'contexts/i18n-provider';
import React from 'react';

import { ItemCardsRow } from '../../../blocks/item-cards-row';

import styles from './quickstart.module.scss';

export const Quickstart = () => {
  const { t } = useI18n();
  const quickstart = {
    blockTitle: t('welcome.quickstart.title'),
    cardsData: [
      {
        to: '/getting-started/installation',
        title: `🚀 ${t('welcome.quickstart.installation.title')}`,
        text: t('welcome.quickstart.installation.text'),
      },
      {
        to: '/getting-started/running-k6',
        title: `🏎💨 ${t('welcome.quickstart.running-k6.title')}`,
        text: t('welcome.quickstart.running-k6.text'),
      },
      {
        to: '/getting-started/results-output',
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
