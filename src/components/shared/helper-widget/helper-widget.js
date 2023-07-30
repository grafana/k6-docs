import React, { useRef } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import styles from './helper-widget.module.scss';
// icons
import CloseIcon from './svg/close.inline.svg';
import Cloud from './svg/cloud.inline.svg';
import Message from './svg/message.inline.svg';
import OpenIcon from './svg/open.inline.svg';
import Slack from './svg/slack.inline.svg';

const HelperWidget = () => {
  // states
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3);

  const widgetRef = useRef(null);

  const widgetClickOutside = (e) => {
    if (!widgetRef.current || !widgetRef.current.contains(e.target)) {
      setIsOpen(false);
      document.removeEventListener('click', widgetClickOutside);
    }
  };

  const handleCloudClick = () =>
    window.location.assign(
      `${process.env.GATSBY_DEFAULT_MAIN_URL}/contact#contact-options`,
    );

  // handlers
  const handleOpenClick = () => {
    setIsOpen(true);
    document.addEventListener('click', widgetClickOutside);
  };

  const handleCloseClick = () => {
    if (isOpen) {
      setIsOpen(false);
      document.removeEventListener('click', widgetClickOutside);
    }
  };

  return (
    <div className={styles.wrapper} ref={widgetRef}>
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
              <a {...itemProps[0]} href={'https://community.grafana.com/'}>
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
  );
};

export default HelperWidget;
