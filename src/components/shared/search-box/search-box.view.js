/* eslint-disable prettier/prettier */
import { DocSearch } from '@docsearch/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@docsearch/css';

import styles from './search-box.module.scss';

export const SearchBox = () => {
  const rootRef = useRef(null);

  // TODO add env keys and return null if keys do not exist
  return (
    <div className={classNames(styles.wrapper)} ref={rootRef}>
      <DocSearch
        appId="MGJ30X6AFY"
        apiKey="5f8378d0e74b297ad0ce5ac826a76781"
        indexName="k6"
        placeholder="Search"
      />
    </div>
  );
};
