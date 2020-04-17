import React from 'react';
import { Heading } from 'components/shared/heading';

import styles from './doc-welcome-page-info.module.scss';

export const PageInfo = ({ title, description, className }) => (
  <section className={`container ${styles.container} ${className}`}>
    <Heading className={styles.title} tag={'h1'}>{title}</Heading>
    <p className={styles.description}
       dangerouslySetInnerHTML={{ __html: description }}
    />
  </section>
);
