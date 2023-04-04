/* eslint-disable react/no-danger */
import { ExtensionCard } from 'components/shared/extension-card';
import { WithCopyButton } from 'components/shared/with-copy-button';
import React, { useState, useEffect, useLayoutEffect } from 'react';

import styles from './extension-selection.module.scss';

export const ExtensionSelection = ({ data, description = '' }) => {
  const [selected, setSelected] = useState([]);
  const [version, setVersion] = useState(null);
  const [allTypes, setAlltypes] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [allCategories, setAllCategories] = useState(new Set());
  const [activeCategories, setActiveCategories] = useState([]);
  const [allTiers, setAllTiers] = useState(new Set());
  const [activeTier, setActiveTier] = useState([]);

  useEffect(() => {
    data.forEach((extension) => {
      setAlltypes((prevState) => [
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
    setActiveCategories([...allCategories]);
  }, [allCategories]);

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

  let code = `$ xk6 build ${version}`;
  selected.forEach((url) => {
    code += ` --with ${url}`;
  });

  return (
    <section className={styles.container}>
      <ul className={styles.filters}>
        <li className={styles.dropdownWrapper}>
          <select
            onChange={({ target }) => {
              const val = target.value;

              if (!val) return;

              // eslint-disable-next-line no-unused-expressions
              val === 'All'
                ? setActiveTier([])
                : setActiveTier([...allTiers].filter((item) => item === val));
            }}
            className={styles.dropdown}
          >
            <option label="Tier" value="All">
              Tier
            </option>
            {[...allTiers].map((node, index) => (
              <option key={index} label={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.dropdownWrapper}>
          <select
            onChange={({ target }) => {
              const val = target.value;

              if (!val) return;

              // eslint-disable-next-line no-unused-expressions
              val === 'All'
                ? setActiveType([])
                : setActiveType([...allTypes].filter((item) => item === val));
            }}
            className={styles.dropdown}
          >
            <option label="Type" value="All">
              Type
            </option>
            {[...allTypes].map((node, index) => (
              <option key={index} label={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.dropdownWrapper}>
          <select
            onChange={({ target }) => {
              if (!target.value) return;

              // eslint-disable-next-line no-unused-expressions
              target.value === 'All'
                ? setActiveCategories([...allCategories])
                : setActiveCategories(
                    [...allCategories].filter((item) => item === target.value),
                  );
            }}
            className={styles.dropdown}
          >
            <option label="Category" value="All">
              Category
            </option>
            {[...allCategories].map((node, index) => (
              <option key={index} label={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </li>
      </ul>
      {!!version && (
        <div className={styles.selection}>
          <p dangerouslySetInnerHTML={{ __html: description }} />
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
      <div className={`container ${styles.list}`}>
        {activeCategories.map((category, index) => {
          const filteredCategories = data
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
            );

          return filteredCategories.length > 0 ? (
            <>
              <h2 key={index} className={styles.listTitle}>
                {category}
              </h2>
              {filteredCategories.map((extension) => (
                <ExtensionCard
                  key={extension.name}
                  extension={extension}
                  isChecked={selected.includes(
                    extension.url.replace('https://', ''),
                  )}
                  onCheckboxClick={() => handleCheckboxClick(extension.url)}
                  hasCheckbox
                />
              ))}
            </>
          ) : null;
        })}
      </div>
    </section>
  );
};
