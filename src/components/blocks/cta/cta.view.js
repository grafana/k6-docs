import React from 'react';

import { Heading } from 'components/shared/heading';
import { Button } from 'components/shared/button';
import { navigate } from 'gatsby';

import styles from './cta.module.scss';

import ButtonBg from './svg/button-bg.inline.svg';

export const CTA = ({
  title,
  description,
  buttonText,
  buttonURL,
  buttonRef,
  buttonTarget,
  openDrift,
  openDriftMessage,
  themeLight,
}) => (
  <section className={styles.wrapper}>
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-xl-10 offset-xl-1'}>
          <div className={themeLight && styles.wrapperLight}>
            <div className={styles.inner}>
              <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>

              <div className={styles.buttonWrapper}>
                {themeLight && <ButtonBg className={styles.buttonBg} />}
                {openDrift ? (
                  <Button
                    className={styles.ctaButton}
                    size={'lg'}
                    theme={!themeLight && 'gradient-primary'}
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
                    theme={!themeLight && 'gradient-primary'}
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
                    theme={!themeLight && 'gradient-primary'}
                    cursor
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
