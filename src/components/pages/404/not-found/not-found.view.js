import React from 'react';
import styles from './not-found.module.scss';
import NotFoundIllustration from './svg/not-found.inline.svg';
import { Button } from 'components/shared/button';
import { Heading } from 'components/shared/heading';

export const NotFound = props => (
  <section className={styles.wrapper}>
    <div className={`container ${styles.inner}`}>
      <div className={'row'}>
        <div className={'offset-lg-3 col-lg-6 col-12'}>
          <div className={styles.contentWrapper}>
            <div className={styles.illustrationWrapper}>
              <NotFoundIllustration />
            </div>
            <Heading className={styles.title} tag={'h1'}>
              Oops! 404 page - page not found
            </Heading>
            <p className={styles.description}>
              The page you requested could not be found
            </p>
            <Button
              className={styles.button}
              onClick={() => window.history.back()}
              tag={'button'}
              cursor
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
