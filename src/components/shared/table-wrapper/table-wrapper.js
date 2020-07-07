import React from 'react';
import styles from './table-wrapper.module.scss';

const TableWrapper = ({ children }) => (
  <div className={styles.tableWrapper}>
    <table>{children}</table>
  </div>
);

export default TableWrapper;
