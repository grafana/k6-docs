import { ExtensionCard } from 'components/shared/extension-card';
import React from 'react';

import styles from './extensions-list.module.scss';

export const ExtensionsList = ({ category, data }) => {
  let extensions;
  if (category === 'All') {
    extensions = data.sort((item1, item2) =>
      item1.name > item2.name ? 1 : -1,
    );
  } else {
    extensions = data
      .sort((item1, item2) => (item1.name > item2.name ? 1 : -1))
      .filter((extension) => extension.categories.includes(category));
  }
  return (
    <section className={styles.container}>
      {extensions.map((extension) => (
        <ExtensionCard key={extension.name} extension={extension} />
      ))}
    </section>
  );
};
