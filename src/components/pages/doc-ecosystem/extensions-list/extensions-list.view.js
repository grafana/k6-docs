import { ExtensionCard } from 'components/shared/extension-card';
import EXTENSIONS_DATA from 'data/ecosystem/extensions';
import React from 'react';

import styles from './extensions-list.module.scss';

export const ExtensionsList = () => {
  return (
    <section className={`container ${styles.container}`}>
      {EXTENSIONS_DATA.map((extension) => (
        <ExtensionCard key={extension.name} extension={extension} />
      ))}
    </section>
  );
};
