import React from 'react';
import { Link } from 'gatsby';
import Logo from 'svg/logo.inline.svg';

import styles from './header-logo.module.scss';

import { main } from 'utils/urls';


export const HeaderLogo = ({disableLink = false}) => {
  if (disableLink) {
    return (
      <Logo className={styles.logo}/>
    );
  } else {
    return (
      <a className={styles.wrapper} href={`${main}`}>
        <Logo className={styles.logo}/>
      </a>
    );
  }
};