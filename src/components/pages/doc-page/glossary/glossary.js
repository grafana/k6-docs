import React from 'react';

import styles from './glossary.module.scss';

const Glossary = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default Glossary;
