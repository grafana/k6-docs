import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { DocLayout } from 'layouts/doc-layout';
import { Sticky, StickyContainer } from 'react-sticky';
import { whenElementAvailable } from 'utils';
import docPageNav from 'components/pages/doc-page/doc-page-nav/doc-page-nav.module.scss';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { useLandmark } from 'hooks';
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

const pageInfo = {
  title: 'Welcome to the k6 documentation',
  description:
    'This documentation will help you go from a total beginner to a seasoned k6 expert!',
};

export default function({ pageContext: { sidebarTree, navLinks } }) {
  const { links } = useLandmark({
    selector: docPageContent.inner,
  });
  const pageMetadata = SeoMetadata.guides;

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    const scrollMark = location.hash;
    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)(el =>
        // no smooth scroll needed
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 25,
        }),
      );
    }
  }, []);

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // changing hash without default jumps to anchor
    if (history.pushState) {
      history.pushState(false, false, anchor);
    } else {
      // old browser support
      window.location.hash = anchor;
    }
  };

  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  const renderSidebar = ({ style }) => (
    <div style={style} className={docPageContent.anchorBarWrapper}>
      <nav className={`${docPageNav.wrapper} ${docPageContent.anchorBar}`}>
        <ul className={docPageNav.anchorWrapper}>
          {links.map(({ title, anchor }, i) => (
            <li className={docPageNav.anchorBox} key={`al-${i}`}>
              <a
                className={docPageNav.anchor}
                href={`${anchor}`}
                onClick={e => handleAnchorClick(e, anchor)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
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
          <div className={stickyContainerClasses}>
            <Quickstart />
            <WhatIs />
            <Features />
            <UseCases />
            <Manifesto />
            <K6DoesNot />
            <Cloud
              title={'k6 Cloud'}
              href={`${docs}/cloud`}
              buttonText={'Cloud docs'}
              description={
                'A tailored SaaS service to bring your team together into load testing.'
              }
            />
          </div>

          <Sticky topOffset={-15} bottomOffset={10} disableCompensation>
            {links && renderSidebar}
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}
