import React from 'react';
import { LATEST_VERSION } from 'utils/versioning';

import styles from './version-banner.module.scss';

export const VersionBanner = ({ version, versions }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <div className={styles.inner}>
        <span className={styles.message}>
          ⚠️ This is the archived documentation for k6 <b>{version}</b>.
          {typeof versions[LATEST_VERSION] !== 'undefined' && (
            <span>
              {' '}
              Go to the{' '}
              <a
                href="https://grafana.com/docs/k6/latest/"
                target="_blank"
                rel="noreferrer"
              >
                latest version
              </a>
              .
            </span>
          )}
        </span>
      </div>
    </div>
  </div>
);
