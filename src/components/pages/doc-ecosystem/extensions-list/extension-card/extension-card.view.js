import React from 'react';

import styles from './extension-card.module.scss';
import WheelIcon from './svg/wheel.inline.svg';

export const ExtensionCard = ({ extension }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <WheelIcon />
      </div>
      <div className={styles.content}>
        <a href={extension.url} className={styles.name}>
          {extension.name}
        </a>
        <span className={styles.author}>by {extension.author.name}</span>
        <span className={styles.description}>{extension.description}</span>
      </div>
    </div>
  );
};
