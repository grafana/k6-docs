import React from 'react';
import { Heading } from 'components/shared/heading';
import styles from './partners.module.scss';
import classNames from 'classnames';
import amazonLogo from './images/amazon.svg';
import noaaLogo from './images/noaa.svg';
import sephoraLogo from './images/sephora.svg';
import citrixLogo from './images/citrix.svg';
import uefaLogo from './images/uefa.svg';
import koneLogo from './images/kone.svg';

export const Partners = ({ title }) => (
  <section className={styles.wrapper}>
    <div className={'container'}>
      <Heading className={styles.title} tag={'h2'} size={'xs'}>
        {title}
      </Heading>
      <div className={styles.logosWrapper}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={amazonLogo} alt={'Amazon'}/>
        </div>
        <div className={styles.logoWrapper}>
          <img
            className={classNames(styles.logo, styles.round)}
            src={noaaLogo}
            alt={'Noaa'}
          />
        </div>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={sephoraLogo} alt={'Serphora'}/>
        </div>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={citrixLogo} alt={'Citrix'}/>
        </div>
        <div className={styles.logoWrapper}>
          <img
            className={classNames(styles.logo, styles.round)}
            src={uefaLogo}
            alt={'Uefa'}
          />
        </div>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={koneLogo} alt={'Kone'}/>
        </div>
      </div>
    </div>
  </section>
);
