import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './tooltip.module.scss';

const Tooltip = ({ value, children }) => (
  <>
    <span data-tip={value}>{children}</span>
    <ReactTooltip
      className={styles.tooltip}
      place="top"
      effect="solid"
      backgroundColor="#3c3c64"
      textColor="#ffffff"
    />
  </>
);

Tooltip.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
