import React from 'react';
import { Heading } from 'components/shared/heading';
import { Button } from 'components/shared/button';

import styles from './cta.module.scss';

export const CTA = ({
  title,
  description,
  buttonText,
  buttonURL,
  buttonRef,
  buttonTarget,
  openDrift,
  openDriftMessage,
}) => (
  <section className={styles.wrapper}>
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-xl-10 offset-xl-1'}>
          <div className={styles.inner}>
            <div className={styles.content}>
              <Heading className={styles.title} tag={'h2'}>
                {title}
              </Heading>
              <p className={styles.description}>{description}</p>
            </div>

            {openDrift ? (
              <Button
                className={styles.ctaButton}
                size={'lg'}
                theme={'gradient-primary'}
                onClick={() => {
                  if (typeof window.drift.api !== 'undefined') {
                    window.drift.api.sidebar.toggle();
                  } else {
                    navigate('/contact');
                  }
                }}
                cursor
              >
                {buttonText}
              </Button>
            ) : buttonRef ? (
              <Button
                className={styles.ctaButton}
                tag={'a'}
                href={buttonRef}
                target={buttonTarget}
                size={'lg'}
                theme={'gradient-primary'}
                cursor
              >
                {buttonText}
              </Button>
            ) : (
              <Button
                className={styles.ctaButton}
                tag={'link'}
                to={buttonURL}
                size={'lg'}
                theme={'gradient-primary'}
                cursor
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);
