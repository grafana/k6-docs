import React from 'react';

import styles from './version-banner.module.scss';

export const VersionBanner = ({ version }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <div className={styles.inner}>
        <span className={styles.message}>
          ⚠️ This is archived documentation for <b>{version}</b>.
        </span>
      </div>
    </div>
  </div>
);
