import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { Cloud, PageInfo } from 'components/pages/doc-welcome';
import { CtaDoc } from 'components/shared/cta-doc';
import { DocLayout } from 'layouts/doc-layout';
import { Trait } from 'components/shared/trait';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import { StickyContainer, Sticky } from 'react-sticky';
import { whenElementAvailable, isInIFrame } from 'utils';
import { default as docPageContent } from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { default as docPageNav } from 'components/pages/doc-page/doc-page-nav/doc-page-nav.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { app } from 'utils/urls';
import { useLandmark } from 'hooks';

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  const pageMetadata = SeoMetadata.cloud;

  const [showFooter, setShowFooter] = useState(true);

  const { links } = useLandmark({
    selector: docPageContent.inner,
  });
  useEffect(() => setShowFooter(!isInIFrame()), []);

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    const scrollMark = location.hash;
    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)((el) =>
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

  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo title={'k6 Cloud documentation'} />
      <div className={`${docPageContent.inner}`}>
        <StickyContainer>
          <div
            className={`${docPageContent.mainDocContent} ${docPageContent.contentWrapper}`}
          >
            <div className={'container'}>
              <div className={`${htmlStyles.wrapper}`}>
                <h2>What is the k6 Cloud?</h2>
                <p>
                  The k6 Cloud is a commercial SaaS product that we’ve designed
                  to be the perfect companion to k6 OSS. It brings ease-of-use
                  and convenience to your performance and load testing.
                </p>
                <p>
                  This knowledge base will help you learn how to use the
                  features and functionality of the k6 Cloud:
                </p>
                <ul>
                  <li>Running cloud tests.</li>
                  <li>Analyzing results.</li>
                  <li>Managing projects, teams and users.</li>
                  <li>Integrations.</li>
                  <li>FAQ.</li>
                </ul>
                <h2>How can it help me?</h2>
                <p>
                  The k6 Cloud is a premium service to empower your team to
                  manage your load testing efforts:
                </p>
                <ul>
                  <li>Scaling your load tests.</li>
                  <li>Storing and visualizing your test results.</li>
                  <li>Detecting performance issues.</li>
                  <li>Correlating results between different tests.</li>
                  <li>Organizing testing in a central location.</li>
                </ul>
                <blockquote>
                  We want you to spend time building and maintaining
                  well-performing applications. Don’t saddle your team with the
                  additional maintenance burden of your load testing
                  infrastructure.
                </blockquote>
                <h2>Cloud Features</h2>
                <div className={'row'}>
                  <div className={'col-lg-6 traits'}>
                    <Trait>
                      Run larger tests from multiple geographic locations.
                    </Trait>
                    <Trait>
                      <Link to="/cloud/creating-and-running-a-test/test-builder">
                        Test Builder
                      </Link>{' '}
                      and{' '}
                      <Link to="/cloud/creating-and-running-a-test/in-app-script-editor">
                        Script Editor
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/using-k6/cloud-execution">CLI</Link> and{' '}
                      <Link to="/cloud/creating-and-running-a-test/recording-a-test-script">
                        Browser Session Recorder
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/cloud/creating-and-running-a-test/scheduling-tests">
                        Scheduling
                      </Link>{' '}
                      and{' '}
                      <Link to="/cloud/integrations/notifications">
                        Notifications
                      </Link>
                      .
                    </Trait>
                  </div>

                  <div className={'col-lg-6'}>
                    <Trait>
                      <Link to="/cloud/analyzing-results/performance-insights">
                        Performance Insights
                      </Link>{' '}
                      and{' '}
                      <Link to="/cloud/analyzing-results/overview">
                        Premium test result visualization
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/cloud/analyzing-results/test-comparison">
                        Compare tests{' '}
                      </Link>{' '}
                      and{' '}
                      <Link to="/cloud/analyzing-results/performance-trending">
                        performance trends
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/cloud/analyzing-results/result-export">
                        Export results
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/cloud/project-and-team-management/team-members">
                        Team members
                      </Link>{' '}
                      and{' '}
                      <Link to="/cloud/project-and-team-management/projects">
                        Projects
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to="/cloud/analyzing-results/test-results-menu">
                        Create notes and share results
                      </Link>
                      .
                    </Trait>
                  </div>
                </div>
              </div>
              <p></p>
            </div>
            {showFooter && (
              <CtaDoc
                btnLink={`${app}/account/register`}
                title={'Free Trial'}
                btnText={'Try now'}
                description={'Sign up to run 50 cloud tests for Free.'}
                isExternal
              />
            )}
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
                          onClick={(e) => handleAnchorClick(e, anchor)}
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
