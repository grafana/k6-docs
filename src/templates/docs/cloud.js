import classNames from 'classnames';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import { DocPageNavigation } from 'components/pages/doc-page/doc-page-navigation';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { CtaDoc } from 'components/shared/cta-doc';
import { PageInfo } from 'components/shared/page-info';
import { Trait } from 'components/shared/trait';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef, useState, useEffect } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { isInIFrame } from 'utils';
import SeoMetadata from 'utils/seo-metadata';
import { app } from 'utils/urls';
import { flattenSidebarTree } from 'utils/utils';

export default function Cloud({ pageContext: { sidebarTree, navLinks } }) {
  const [showFooter, setShowFooter] = useState(true);
  const contentContainerRef = useRef(null);
  useEffect(() => setShowFooter(!isInIFrame()), []);
  useScrollToAnchor();

  const pageMetadata = SeoMetadata.cloud;

  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  const flatSidebar = flattenSidebarTree(sidebarTree);

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        sectionName="Cloud"
      >
        <PageInfo title={'k6 Cloud documentation'} />
        <div className={`${docPageContent.inner}`}>
          <StickyContainer>
            <div ref={contentContainerRef} className={stickyContainerClasses}>
              <div className={'container'}>
                <div className={`${htmlStyles.wrapper}`}>
                  <h2>What is the k6 Cloud?</h2>
                  <p>
                    The k6 Cloud is a commercial SaaS product that we’ve
                    designed to be the perfect companion to k6 OSS. It brings
                    ease-of-use and convenience to your performance and load
                    testing.
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
                    well-performing applications. Don’t saddle your team with
                    the{' '}
                    <a href="https://k6.io/what-to-consider-when-building-or-buying-a-load-testing-solution/">
                      additional maintenance burden
                    </a>{' '}
                    of your load testing infrastructure.
                  </blockquote>
                  <h2>Cloud Features</h2>
                  <div className={'row'}>
                    <div className={'col-lg-6 traits'}>
                      <Trait>
                        Scale tests from{' '}
                        <Link
                          to={
                            '/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#list-of-supported-load-zones'
                          }
                        >
                          multiple locations
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        <Link to={'/test-authoring/test-builder/'}>
                          Test Builder
                        </Link>{' '}
                        and{' '}
                        <Link
                          to={
                            '/cloud/creating-and-running-a-test/script-editor/'
                          }
                        >
                          Script Editor
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        <Link
                          to={
                            '/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/'
                          }
                        >
                          CLI
                        </Link>{' '}
                        and{' '}
                        <Link
                          to={
                            '/test-authoring/recording-a-session/browser-recorder/'
                          }
                        >
                          Browser Recorder
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        <Link
                          to={
                            '/cloud/creating-and-running-a-test/scheduling-tests/'
                          }
                        >
                          Scheduling
                        </Link>{' '}
                        and{' '}
                        <Link to={'/cloud/integrations/notifications/'}>
                          Notifications
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        <Link
                          to={
                            '/cloud/project-and-team-management/team-members/'
                          }
                        >
                          Team members
                        </Link>{' '}
                        and{' '}
                        <Link
                          to={'/cloud/project-and-team-management/projects/'}
                        >
                          Projects
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        See team and testing activity with{' '}
                        <Link
                          to={
                            '/cloud/project-and-team-management/usage-reports/'
                          }
                        >
                          Usage reports
                        </Link>
                        .
                      </Trait>
                    </div>

                    <div className={'col-lg-6 traits'}>
                      <Trait>
                        <Link to={'/cloud/analyzing-results/overview/'}>
                          Premium test result visualization
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        Get actionable{' '}
                        <Link
                          to={'/cloud/analyzing-results/performance-insights/'}
                        >
                          Performance Insights
                        </Link>{' '}
                        .
                      </Trait>
                      <Trait>
                        <Link to={'/cloud/analyzing-results/test-comparison/'}>
                          Compare tests{' '}
                        </Link>{' '}
                        and{' '}
                        <Link
                          to={'/cloud/analyzing-results/performance-trending/'}
                        >
                          performance trends
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        Integrate results with{' '}
                        <Link to={'/cloud/integrations/cloud-apm/'}>
                          APM platforms
                        </Link>{' '}
                        and{' '}
                        <Link to={'/cloud/integrations/grafana-plugin/'}>
                          Grafana
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        Export results to{' '}
                        <Link to={'/cloud/analyzing-results/result-export/'}>
                          CSV
                        </Link>{' '}
                        and generate{' '}
                        <Link to={'/cloud/analyzing-results/result-export/'}>
                          PDF reports
                        </Link>
                        .
                      </Trait>
                      <Trait>
                        <Link
                          to={'/cloud/analyzing-results/test-results-menu/'}
                        >
                          Create notes and share results
                        </Link>
                        .
                      </Trait>
                    </div>
                  </div>
                </div>
                <p />
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
            <DocPageNavigation
              prev={null}
              next={flatSidebar[0]}
              variant="top-level"
            />
            <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
              {({ style }) => (
                <TableOfContents
                  style={{ ...style, left: 350 }}
                  contentContainerRef={contentContainerRef}
                  shouldMakeReplacement
                />
              )}
            </Sticky>
          </StickyContainer>
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
