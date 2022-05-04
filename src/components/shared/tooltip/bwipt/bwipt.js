import PropTypes from 'prop-types';
import React from 'react';

import Tooltip from '../tooltip';

// BWIPT = xk6-browser "Work in Progress" tooltip
const BWIPT = ({ id }) =>
  id ? (
    <Tooltip value="Work in Progress">
      <a
        href={`https://github.com/grafana/xk6-browser/issues/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🚧
      </a>
    </Tooltip>
  ) : (
    <Tooltip value="Work in Progress">🚧</Tooltip>
  );

BWIPT.propTypes = {
  id: PropTypes.string,
};

BWIPT.defaultProps = {
  id: null,
};

export default BWIPT;
