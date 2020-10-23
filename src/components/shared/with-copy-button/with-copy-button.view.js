import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Clipboard from 'react-clipboard.js';

import styles from './with-copy-button.module.scss';

export const WithCopyButton = ({
  children,
  dataToCopy,
  wrapperLabel,
  copyButtonLabel,
}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopyButtonClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={classNames(styles.wrapper, wrapperLabel)}>
      {children}
      <Clipboard
        className={classNames(styles.copyButton, copyButtonLabel)}
        data-clipboard-text={dataToCopy}
        onSuccess={handleCopyButtonClick}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Clipboard>
    </div>
  );
};

WithCopyButton.propTypes = {
  children: PropTypes.node.isRequired,
  dataToCopy: PropTypes.string,
  wrapperLabel: PropTypes.string,
  copyButtonLabel: PropTypes.string,
};

WithCopyButton.defaultProps = {
  dataToCopy: '',
  wrapperLabel: '',
  copyButtonLabel: '',
};
