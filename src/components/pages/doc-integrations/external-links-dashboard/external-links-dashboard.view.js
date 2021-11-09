import { Heading } from 'components/shared/heading';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import styles from './external-links-dashboard.module.scss';

export const ExternalLinksDashboard = ({
  dashboardTitle,
  subtitle,
  linksData,
}) => (
  <div className={`container ${styles.wrapper}`}>
    <Heading tag={'h2'} size={'lg'}>
      {dashboardTitle}
    </Heading>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <ul className={styles.dashboard}>
      {linksData.map(({ image, title, description, url }, i) => (
        <li key={`exb-${i}`}>
          <a className={styles.link} href={url}>
            {image && (
              <div className={styles.pictureWrapper}>
                <GatsbyImage image={getImage(image)} />
              </div>
            )}
            <p className={styles.linkTitle}>{title}</p>
            <p className={styles.linkDescription}>{description}</p>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
