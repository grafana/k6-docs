import { DocSearch } from '@docsearch/react';
import classNames from 'classnames';
import React, { useRef, useEffect } from 'react';
import debounce from 'utils/debounce';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@docsearch/css';

import styles from './search-box.module.scss';

export const SearchBox = () => {
  const rootRef = useRef(null);

  // @NOTE: this is a workaround to prevent scroll to the page bottom when closing search modal in Safari
  // https://github.com/algolia/docsearch/issues/1260#issuecomment-1011939736
  useEffect(() => {
    let div = document.querySelector('.fixed[data-docsearch-fixed]');

    if (!div) {
      div = document.createElement('div');
      div.classList.add('fixed');
      div.setAttribute('data-docsearch-fixed', '');
      div.innerHTML = '<input type="text" aria-label="hidden">';
      document.body.appendChild(div);
    }
  }, []);

  return (
    <div className={classNames(styles.wrapper)} ref={rootRef}>
      <DocSearch
        appId={process.env.GATSBY_ALGOLIA_APP_ID}
        apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        placeholder="Search"
        transformSearchClient={(searchClient) => ({
          ...searchClient,
          search: debounce(searchClient.search, 500),
        })}
      />
    </div>
  );
};
