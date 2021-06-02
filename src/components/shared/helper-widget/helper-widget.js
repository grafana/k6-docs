import React, { useState, useEffect } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import styles from './helper-widget.module.scss';
// icons
import CloseIcon from './svg/close.inline.svg';
import Cloud from './svg/cloud.inline.svg';
import Message from './svg/message.inline.svg';
import OpenIcon from './svg/open.inline.svg';
import Slack from './svg/slack.inline.svg';

const CHAT_ONLY_PATHS = [
  //  '/cloud',
  //  '/cloud/',
  //  '/docs/cloud',
  //  '/docs/cloud/',
  '/pricing',
  '/pricing/',
];

const HelperWidget = () => {
  // states
  const [shouldRender, setShouldRender] = useState(false);
  const [driftReady, setDriftReady] = useState(false);
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3);

  const widgetClickOutside = (e) => {
    const widget = document.getElementById('custom-drift-widget-container');
    if (!widget.contains(e.target)) {
      setIsOpen(false);
      document.removeEventListener('click', widgetClickOutside);
    }
  };

  useEffect(() => {
    // checking if drift obj is presented at all
    if (typeof window.drift !== 'undefined') {
      // try to send an opaque get request to drift api
      fetch('https://js.driftt.com/', { mode: 'no-cors' })
        .then(() => {
          // if successfull (endpoint is not blocked by ad blocker)
          // use native drift listener
          window.drift.on('ready', () => {
            setDriftReady(true);
            setShouldRender(true);
          });
        })
        .catch((err) => {
          // else just render without setting drifReady flag
          // eslint-disable-next-line no-console
          console.log(err);
          setShouldRender(true);
        });
    } else {
      setShouldRender(true);
    }
  }, [shouldRender]);

  const handleCloudClick = (disableDrift = true) => {
    if (!disableDrift && driftReady) {
      window.drift.api.sidebar.open();
      setIsOpen(false);
      document.removeEventListener('click', widgetClickOutside);
    } else {
      window.location.assign(
        `${process.env.GATSBY_DEFAULT_MAIN_URL}/contact#contact-options`,
      );
    }
  };
  // handlers
  const handleOpenClick = () => {
    const showChatOnly = CHAT_ONLY_PATHS.some((path) =>
      window.location.pathname.includes(path),
    );
    if (showChatOnly) {
      handleCloudClick(false);
    } else {
      setIsOpen(true);
      document.addEventListener('click', widgetClickOutside);
    }
  };
  const handleCloseClick = () => {
    if (isOpen) {
      setIsOpen(false);
      document.removeEventListener('click', widgetClickOutside);
    }
  };
  return shouldRender ? (
    <div className={styles.wrapper} id={'custom-drift-widget-container'}>
      <div className={styles.menuWrapper}>
        <button
          className={styles.button}
          type={'button'}
          onClick={!isOpen ? handleOpenClick : handleCloseClick}
          {...buttonProps}
        >
          {!isOpen ? <OpenIcon /> : <CloseIcon />}
        </button>
        {isOpen && (
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <p className={styles.title}>Have a question?</p>
            </li>
            <li className={styles.listItem}>
              <a {...itemProps[0]} href={'https://community.k6.io/'}>
                <Message />
                Community forum
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                {...itemProps[1]}
                href={`${process.env.GATSBY_DEFAULT_MAIN_URL}/slack`}
              >
                <Slack />
                Community Slack
              </a>
            </li>
            <li className={styles.listItem}>
              <button
                {...itemProps[2]}
                type="button"
                onClick={handleCloudClick}
              >
                <Cloud />
                Cloud support
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  ) : null;
};

export default HelperWidget;
