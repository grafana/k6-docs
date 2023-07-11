import PropTypes from 'prop-types';
import React from 'react';
import WIPIcon from 'svg/work-in-progress.inline.svg';

import Tooltip from '../tooltip';

// BWIPT = k6 browser "Work in Progress" tooltip
const BWIPT = ({ id }) =>
  id ? (
    <Tooltip value="Work in Progress">
      <a
        href={`https://github.com/grafana/xk6-browser/issues/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '18px', cursor: 'pointer' }}
      >
        <WIPIcon style={{ verticalAlign: 'middle' }} />
      </a>
    </Tooltip>
  ) : (
    <Tooltip value="Work in Progress">
      <span style={{ fontSize: '18px', cursor: 'help' }}>
        <WIPIcon style={{ verticalAlign: 'middle' }} />
      </span>
    </Tooltip>
  );

BWIPT.propTypes = {
  id: PropTypes.string,
};

BWIPT.defaultProps = {
  id: null,
};

export default BWIPT;
