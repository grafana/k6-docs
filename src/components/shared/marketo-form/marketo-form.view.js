import useMarketo from 'hooks/use-marketo-form';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const MarketoForm = memo(({ debug, formId }) => {
  useMarketo({
    formId,
    callback: () => {},
  });

  return <form id={`mktoForm_${formId}`} hidden={!debug} aria-hidden="true" />;
});

MarketoForm.defaultProps = {
  debug: false,
};

MarketoForm.propTypes = {
  debug: PropTypes.bool,
  formId: PropTypes.string.isRequired,
};

export default MarketoForm;
