import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import React from 'react';

import styles from './button.module.scss';
import Loader from './loader.inline.svg';

const cx = classNames.bind(styles);
export const Button = (props) => {
  const {
    className,
    tag = 'button',
    type = 'button',
    disabled,
    size,
    theme,
    cursor,
    children,
    shape,
    loading = false,
    ...attributes
  } = props;

  const buttonClassName = cx(
    { themeDefault: !theme },
    { themeAdditional: theme === 'additional' },
    { themeTransparent: theme === 'transparent' },
    { themeGradientPrimary: theme === 'gradient-primary' },
    { themeGradientSecondary: theme === 'gradient-secondary' },
    { sizeMd: !size },
    { sizeLg: size === 'lg' },
    { sizeSm: size === 'sm' },
    { round: shape === 'round' },
    { disabled: disabled === true },
    className,
  );

  const innerContent =
    theme === 'gradient-primary' || theme === 'gradient-secondary' ? (
      <>
        <span className={styles.border}>
          <span className={styles.borderInner}>
            <span className={styles.borderInnerSpace} />
            <span className={styles.borderInnerGradient} />
          </span>
        </span>

        <span className={styles.blur}>
          <span className={styles.blurInner}>
            <span className={styles.blurInnerSpace} />
            <span className={styles.blurInnerGradient} />
          </span>
        </span>
        <span className={styles.fill} />
        <span className={styles.text}>
          {children}
          {cursor && (
            <>
              {/* No-break space and > */}
              &nbsp;&gt;
              <span className={styles.cursor}>_</span>
            </>
          )}
        </span>
      </>
    ) : (
      <>
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <span className={styles.buttonContent}>
          {children}
          {cursor && (
            <>
              {/* No-break space and > */}
              &nbsp;&gt;
              <span className={styles.cursor}>_</span>
            </>
          )}
        </span>
      </>
    );

  switch (tag) {
    case 'a':
      return (
        <a className={buttonClassName} {...attributes}>
          {innerContent}
        </a>
      );
    case 'link':
      return (
        <Link className={buttonClassName} {...attributes}>
          {innerContent}
        </Link>
      );
    case 'button':
    default:
      return (
        <button
          className={buttonClassName}
          // eslint-disable-next-line react/button-has-type
          type={type}
          disabled={disabled}
          {...attributes}
        >
          {innerContent}
        </button>
      );
  }
};
