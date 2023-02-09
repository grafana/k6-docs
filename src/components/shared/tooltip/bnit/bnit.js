import PropTypes from 'prop-types';
import React from 'react';
import NITIcon from 'svg/not-implemented.inline.svg';

import Tooltip from '../tooltip';

// BNIT = k6 browser "Not Implemented" tooltip
const BNIT = ({ id }) =>
  id ? (
    <Tooltip value="Not implemented">
      <a
        href={`https://github.com/grafana/xk6-browser/issues/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '18px', cursor: 'pointer' }}
      >
        <NITIcon style={{ verticalAlign: 'middle' }} />
      </a>
    </Tooltip>
  ) : (
    <Tooltip value="Not implemented">
      <span style={{ fontSize: '18px', cursor: 'help' }}>
        <NITIcon style={{ verticalAlign: 'middle' }} />
      </span>
    </Tooltip>
  );

BNIT.propTypes = {
  id: PropTypes.string,
};

BNIT.defaultProps = {
  id: null,
};

export default BNIT;
