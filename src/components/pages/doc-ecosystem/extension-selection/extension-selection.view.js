import { Code } from 'components/shared/code';
import { ExtensionCard } from 'components/shared/extension-card';
import EXTENSIONS_DATA from 'data/ecosystem/extensions';
import React, { useState } from 'react';

import styles from './extension-selection.module.scss';

export const ExtensionSelection = () => {
  const [selected, setSelected] = useState(
    Array(EXTENSIONS_DATA.length).fill(false),
  );

  const handleCheckboxClick = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !selected[index];
    setSelected(newSelected);
  };

  // TODO: always use most recent k6 version
  let code = '$ xk6 build v0.31.0';
  EXTENSIONS_DATA.forEach((extension, index) => {
    if (selected[index]) {
      code += ` --with ${extension.url.replace('https://', '')}`;
    }
  });

  return (
    <section className={`container ${styles.container}`}>
      <div className={styles.code}>
        <Code>
          <span>{code}</span>
        </Code>
      </div>
      <div className={styles.list}>
        {EXTENSIONS_DATA.map((extension, index) => (
          <ExtensionCard
            key={extension.name}
            extension={extension}
            isChecked={selected[index]}
            onCheckboxClick={() => handleCheckboxClick(index)}
            hasCheckbox
          />
        ))}
      </div>
    </section>
  );
};
