import * as React from 'react';
import Img from 'gatsby-image';
import classNames from 'classnames';
import { Heading } from 'components/shared/heading';
import {
  ItemCard,
  styles as itemCardStyles,
} from 'components/shared/item-card';
import styles from './item-cards-row.module.scss';

export const ItemCardsRow = ({ blockTitle, cardsData, label }) => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      {blockTitle}
    </Heading>
    <div className={'row'}>
      {cardsData.map(({ title, text, picture, ...rest }, i) => (
        <div className={`col-md-4 ${label}`} key={`cardrow-${i}`}>
          <ItemCard {...rest} label={styles.itemCardWrapper}>
            <div className={itemCardStyles.content}>
              {picture && <Img fluid={picture} className={styles.image} />}
              <Heading className={itemCardStyles.title} tag={'h3'} size={'md'}>
                {title}
              </Heading>
              <div className={itemCardStyles.text}>{text}</div>
            </div>
            <div className={classNames(itemCardStyles.footer, styles.footer)}>
              <div className={itemCardStyles.link}>Read more</div>
            </div>
          </ItemCard>
        </div>
      ))}
    </div>
  </section>
);
