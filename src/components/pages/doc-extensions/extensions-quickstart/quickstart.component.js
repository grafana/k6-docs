import React from 'react';

import { ItemCardsRow } from '../../../blocks/item-cards-row';

import styles from './quickstart.module.scss';

export const ExtensionsQuickstart = () => {
  const quickstart = {
    blockTitle: 'Quickstart',
    cardsData: [
      {
        to: '/extensions/get-started/explore/',
        title: '🔎 Explore',
        text: 'A list of more than 50 available extensions',
      },
      {
        to: '/extensions/get-started/bundle/',
        title: '🧩 Bundle',
        text: 'Combine multiple extensions into a custom k6 binary (interactive!)',
      },
      {
        to: '/extensions/get-started/create/',
        title: '🏗️ Create',
        text: 'Learn how to make your own k6 extension.',
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
