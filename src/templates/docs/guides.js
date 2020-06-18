import React, { useRef } from 'react';
import classNames from 'classnames';
import { DocLayout } from 'layouts/doc-layout';
import { Sticky, StickyContainer } from 'react-sticky';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import {
  Cloud,
  Features,
  PageInfo,
  Manifesto,
  Quickstart,
  WhatIs,
} from 'components/pages/doc-welcome';
import { K6DoesNot } from 'components/pages/doc-welcome/k6-does-not';
import { UseCases } from 'components/pages/doc-welcome/use-cases';
import SeoMetadata from 'utils/seo-metadata';
import { docs } from 'utils/urls';
import { useScrollToAnchor } from 'hooks';

const pageInfo = {
  title: 'Welcome to the k6 documentation',
  description:
    'This documentation will help you go from a total beginner to a seasoned k6 expert!',
};

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  useScrollToAnchor();

  const pageMetadata = SeoMetadata.guides;
  const contentContainerRef = useRef(null);
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo {...pageInfo} />
      <div className={classNames(docPageContent.inner)}>
        <StickyContainer>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <Quickstart />
            <WhatIs />
            <Features />
            <UseCases />
            <Manifesto />
            <K6DoesNot />
            <Cloud
              title={'Looking for k6 Cloud?'}
              btnLink={`${docs}/cloud`}
              isExternal
              btnTarget={'_self'}
              btnText={'Cloud docs'}
              description={
                'A tailored SaaS service to bring your team together into load testing.'
              }
            />
          </div>

          <Sticky topOffset={-15} bottomOffset={10} disableCompensation>
            {({ style }) => (
              <TableOfContents
                style={style}
                contentContainerRef={contentContainerRef}
                shouldMakeReplacement
              />
            )}
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}
