import { Link } from 'gatsby';
import React from 'react';

import styles from './version-banner.module.scss';

const VersionBanner = ({ version, path }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <div className={styles.inner}>
        <span className={styles.message}>
          This is archived documentation for <b>{version}</b>. Go to the{' '}
          <Link
            className={'link'}
            to={path.replace(
              `javascript-api/${version.replace(/\./g, '-')}/`,
              'javascript-api/',
            )}
          >
            latest version
          </Link>
        </span>
      </div>
    </div>
  </div>
);

export default VersionBanner;
