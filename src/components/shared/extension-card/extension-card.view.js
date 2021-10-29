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
            accessible={false}
          />
        </div>
      )}
      <div
        className={classNames(
          styles.imageWrapper,
          extension?.isLogoLarge && styles.cover,
        )}
      >
        {extension.logo ? (
          <img src={extension.logo} alt={extension.name} />
        ) : (
          <WheelIcon />
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{extension.name}</span>
        <span className={styles.description}>{extension.description}</span>
      </div>
    </Wrapper>
  );
};
