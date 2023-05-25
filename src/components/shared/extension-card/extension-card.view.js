import classNames from 'classnames';
import { CheckboxField } from 'components/shared/checkbox-field';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import React from 'react';
import ExternalLinkIcon from 'svg/external-link.inline.svg';

import styles from './extension-card.module.scss';

export const ExtensionCard = ({
  extension,
  searchTerm = '',
  hasCheckbox = false,
  isChecked = false,
  onCheckboxClick = () => {},
}) => {
  const { name, description, tiers, stars, cloudEnabled, url } = extension;
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
        <ItemCard liftOnHover={false} as="div">
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
        {hasCheckbox && (
          <div className={styles.checkbox}>
            <CheckboxField
              id={name}
              checked={isChecked}
              onChange={onCheckboxClick}
              accessible={false}
            />
          </div>
        )}
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
          </ul>
          {stars && <span className={styles.stars}>{stars}</span>}
          {cloudEnabled && (
            <span className={styles.cloud}>Available in cloud</span>
          )}
          <a
            className={styles.link}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <span>External link</span>
            <ExternalLinkIcon aria-hidden />
          </a>
        </div>
      </div>
    </Wrapper>
  );
};
