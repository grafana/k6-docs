import { Button } from 'components/shared/button';
import { Heading } from 'components/shared/heading';
import { HeroFrame } from 'components/shared/hero-frame';
import React from 'react';

import styles from './page-info.module.scss';

export const PageInfo = ({
  title,
  description,
  buttonText,
  buttonURL,
  buttonRef,
  className,
}) => (
  <section className={`${styles.wrapper} ${className}`}>
    <div className={'container'}>
      <Heading className={styles.title} tag={'h1'}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
      {buttonText && buttonURL ? (
        <Button className={styles.button} tag={'link'} to={buttonURL} cursor>
          {buttonText}
        </Button>
      ) : (
        buttonText &&
        buttonRef && (
          <Button className={styles.button} tag={'a'} href={buttonRef} cursor>
            {buttonText}
          </Button>
        )
      )}
    </div>
    <HeroFrame />
  </section>
);
