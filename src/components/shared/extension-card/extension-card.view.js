import classNames from 'classnames';
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
  const Wrapper = ({ className = '', children }) => {
    if (hasCheckbox) {
      return (
        <ItemCard
          liftOnHover={false}
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
        <ul className={styles.tiersWrapper}>
          {extension.tiers.map((tier, index) => (
            <li
              className={classNames(
                styles.tier,
                tier === 'Official' && styles.tierOfficial,
                tier === 'Verified' && styles.tierVerified,
                tier === 'Community' && styles.tierCommunity,
              )}
              key={index}
            >
              <span>{tier}</span>
            </li>
          ))}
        </ul>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{extension.name}</span>
        </div>
        <span className={styles.description}>{extension.description}</span>
        <div className={styles.external}>
          {extension.stars && (
            <span className={styles.stars}>{extension.stars}</span>
          )}
          {extension.cloudEnabled && (
            <span className={styles.cloud}>Available in cloud</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
