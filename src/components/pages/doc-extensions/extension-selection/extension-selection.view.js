import { ExtensionCard } from 'components/shared/extension-card';
import { WithCopyButton } from 'components/shared/with-copy-button';
import React, { useState, useLayoutEffect } from 'react';

import styles from './extension-selection.module.scss';

export const ExtensionSelection = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [version, setVersion] = useState(null);

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
      {!!version && (
        <div className={styles.selection}>
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
        {data
          .sort((item1, item2) => (item1.name > item2.name ? 1 : -1))
          .map((extension) => (
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
      </div>
    </section>
  );
};
