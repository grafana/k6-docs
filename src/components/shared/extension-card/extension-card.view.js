import { CheckboxField } from 'components/shared/checkbox-field';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import React from 'react';

import styles from './extension-card.module.scss';

export const ExtensionCard = ({
  extension,
  hasCheckbox = false,
  isChecked = false,
  onCheckboxClick = () => {},
}) => {
  const Wrapper = ({ className, children }) => {
    if (hasCheckbox) {
      return (
        <ItemCard
          lifted={false}
          as="button"
          type="button"
          onClick={onCheckboxClick}
        >
          <div
            className={`${styles.withCheckbox} ${
              isChecked ? styles.checked : ''
            } ${className}`}
          >
            {children}
          </div>
        </ItemCard>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-indent
      <ItemCard as="a" href={extension.url}>
        <div className={className}>{children}</div>
      </ItemCard>
    );
  };

  return (
    <Wrapper className={`${itemCardStyles.content} ${styles.wrapper}`}>
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
      <div className={styles.content}>
        <span className={styles.name}>{extension.name}</span>
        <span className={styles.description}>{extension.description}</span>
      </div>
    </Wrapper>
  );
};
