import { Button } from 'components/shared/button';
import { Heading } from 'components/shared/heading';
import React from 'react';

import styles from './not-found.module.scss';
import NotFoundIllustration from './svg/not-found.inline.svg';

export const NotFound = () => (
  <section className={styles.wrapper}>
    <div className={`container ${styles.inner}`}>
      <div className={'row'}>
        <div className={'offset-lg-3 col-lg-6 col-12'}>
          <div className={styles.contentWrapper}>
            <div className={styles.illustrationWrapper}>
              <NotFoundIllustration />
            </div>
            <Heading className={styles.title} tag={'h1'}>
              Oops! Broken link.
            </Heading>
            <p className={styles.description}>
              The docs are publicly available on GitHub.
            </p>
            <Button
              className={styles.button}
              href={'https://github.com/grafana/k6-docs'}
              tag={'a'}
              cursor
            >
              Report Issue on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
