import React, { useState, useEffect, useRef } from 'react';
import {
  InstantSearch,
  Index,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Input from './search-input';
import * as hitComps from './hit-comps';
import classNames from 'classnames';
import styles from './search-box.module.scss';
import { Heading } from 'components/shared/heading';
import Algolia from 'svg/icon-algolia.inline.svg';

const Hits = connectHits(({ showAll, hitComponent: Comp, hits }) => (
  <ul>
    {hits.slice(0, showAll ? hits.length : 5).map((hit, i) => (
      <li key={`he-${i}${hit.objectID}`}>
        <Comp hit={hit} />
      </li>
    ))}
  </ul>
));

const Results = connectStateResults(
  ({ setResultsExist, searchState: state, searchResults: res, children }) => {
    if (res && res.nbHits > 0) {
      setResultsExist(true);
      return null;
    }
    setResultsExist(false);
    return null;
  },
);

const Stats = connectStateResults(({ setResultsExist, searchResults: res }) => {
  if (res && res.nbHits > 0) {
    setResultsExist(true);
    return (
      <span className={styles.stats}>
        {`${res.nbHits} result${res.nbHits > 1 ? 's' : ''}`}
      </span>
    );
  } else {
    setResultsExist(false);
    return null;
  }
});

const useClickOutside = (ref, handler, events) => {
  if (!events) events = ['mousedown', 'touchstart'];
  const detectClickOutside = (event) =>
    !ref.current.contains(event.target) && handler();
  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, detectClickOutside);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside);
      }
    };
  });
};

export const SearchBox = ({ inputLabel, indices }) => {
  if (
    !process.env.GATSBY_ALGOLIA_APP_ID ||
    !process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
  ) {
    return null;
  }
  const rootRef = useRef(null);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const [allResultsShown, setAllResultsShown] = useState(false);
  const [resultsExist, setResultsExist] = useState(false);

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY,
  );
  useClickOutside(rootRef, () => setFocus(false));
  return (
    <div className={classNames(styles.wrapper)} ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
        placeholder={'Search'}
        showReset
      >
        <Input
          label={inputLabel}
          queryLength={query.length}
          onFocus={() => setFocus(true)}
        />
        <div
          className={classNames(styles.hitsWrapper, {
            [styles.hitsWrapper_show]: query.length > 0 && focus,
          })}
        >
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <Heading tag={'h3'} size={'sm'} className={styles.indexHeading}>
                  {resultsExist ? 'Search results for' : 'No results for'}
                  <span className={styles.indexHeadingKeyword}> "{query}"</span>
                </Heading>
                <Stats setResultsExist={setResultsExist} />
              </header>
              {resultsExist && (
                <Hits
                  showAll={allResultsShown}
                  hitComponent={hitComps[hitComp](() => setFocus(false))}
                />
              )}
            </Index>
          ))}
          <span className={styles.poweredBy}>
            {resultsExist && (
              <button
                type={'button'}
                onClick={() => setAllResultsShown(!allResultsShown)}
                className={classNames('link', styles.toggleResultsBtn, {
                  [styles.toggleResultsBtn_open]: allResultsShown,
                })}
              >
                Show {allResultsShown ? 'less' : 'more'}
              </button>
            )}
            <a
              href={'https://algolia.com'}
              target={'_blank'}
              className={'link'}
            >
              Powered by
              <Algolia />
              Algolia
            </a>
          </span>
        </div>
      </InstantSearch>
    </div>
  );
};
