import React from 'react';
import styles from './table-wrapper.module.scss';

const TableWrapper = ({ mdBlockContent }) => (
  <div className={styles.tableWrapper}>
    <table dangerouslySetInnerHTML={{ __html: mdBlockContent }} />
  </div>
);

export default TableWrapper;
