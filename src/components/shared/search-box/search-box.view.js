/* eslint-disable prettier/prettier */
import { DocSearch } from '@docsearch/react';
import classNames from 'classnames';
import React, { useRef } from 'react';

import styles from './search-box.module.scss';

export const SearchBox = () => {
  const rootRef = useRef(null);

  // TODO add env keys and return null if keys do not exist

  return (
    <div className={classNames(styles.wrapper)} ref={rootRef}>
      <DocSearch
        appId="MGJ30X6AFY"
        apiKey="49dea9cc3035bda0c2baf4894e7dc271"
        indexName="k6"
        placeholder="Search"
      />
    </div>
  );
};
