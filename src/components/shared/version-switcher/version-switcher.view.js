import classNames from 'classnames';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { addTrailingSlash } from 'utils/utils.node';
import { SUPPORTED_VERSIONS, LATEST_VERSION } from 'utils/versioning';

import styles from './version-switcher.module.scss';

export const VersionSwitcher = ({
  currentVersion = LATEST_VERSION,
  path,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVersionChange = (newVersion) => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = path;

    let newPath;

    if (currentVersion === LATEST_VERSION) {
      newPath = currentPath.replace(
        'javascript-api/',
        `javascript-api/${newVersion.replace(/\./g, '-')}/`,
      );
    } else if (newVersion === LATEST_VERSION) {
      newPath = currentPath.replace(
        `javascript-api/${currentVersion.replace(/\./g, '-')}/`,
        'javascript-api/',
      );
    } else {
      newPath = currentPath.replace(
        `javascript-api/${currentVersion.replace(/\./g, '-')}/`,
        `javascript-api/${newVersion.replace(/\./g, '-')}/`,
      );
    }
    navigate(addTrailingSlash(newPath));
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
          {[`${LATEST_VERSION}`, ...SUPPORTED_VERSIONS]
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
