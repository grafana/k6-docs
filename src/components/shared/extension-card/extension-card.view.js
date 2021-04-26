import classNames from 'classnames';
import { CheckboxField } from 'components/shared/checkbox-field';
import React from 'react';

import styles from './extension-card.module.scss';
import WheelIcon from './svg/wheel.inline.svg';

export const ExtensionCard = ({
  extension,
  hasCheckbox = false,
  isChecked = false,
  onCheckboxClick = () => {},
}) => {
  const Wrapper = ({ className, children }) => {
    if (hasCheckbox) {
      return (
        <button
          type="button"
          className={classNames(styles.withCheckbox, className)}
          onClick={onCheckboxClick}
        >
          {children}
        </button>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-indent
      <a href={extension.url} className={className}>
        {children}
      </a>
    );
  };

  return (
    <Wrapper className={styles.wrapper}>
      {hasCheckbox && (
        <div className={styles.checkbox}>
          <CheckboxField
            id={extension.name}
            checked={isChecked}
            onChange={onCheckboxClick}
          />
        </div>
      )}
      <div className={styles.imageWrapper}>
        <WheelIcon />
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{extension.name}</span>
        <span className={styles.author}>by {extension.author.name}</span>
        <span className={styles.description}>{extension.description}</span>
      </div>
    </Wrapper>
  );
};
