import { Link } from 'gatsby';
import React from 'react';
import { LATEST_VERSION } from 'utils/versioning';

import styles from './version-banner.module.scss';

export const VersionBanner = ({ version, versions }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <div className={styles.inner}>
        <span className={styles.message}>
          ⚠️ This is archived documentation for <b>{version}</b>.
          {typeof versions[LATEST_VERSION] !== 'undefined' && (
            <span>
              {' '}
              Go to the{' '}
              <Link className={'link'} to={versions[LATEST_VERSION].path}>
                latest version
              </Link>
            </span>
          )}
        </span>
      </div>
    </div>
  </div>
);
