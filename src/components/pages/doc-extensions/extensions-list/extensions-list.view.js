import { ExtensionCard } from 'components/shared/extension-card';
import EXTENSIONS_DATA from 'data/extensions/extensions';
import React from 'react';

import styles from './extensions-list.module.scss';

export const ExtensionsList = ({ category }) => {
  let extensions;
  if (category === 'All') {
    extensions = EXTENSIONS_DATA.sort((item1, item2) =>
      item1.name > item2.name ? 1 : -1,
    );
  } else {
    extensions = EXTENSIONS_DATA.sort((item1, item2) =>
      item1.name > item2.name ? 1 : -1,
    ).filter((extension) => extension.categories.includes(category));
  }
  return (
    <section className={`container ${styles.container}`}>
      {extensions.map((extension) => (
        <ExtensionCard key={extension.name} extension={extension} />
      ))}
    </section>
  );
};
