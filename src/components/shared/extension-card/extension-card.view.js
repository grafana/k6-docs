import classNames from 'classnames';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import React from 'react';

import styles from './extension-card.module.scss';

export const ExtensionCard = ({
  extension,
  searchTerm = '',
  hasCheckbox = false,
  isChecked = false,
  onCheckboxClick = () => {},
}) => {
  const { name, description, tiers, stars, cloudEnabled, url, logo } =
    extension;
  const extensionName = searchTerm
    ? name.replace(
        new RegExp(searchTerm, 'gi'),
        (match) => `<mark>${match}</mark>`,
      )
    : name;
  const extensionDescription = searchTerm
    ? description.replace(
        new RegExp(searchTerm, 'gi'),
        (match) => `<mark>${match}</mark>`,
      )
    : description;

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
      <ItemCard as="a" href={url}>
        <div className={className}>{children}</div>
      </ItemCard>
    );
  };

  return (
    <Wrapper
      className={`${itemCardStyles.content} ${styles.wrapper} ${
        isChecked ? styles.checked : ''
      }`}
    >
      <div className={styles.content}>
        <ul className={styles.tiersWrapper}>
          {tiers.map((tier, index) => (
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
          {logo && (
            <li className={styles.logoWrapper}>
              <img
                className={styles.logo}
                src={logo}
                width="auto"
                height="24"
                alt={name}
                loading="lazy"
              />
            </li>
          )}
        </ul>
        <div className={styles.nameWrapper}>
          <span
            className={styles.name}
            dangerouslySetInnerHTML={{ __html: extensionName }}
          />
        </div>
        <span
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: extensionDescription }}
        />
        <div className={styles.external}>
          {stars && <span className={styles.stars}>{stars}</span>}
          {cloudEnabled && (
            <span className={styles.cloud}>Available in cloud</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
