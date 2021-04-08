import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';
import { Heading } from 'components/shared/heading';
import { useLocale } from 'contexts/locale-provider';
import React, { useState, useEffect, useRef } from 'react';
import {
  InstantSearch,
  Index,
  Configure,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';
import Algolia from 'svg/icon-algolia.inline.svg';

import * as hitComps from './hit-comps';
import styles from './search-box.module.scss';
import Input from './search-input';

const Hits = connectHits(({ showAll, hitComponent: Comp, hits }) => (
  <ul>
    {hits.slice(0, showAll ? hits.length : 5).map((hit, i) => (
      <li key={`he-${i}${hit.objectID}`}>
        <Comp hit={hit} />
      </li>
    ))}
  </ul>
));

const Stats = connectStateResults(({ setResultsExist, searchResults }) => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (searchResults?.nbHits) {
      const { nbHits, processingTimeMS } = searchResults;
      setResultsExist(true);
      setStats(
        <span className={styles.stats}>
          {`${nbHits} result${
            nbHits > 1 ? 's' : ''
          } found in ${processingTimeMS}ms`}
        </span>,
      );
    } else setResultsExist(false);
  }, [searchResults]);
  return stats;
});

const useClickOutside = (ref, handler, events) => {
  const _events = events || ['mousedown', 'touchstart'];
  const detectClickOutside = (event) =>
    !ref.current.contains(event.target) && handler();
  useEffect(() => {
    _events.forEach((event) =>
      document.addEventListener(event, detectClickOutside),
    );
    return () => {
      _events.forEach((event) =>
        document.removeEventListener(event, detectClickOutside),
      );
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

  const { locale } = useLocale();

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
        <Configure filters={locale} />
        <Input
          label={inputLabel}
          queryLength={query?.length || 0}
          onFocus={() => setFocus(true)}
        />
        <div
          className={classNames(styles.hitsWrapper, {
            [styles.hitsWrapper_show]: query && query.length > 0 && focus,
          })}
        >
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <Heading tag={'h3'} size={'sm'} className={styles.indexHeading}>
                  {resultsExist ? 'Search results for' : 'No results for'}
                  <span className={styles.indexHeadingKeyword}>
                    {' '}
                    &ldquo;{query}&rdquo;
                  </span>
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
              rel={'noreferrer'}
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
