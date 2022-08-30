import React from 'react';

import styles from './table-wrapper.module.scss';

const TableWrapper = ({ className, children }) => (
  <div className={styles.tableWrapper}>
    <table className={className}>{children}</table>
  </div>
);

export default TableWrapper;
