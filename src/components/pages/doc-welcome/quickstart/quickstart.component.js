import React from 'react';
import styles from './quickstart.module.scss';
import { ItemCardsRow } from '../../../blocks/item-cards-row';

const quickstart = {
  blockTitle: 'Quickstart',
  cardsData: [
    {
      to: '/getting-started/installation',
      title: '🚀 Installation',
      text:
        'Get up and running in no-time, using either a package manager, standalone installer ' +
        'or the official docker image.',
    },
    {
      to: '/getting-started/running-k6',
      title: '🏎💨 Running k6',
      text:
        'Write and execute your first load test locally using javascript and the k6 api, ' +
        'adding multiple virtual users, checks and ramping stages',
    },
    {
      to: '/getting-started/results-output',
      title: '⏱ Results Output',
      text:
        'Learn how to leverage the results output to gain actionable insight about your ' +
        'applications performance.',
    },
  ],
};

export const Quickstart = () => (
  <ItemCardsRow {...quickstart} label={styles.quickstartCard} />
);
