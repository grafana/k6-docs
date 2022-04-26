import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { anchorify } from 'utils';

import styles from './collapsible.module.scss';

const Collapsible = ({ children, title, isOpen, tag: Tag }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const collapsibleRef = useRef(null);

  useEffect(() => {
    if (!collapsibleRef.current) {
      return;
    }

    if (!isOpen) {
      collapsibleRef.current.style.height = 0;
    }
  }, []);

  const collapse = () => {
    if (!collapsibleRef.current) {
      return;
    }
    const sectionHeight = collapsibleRef.current.scrollHeight;

    // temporarily disable all css transitions
    const elementTransition = collapsibleRef.current.style.transition;
    collapsibleRef.current.style.transition = '';

    requestAnimationFrame(() => {
      collapsibleRef.current.style.height = `${sectionHeight}px`;
      collapsibleRef.current.style.transition = elementTransition;

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(() => {
        collapsibleRef.current.style.height = 0;
      });
    });

    setIsExpanded(false);
  };

  const expand = () => {
    if (!collapsibleRef.current) {
      return;
    }

    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = collapsibleRef.current.scrollHeight;

    // have the element transition to the height of its inner content
    collapsibleRef.current.style.height = `${sectionHeight}px`;

    // mark the section as "currently not collapsed"
    setIsExpanded(true);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.header, {
          [styles.expanded]: isExpanded,
        })}
      >
        {Tag ? <Tag id={anchorify(title)}>{title}</Tag> : title}
        <button
          type="button"
          className={styles.button}
          onClick={() => (isExpanded ? collapse() : expand())}
        />
      </div>
      <div ref={collapsibleRef} className={classNames(styles.content)}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

Collapsible.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  tag: PropTypes.string,
};

Collapsible.defaultProps = {
  children: null,
  title: '',
  isOpen: false,
  tag: null,
};

export default Collapsible;
