import React from 'react';
import styles from './cookie-consent.module.scss';
import { Button } from '../button';

import { main } from 'utils/urls';

const CookieConsent = ({ onAccept }) => (
  <div className={styles.wrapper}>
    <div className={'container'}>
      <span className={styles.message}>
        This site uses cookies. Using k6.io means you agree to use of our
        cookies. Please, feel free read our{' '}
        <a
          className={'link'}
          target={'_blank'}
          href={`${main}/privacy-policy`}
        >
          Privacy Policy
        </a>{' '}
        for further information.
      </span>
      <Button className={styles.btn} size={'sm'} onClick={onAccept}>
        Got it
      </Button>
    </div>
  </div>
);

export default CookieConsent;
