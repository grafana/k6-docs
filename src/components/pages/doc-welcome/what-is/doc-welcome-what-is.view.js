import { Heading } from 'components/shared/heading';
import * as React from 'react';

import styles from './doc-welcome-what-is.module.scss';

export const WhatIs = () => {
  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        What is k6?
      </Heading>
      <p className={styles.description}>
        k6 is a developer-centric, free and open-source load testing tool built
        for making performance testing a productive and enjoyable experience.
      </p>
      <p className={styles.description}>
        Using k6, you&apos;ll be able to catch performance regression and
        problems earlier, allowing you to build resilient systems and robust
        applications.
      </p>
    </section>
  );
};
