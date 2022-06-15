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
        text: 'an ecosystem having more than 50 available extensions.',
      },
      {
        to: '/extensions/bundle-builder/',
        title: '🧩 Bundle',
        text: 'multiple extensions into a single utility to meet your needs.',
      },
      {
        to: '/extensions/getting-started/create/',
        title: '🏗️ Create',
        text: 'your own integration in case one is not already available.',
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
};
