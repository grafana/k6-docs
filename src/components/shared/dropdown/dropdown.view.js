import classNames from 'classnames';
import React, { useState } from 'react';

import ArrowIcon from './svg/arrow.inline.svg';

import styles from './dropdown.module.scss';

export const Dropdown = ({ currentOption, options, className, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        {currentOption && <span>{currentOption}</span>}
        <ArrowIcon className={styles.icon} />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {options
            .filter((option) => option !== currentOption)
            .map((option) => (
              <button
                key={option}
                type="button"
                className={styles.menuItem}
                onClick={() => onChange(option)}
              >
                <span>{option}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
