/* eslint-disable react/no-danger */
import classNames from 'classnames';
import NotFoundIllustration from 'components/pages/404/not-found/svg/not-found.inline.svg';
import { Button } from 'components/shared/button';
import { ExtensionCard } from 'components/shared/extension-card';
import { WithCopyButton } from 'components/shared/with-copy-button';
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from 'react';
import SearchIcon from 'svg/search.inline.svg';

import styles from './extension-selection.module.scss';
import GroupedListIcon from './svg/grouped-list.inline.svg';
import NoneGroupedListIcon from './svg/non-grouped-list.inline.svg';

export const ExtensionSelection = ({ data, description = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [extensions, setExtensions] = useState(data);
  const [selected, setSelected] = useState([]);
  const [version, setVersion] = useState(null);
  const [isExtensionsCategorized, setIsExtensionsCategorized] = useState(true);
  const [allTypes, setAllTypes] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [allCategories, setAllCategories] = useState(new Set());
  const [activeCategories, setActiveCategories] = useState([]);
  const [allTiers, setAllTiers] = useState(new Set());
  const [activeTier, setActiveTier] = useState([]);

  useEffect(() => {
    data.forEach((extension) => {
      setAllTypes((prevState) => [
        ...new Set(prevState.concat(extension.type)),
      ]);

      extension.categories.forEach((category) => {
        if (![...allCategories].includes(category)) {
          setAllCategories((prevState) => new Set(prevState).add(category));
        }
      });

      extension.tiers.forEach((category) => {
        if (![...allTiers].includes(category)) {
          setAllTiers((prevState) => new Set(prevState).add(category));
        }
      });
    });
  }, []);

  useEffect(() => {
    setActiveCategories(
      [...allCategories].sort((item1, item2) => (item1 > item2 ? 1 : -1)),
    );
  }, [allCategories]);

  const filteredExtensionsByCategory = useCallback(
    (category) =>
      extensions
        .filter((extension) => extension.categories.includes(category))
        .filter((extension) =>
          activeTier.length > 0
            ? extension.tiers.includes(activeTier[0])
            : extension,
        )
        .filter((extension) =>
          activeType.length > 0
            ? extension.type.includes(activeType[0])
            : extension,
        ),
    [activeCategories, activeTier, activeType, extensions],
  );

  const filteredExtensions = useCallback(
    () =>
      extensions
        .filter((extension) =>
          activeCategories.length === 1
            ? extension.categories.includes(activeCategories[0])
            : extension,
        )
        .filter((extension) =>
          activeTier.length > 0
            ? extension.tiers.includes(activeTier[0])
            : extension,
        )
        .filter((extension) =>
          activeType.length > 0
            ? extension.type.includes(activeType[0])
            : extension,
        ),
    [activeCategories, activeTier, activeType, extensions],
  );

  const totalActiveExtensions = useMemo(
    () =>
      activeCategories
        .map((category) => filteredExtensionsByCategory(category))
        .flat(),
    [activeCategories, activeTier, activeType, extensions],
  );

  const fetchLatestVersion = async (callback) => {
    try {
      const res = await fetch(
        'https://api.github.com/repositories/54400687/releases/latest',
      ).then((res) => res.json());
      callback(res.tag_name);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Unable to fetch git version');
    }
  };

  useLayoutEffect(() => {
    fetchLatestVersion(setVersion);
  }, []);

  const handleCheckboxClick = (url) => {
    const urlWithoutPrefix = url.replace('https://', '');

    if (selected.includes(urlWithoutPrefix)) {
      setSelected(selected.filter((item) => item !== urlWithoutPrefix));
    } else {
      setSelected([...selected, urlWithoutPrefix]);
    }
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;

    setSearchTerm(value);
    setExtensions([
      ...new Set([
        ...data.filter((extension) =>
          extension.name.toLowerCase().includes(value.trim().toLowerCase()),
        ),
        ...data.filter((extension) =>
          extension.description
            .toLowerCase()
            .includes(value.trim().toLowerCase()),
        ),
      ]),
    ]);
  };

  const handleResetFilters = () => {
    setActiveTier([]);
    setActiveType([]);
    setSearchTerm('');
    setExtensions(data);
    setActiveCategories(
      [...allCategories].sort((item1, item2) => (item1 > item2 ? 1 : -1)),
    );
  };

  let code = `$ xk6 build ${version}`;
  selected.forEach((url) => {
    code += ` --with ${url}`;
  });

  return (
    <section className={styles.container}>
      {!!version && (
        <div className={styles.selection}>
          <ul className={classNames('container', styles.filters)}>
            <li className={styles.dropdownWrapper}>
              <select
                className={styles.fieldSelect}
                value={activeTier.length > 0 ? activeTier[0] : 'All'}
                onChange={({ target }) => {
                  const val = target.value;

                  if (!val) return;

                  // eslint-disable-next-line no-unused-expressions
                  val === 'All'
                    ? setActiveTier([])
                    : setActiveTier(
                        [...allTiers].filter((item) => item === val),
                      );
                }}
              >
                <option disabled value="All">
                  Tier
                </option>
                {[...allTiers]
                  .sort((item1, item2) => (item1 > item2 ? 1 : -1))
                  .map((node, index) => (
                    <option key={index} label={node} value={node}>
                      {node}
                    </option>
                  ))}
              </select>
              {activeTier.length > 0 && (
                <button
                  className={styles.fieldClear}
                  type="button"
                  onClick={() => setActiveTier([])}
                >
                  clear
                </button>
              )}
            </li>
            <li className={styles.dropdownWrapper}>
              <select
                className={styles.fieldSelect}
                value={activeType.length > 0 ? activeType[0] : 'All'}
                onChange={({ target }) => {
                  const val = target.value;

                  if (!val) return;

                  // eslint-disable-next-line no-unused-expressions
                  val === 'All'
                    ? setActiveType([])
                    : setActiveType(
                        [...allTypes].filter((item) => item === val),
                      );
                }}
              >
                <option disabled value="All">
                  Type
                </option>
                {[...allTypes]
                  .sort((item1, item2) => (item1 > item2 ? 1 : -1))
                  .map((node, index) => (
                    <option key={index} label={node} value={node}>
                      {node}
                    </option>
                  ))}
              </select>
              {activeType.length > 0 && (
                <button
                  className={styles.fieldClear}
                  type="button"
                  onClick={() => setActiveType([])}
                >
                  clear
                </button>
              )}
            </li>
            <li className={styles.dropdownWrapper}>
              <select
                className={styles.fieldSelect}
                value={
                  activeCategories.length === 1 ? activeCategories[0] : 'All'
                }
                onChange={({ target }) => {
                  if (!target.value) return;

                  // eslint-disable-next-line no-unused-expressions
                  target.value === 'All'
                    ? setActiveCategories(
                        [...allCategories].sort((item1, item2) =>
                          item1 > item2 ? 1 : -1,
                        ),
                      )
                    : setActiveCategories(
                        [...allCategories]
                          .filter((item) => item === target.value)
                          .sort((item1, item2) => (item1 > item2 ? 1 : -1)),
                      );
                }}
              >
                <option disabled value="All">
                  Category
                </option>
                {[...allCategories]
                  .sort((item1, item2) => (item1 > item2 ? 1 : -1))
                  .map((node, index) => (
                    <option key={index} label={node} value={node}>
                      {node}
                    </option>
                  ))}
              </select>
              {activeCategories.length === 1 && (
                <button
                  className={styles.fieldClear}
                  type="button"
                  onClick={() =>
                    setActiveCategories(
                      [...allCategories].sort((item1, item2) =>
                        item1 > item2 ? 1 : -1,
                      ),
                    )
                  }
                >
                  Clear
                </button>
              )}
            </li>
            <li className={styles.fieldWrapper}>
              <SearchIcon className={styles.fieldIcon} />
              <input
                className={styles.fieldInput}
                type="search"
                placeholder="Find extension..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              {searchTerm.length > 0 && (
                <button
                  className={styles.fieldClear}
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setExtensions(data);
                  }}
                >
                  clear
                </button>
              )}
            </li>
            <li className={styles.buttonWrapper}>
              <Button
                className={classNames(
                  styles.filterButton,
                  isExtensionsCategorized && styles.filterButtonActive,
                )}
                theme="transparent"
                size="sm"
                disabled={isExtensionsCategorized}
                onClick={() => setIsExtensionsCategorized(true)}
              >
                <GroupedListIcon />
                Enable grouped listing
              </Button>
            </li>
            <li className={styles.buttonWrapper}>
              <Button
                className={classNames(
                  styles.filterButton,
                  !isExtensionsCategorized && styles.filterButtonActive,
                )}
                theme="transparent"
                size="sm"
                disabled={!isExtensionsCategorized}
                onClick={() => setIsExtensionsCategorized(false)}
              >
                <NoneGroupedListIcon />
                Enable non-grouped listing
              </Button>
            </li>
          </ul>
          {activeCategories.length === 1 ||
          activeTier.length > 0 ||
          activeType.length > 0 ||
          searchTerm ? (
            <p className={styles.result}>
              <span>
                <b className={styles.number}>{totalActiveExtensions.length}</b>{' '}
                result{totalActiveExtensions.length === 1 ? '' : 's'} found
              </span>{' '}
              <Button
                className={styles.clearButton}
                theme="transparent"
                size="sm"
                onClick={handleResetFilters}
              >
                Clear filter
              </Button>
            </p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: description }} />
          )}
          <WithCopyButton
            dataToCopy={code.replace(/^\$\s/gm, '')}
            copyButtonLabel={styles.copy}
          >
            <div className={styles.codeWrapper}>
              <span className={styles.code}>{code}</span>
            </div>
          </WithCopyButton>
          <div className={styles.actions}>
            <span className={styles.selected}>
              <span className={styles.number}>{selected.length}</span> extension
              {selected.length === 1 ? '' : 's'} selected
            </span>
            {selected.length > 0 && (
              <button
                className={styles.clear}
                type="button"
                onClick={() => setSelected([])}
              >
                clear
              </button>
            )}
          </div>
        </div>
      )}
      <div className="container">
        {/* eslint-disable-next-line no-nested-ternary */}
        {totalActiveExtensions.length === 0 ? (
          <div className={styles.notFoundWrapper}>
            <NotFoundIllustration className={styles.notFoundIllustration} />
            <h2 className={styles.notFoundTitle}>Oops! No match found.</h2>
            <p className={styles.notFoundDescription}>
              Adjust or clear the filters and try again.
            </p>
            <Button cursor onClick={handleResetFilters}>
              Clear all filters
            </Button>
          </div>
        ) : isExtensionsCategorized ? (
          activeCategories.map((category, index) =>
            filteredExtensionsByCategory(category).length > 0 ? (
              <div key={index} className={styles.list}>
                <h2 className={styles.listTitle}>{category}</h2>
                {filteredExtensionsByCategory(category)
                  .sort((item1, item2) => (item1.name > item2.name ? 1 : -1))
                  .map((extension) => (
                    <ExtensionCard
                      key={extension.name}
                      extension={extension}
                      searchTerm={searchTerm}
                      isChecked={selected.includes(
                        extension.url.replace('https://', ''),
                      )}
                      onCheckboxClick={() => handleCheckboxClick(extension.url)}
                      hasCheckbox
                    />
                  ))}
              </div>
            ) : null,
          )
        ) : (
          <div className={styles.list}>
            {filteredExtensions()
              .sort((item1, item2) => (item1.name > item2.name ? 1 : -1))
              .map((extension) => (
                <ExtensionCard
                  key={extension.name}
                  extension={extension}
                  searchTerm={searchTerm}
                  isChecked={selected.includes(
                    extension.url.replace('https://', ''),
                  )}
                  onCheckboxClick={() => handleCheckboxClick(extension.url)}
                  hasCheckbox
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};
