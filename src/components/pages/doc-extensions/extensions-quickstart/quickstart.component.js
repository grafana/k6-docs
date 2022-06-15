import React from 'react';

import { ItemCardsRow } from '../../../blocks/item-cards-row';

import styles from './quickstart.module.scss';

export const ExtensionsQuickstart = () => {
  const quickstart = {
    blockTitle: 'Quickstart',
    cardsData: [
      {
        to: '/extensions/explore/',
        title: '🔎 Explore',
        text: 'With more than 50 available extensions, discover what is available.',
      },
      {
        to: '/extensions/bundle-builder/',
        title: '🧩 Bundle',
        text: 'Use the interactive builder to ease the creation of your customized k6 binary.',
      },
      {
        to: '/extensions/getting-started/create/',
        title: '🏗️ Create',
        text: 'Learn to make your integration in case one is not already available.',
      },
    ],
  };

  return (
    <ItemCardsRow
      {...quickstart}
      label={styles.quickstartCard}
      linkText="Read more"
    />
  );
}
