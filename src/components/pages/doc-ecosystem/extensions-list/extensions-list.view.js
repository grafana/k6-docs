import { ExtensionCard } from 'components/shared/extension-card';
import EXTENSIONS_DATA from 'data/ecosystem/extensions';
import React from 'react';

import styles from './extensions-list.module.scss';

export const ExtensionsList = ({ category }) => {
  let extensions;
  if (category === 'All') {
    extensions = EXTENSIONS_DATA;
  } else {
    extensions = EXTENSIONS_DATA.filter((extension) =>
      extension.categories.includes(category),
    );
  }
  return (
    <section className={`container ${styles.container}`}>
      {extensions.map((extension) => (
        <ExtensionCard key={extension.name} extension={extension} />
      ))}
    </section>
  );
};
