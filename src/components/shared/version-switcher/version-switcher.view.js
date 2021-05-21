import classNames from 'classnames';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { addTrailingSlash } from 'utils/utils.node';
import { LATEST_VERSION } from 'utils/versioning';

import styles from './version-switcher.module.scss';

export const VersionSwitcher = ({
  currentVersion = LATEST_VERSION,
  versions,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableVersions = Object.keys(versions).sort().reverse();

  const handleVersionChange = (newVersion) => {
    if (typeof window === 'undefined') {
      return;
    }
    navigate(addTrailingSlash(versions[newVersion].path));
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={classNames(
          styles.current,
          isOpen ? styles.currentOpen : styles.currentClose,
        )}
      >
        {currentVersion && <span>{currentVersion}</span>}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {availableVersions
            .filter((version) => version !== currentVersion)
            .map((version) => (
              <button
                key={version}
                type="button"
                className={styles.menuItem}
                onClick={() => handleVersionChange(version)}
              >
                <span>{version}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
