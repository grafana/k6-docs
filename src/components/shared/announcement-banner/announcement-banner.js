import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React, { useState, useLayoutEffect } from 'react';

import { Button } from '../button';

import styles from './announcement-banner.module.scss';
import Pattern from './svg/pattern.inline.svg';

const AnnouncementBanner = ({
  text,
  link,
  buttonText,
  dismissButtonClickHandler,
  readMoreButtonClickHandler,
  storageItemName,
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

  useLayoutEffect(() => {
    const initialState = window?.sessionStorage.getItem(storageItemName);
    if (!initialState && !isMobile) {
      setAnimateIn(true);
      window.sessionStorage.setItem(storageItemName, true);
    }
    setIsShown(true);
  }, []);

  const onTransitionEndHandler = () => {
    if (animateOut) {
      dismissButtonClickHandler();
    }
  };

  const onCloseButtonClick = isMobile
    ? dismissButtonClickHandler
    : () => setAnimateOut(true);

  return isShown ? (
    <div style={{ height: isMobile ? 'auto' : '60px' }}>
      <div
        className={classNames(
          styles.wrapper,
          { [styles.in]: animateIn && !animateOut },
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
              tag="a"
              rel="noreferrer"
              href={link}
              className={styles.btn}
              size={'sm'}
              onClick={readMoreButtonClickHandler}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        <button
          type="button"
          className={styles.btnClose}
          onClick={onCloseButtonClick}
        />
      </div>
    </div>
  ) : null;
};

AnnouncementBanner.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  storageItemName: PropTypes.string.isRequired,
  dismissButtonClickHandler: PropTypes.func.isRequired,
  readMoreButtonClickHandler: PropTypes.func.isRequired,
};

export default AnnouncementBanner;
