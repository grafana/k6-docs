import './html-content.scss';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useElementsReplacement } from 'hooks';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import styles from './html-content.module.scss';

export const HtmlContent = ({
  content,
  className,
  componentsForNativeReplacement,
  componentsForCustomReplacement,
}) => {
  const MdxWrapper = ({ children }) => {
    const containerRef = useRef(null);
    useElementsReplacement(
      {
        containerRef,
        components: componentsForCustomReplacement,
      },
      [],
    );
    return (
      <div ref={containerRef} className={`${styles.wrapper} ${className}`}>
        {children}
      </div>
    );
  };
  return (
    <MDXProvider
      components={{ ...componentsForNativeReplacement, wrapper: MdxWrapper }}
    >
      <MDXRenderer>{content}</MDXRenderer>
    </MDXProvider>
  );
};

HtmlContent.propTypes = {
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  componentsForCustomReplacement: PropTypes.shape({}),
  componentsForNativeReplacement: PropTypes.shape({}),
};

HtmlContent.defaultProps = {
  content: null,
  className: undefined,
  componentsForCustomReplacement: {},
  componentsForNativeReplacement: {},
};
