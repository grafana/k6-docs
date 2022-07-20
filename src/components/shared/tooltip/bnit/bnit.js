import PropTypes from 'prop-types';
import React from 'react';

import Tooltip from '../tooltip';

// BNIT = xk6-browser "Not Implemented" tooltip
const BNIT = ({ id }) =>
  id ? (
    <Tooltip value="Not implemented">
      <a
        href={`https://github.com/grafana/xk6-browser/issues/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '11px', cursor: 'pointer' }}
      >
        ❌
      </a>
    </Tooltip>
  ) : (
    <Tooltip value="Not implemented">
      <span style={{ fontSize: '11px', cursor: 'help' }}>❌</span>
    </Tooltip>
  );

BNIT.propTypes = {
  id: PropTypes.string,
};

BNIT.defaultProps = {
  id: null,
};

export default BNIT;
