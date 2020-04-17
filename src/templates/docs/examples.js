import React, { useState, useEffect } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { DocLinksBlock } from 'components/pages/doc-examples/doc-links-block';
import { whenElementAvailable } from 'utils';
import { default as docPageContent } from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { default as docPageNav } from 'components/pages/doc-page/doc-page-nav/doc-page-nav.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { useLandmark } from 'hooks';

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  const pageMetadata = SeoMetadata.examples;

  const { links } = useLandmark({
    selector: docPageContent.inner,
  });

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
  const {
    docExamplesJson: { tutorialsBlockLinks, examplesBlockLinks },
  } = useStaticQuery(graphql`
    query blockLinksData {
      docExamplesJson {
        tutorialsBlockLinks: tutorials {
          title
          description
          url
          to
        }
        examplesBlockLinks: examples {
          title
          description
          url
          to
        }
      }
    }
  `);
  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo
        title={'Examples & Tutorials'}
        description={
          'This section lists a few of the most common k6 code examples and popular tutorials.'
        }
      />
      <div className={`${docPageContent.inner} `}>
        <StickyContainer>
          <div
            className={classNames(
              docPageContent.mainDocContent,
              docPageContent.contentWrapper,
            )}
          >
            <DocLinksBlock title={'Examples'} links={examplesBlockLinks} />
            <DocLinksBlock
              title={'Tutorials'}
              links={tutorialsBlockLinks}
              last
            />
          </div>
          <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
            {({ style }) => (
              <div style={style} className={docPageContent.anchorBarWrapper}>
                <nav
                  className={`${docPageNav.wrapper} ${docPageContent.anchorBar}`}
                >
                  <ul className={docPageNav.anchorWrapper}>
                    {links.map(({ title, anchor }, i) => (
                      <li className={docPageNav.anchorBox} key={`al-${i}`}>
                        <a
                          className={docPageNav.anchor}
                          href={anchor}
                          onClick={e => handleAnchorClick(e, anchor)}
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}
