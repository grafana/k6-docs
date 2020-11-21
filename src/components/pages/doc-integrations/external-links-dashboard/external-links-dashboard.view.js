import { Heading } from 'components/shared/heading';
import Img from 'gatsby-image';
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
      {linksData.map(({ picture, title, description, url }, i) => (
        <li className={styles.linkWrapper} key={`exb-${i}`}>
          {picture && (
            <div className={styles.pictureWrapper}>
              <Img fixed={picture} />
            </div>
          )}
          <div className={styles.content}>
            <p className={styles.linkTitle}>{title}</p>
            <p className={styles.linkDescription}>{description}</p>
            <p className={styles.link}>
              <a className={'link'} href={url}>
                {url}
              </a>
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
