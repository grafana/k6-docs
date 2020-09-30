import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Button } from '../button';

import styles from './announcement-banner.module.scss';
import Pattern from './svg/pattern.inline.svg';

const AnnouncementBanner = ({
  text,
  link,
  buttonText,
  closeButtonHandler,
  storageItemName,
  buttonId,
  closeButtonId,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia('(max-width: 576px)');
      return mql.matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialState = window.sessionStorage.getItem(storageItemName);
      if (!initialState && !isMobile) {
        setAnimateIn(true);
        window.sessionStorage.setItem(storageItemName, true);
      }
    }
    setIsShown(true);
  }, []);

  const onTransitionEndHandler = () => {
    if (animateOut) {
      closeButtonHandler();
    }
  };

  const onCloseButtonClick = isMobile
    ? closeButtonHandler
    : () => setAnimateOut(true);

  return (
    isShown && (
      <div
        className={classNames(
          styles.wrapper,
          { [styles.in]: animateIn },
          { [styles.out]: animateOut },
        )}
        onTransitionEnd={isMobile ? undefined : onTransitionEndHandler}
      >
        <div className={styles.backgroundPatternWrapper}>
          <Pattern />
          <Pattern />
        </div>
        <div className={'container'}>
          <div className={styles.inner}>
            <p className={styles.message}>{text}</p>
            <Button
              id={buttonId}
              tag="a"
              rel="noreferrer"
              href={link}
              className={styles.btn}
              size={'sm'}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        <button
          id={closeButtonId}
          type="button"
          className={styles.btnClose}
          onClick={onCloseButtonClick}
        />
      </div>
    )
  );
};

AnnouncementBanner.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  storageItemName: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  closeButtonId: PropTypes.string.isRequired,
  closeButtonHandler: PropTypes.func.isRequired,
};

export default AnnouncementBanner;
