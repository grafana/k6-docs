import classNames from 'classnames';
import useClickOutside from 'hooks/use-click-outside';
import React, { useRef, useState } from 'react';

import styles from './dropdown.module.scss';
import ArrowIcon from './svg/arrow.inline.svg';

export const Dropdown = ({ currentOption, options, className, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ddRef = useRef(null);
  useClickOutside(ddRef, () => setIsOpen(false));
  return (
    <div className={classNames(styles.wrapper, className)} ref={ddRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={classNames(
          styles.current,
          isOpen ? styles.currentOpen : styles.currentClose,
        )}
      >
        {currentOption && (
          <span>
            {options.find((item) => item.value === currentOption)?.label ??
              currentOption}
          </span>
        )}
        <ArrowIcon className={styles.icon} />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {options
            .filter((option) => option.value !== currentOption)
            .map((option) => (
              <button
                key={option.value}
                type="button"
                className={styles.menuItem}
                onClick={() => onChange(option.value)}
              >
                <span>{option.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
