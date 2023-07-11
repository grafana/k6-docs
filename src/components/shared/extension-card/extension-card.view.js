import classNames from 'classnames';
import { CheckboxField } from 'components/shared/checkbox-field';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import React from 'react';

import styles from './extension-card.module.scss';

const parseString = (str) => {
  let string = str.replace(/-/gi, '<wbr />-');

  // Find the last occurrence of '<wbr />'
  const lastIndex = string.lastIndexOf('<wbr />');

  if (lastIndex !== -1) {
    // Wrap the part of the string after the last '<wbr />' with 'span' tags
    const prefix = string.slice(0, lastIndex);
    const suffix = string.slice(lastIndex + 8); // Length of '<wbr />'

    // eslint-disable-next-line max-len
    string = `${prefix}<wbr />-<span class="no-wrap">${suffix}<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" style="margin-left: 8px"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M4.429 1H2.714C1 1 1 1 1 2.714v9.352C1 13 1 13 2.714 13h8.572C13 13 13 13 13 11.286V9.57M7.857 1H13m0 0v5.143M13 1 6.143 7.857"/></svg></span>`;
  }

  return string;
};

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
      <ItemCard as="div">
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
          <a
            className={styles.name}
            href={url}
            target="_blank"
            rel="noreferrer"
            dangerouslySetInnerHTML={{
              __html: parseString(extensionName),
            }}
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
        </div>
      </div>
    </Wrapper>
  );
};
