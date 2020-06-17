import React, { useRef } from 'react';
import styles from './html-content.module.scss';
import './html-content.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useElementsReplacement } from 'hooks';

export const HtmlContent = ({ content, className, components }) => {
  const containerRef = useRef(null);
  useElementsReplacement(
    {
      containerRef,
      components,
    },
    [content],
  );
  return (
    <div ref={containerRef} className={`${styles.wrapper} ${className}`}>
      <MDXRenderer>{content}</MDXRenderer>
    </div>
  );
};
