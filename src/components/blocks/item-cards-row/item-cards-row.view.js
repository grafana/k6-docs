import classNames from 'classnames';
import { Heading } from 'components/shared/heading';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

import styles from './item-cards-row.module.scss';

export const ItemCardsRow = ({
  blockTitle,
  subtitle,
  cardsData,
  label,
  linkText,
}) => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      {blockTitle}
    </Heading>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <div className={'row'}>
      {cardsData.map(({ title, text, image, ...rest }, i) => (
        <div className={`col-md-4 ${label}`} key={`cardrow-${i}`}>
          <ItemCard {...rest} label={styles.itemCardWrapper}>
            <div className={itemCardStyles.content}>
              {image && (
                <GatsbyImage image={getImage(image)} className={styles.image} />
              )}
              <Heading className={itemCardStyles.title} tag={'h3'} size={'md'}>
                {title}
              </Heading>
              {text ? <div className={itemCardStyles.text}>{text}</div> : null}
            </div>
            <div className={classNames(itemCardStyles.footer, styles.footer)}>
              <div className={itemCardStyles.link}>{linkText}</div>
            </div>
          </ItemCard>
        </div>
      ))}
    </div>
  </section>
);
