import React, { useRef } from 'react';
import styles from './html-content.module.scss';
import './html-content.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { useElementsReplacement } from 'hooks';

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
