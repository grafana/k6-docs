import React from 'react';
// import { LATEST_VERSION } from 'utils/versioning';

import styles from './version-banner.module.scss';

export const VersionBanner = ({ canonicalUrl }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <div className={styles.inner}>
        <span className={styles.message}>
          ⚠️ This documentation is outdated. Please visit grafana.com for the{' '}
          <a href={canonicalUrl || 'https://grafana.com/docs/k6/latest/'}>
            latest k6 documentation
          </a>
          .📚
        </span>
      </div>
    </div>
  </div>
);
