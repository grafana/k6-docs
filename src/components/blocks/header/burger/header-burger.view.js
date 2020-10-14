import React from 'react';

import styles from './header-burger.module.scss';

export const Burger = ({ onClick }) => (
  <button className={styles.wrapper} type={'button'} onClick={onClick} />
);
