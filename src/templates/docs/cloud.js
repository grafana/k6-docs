import classNames from 'classnames';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import { DocPageNavigation } from 'components/pages/doc-page/doc-page-navigation';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/shared/page-info';
import { SEO } from 'components/shared/seo';
import { Trait } from 'components/shared/trait';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetaData from 'utils/seo-metadata';
import { flattenSidebarTree } from 'utils/utils';

import Blockquote from '../../components/shared/blockquote';

const Cloud = ({ pageContext: { sidebarTree, navLinks } }) => {
  const contentContainerRef = useRef(null);
  useScrollToAnchor();

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
        sectionName="Cloud"
        canonicalUrl={SeoMetaData.cloud.data.canonicalUrl}
      >
        <PageInfo title={'k6 Cloud documentation'} />
        <div className={`${docPageContent.inner}`}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <div className={'container'}>
              <div className={`${htmlStyles.wrapper}`}>
                <Blockquote mod="attention" title="">
                  As the next phase of the{' '}
                  <Link
                    to="https://grafana.com/blog/2023/03/21/grafana-cloud-k6-performance-testing-announcement/"
                    className="link"
                  >
                    Grafana Cloud k6 launch
                  </Link>
                  , we no longer accept new sign-ups to{' '}
                  <Link to="https://app.k6.io" className="link">
                    k6 Cloud
                  </Link>
                  . <br />
                  <br />
                  Check out{' '}
                  <Link
                    to="https://grafana.com/products/cloud/k6/"
                    className="link"
                  >
                    Grafana Cloud k6
                  </Link>{' '}
                  if you want to try our newest performance testing solution in
                  Grafana Cloud. Learn more about this product in the{' '}
                  <Link
                    to="https://grafana.com/docs/grafana-cloud/k6/"
                    className="link"
                  >
                    documentation
                  </Link>
                  . <br />
                  <br />
                  Existing k6 Cloud customers can continue using k6 Cloud. We
                  plan to migrate k6 Cloud to Grafana Cloud k6 at a later date.
                </Blockquote>
                <h2>What is k6 Cloud?</h2>
                <p>
                  The k6 Cloud is a commercial SaaS product that we’ve designed
                  to be the perfect companion to k6 OSS. It brings ease of use,
                  team management, and continuous testing capabilities to your
                  performance testing projects.
                </p>
                <p>
                  The k6 Cloud docs help you learn and use the features and
                  functionality of k6 Cloud:
                </p>
                <ul>
                  <li>Run cloud tests.</li>
                  <li>Analyze results.</li>
                  <li>
                    Manage performance-testing projects across your
                    organization.
                  </li>
                  <li>Integrate with other services.</li>
                  <li>Manage teams, users, and permissions.</li>
                </ul>
                <p>
                  For introductory videos, check out the{' '}
                  <a href="https://www.youtube.com/playlist?list=PLJdv3RhAQXNGkRCp7Q0k77n5jif4qjz2o">
                    k6 Cloud Playlist 🎥
                  </a>{' '}
                  .
                </p>

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
                  well-performing applications. Don’t saddle your team with the{' '}
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
                        multiple cloud locations
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      Run tests on your own{' '}
                      <Link
                        to={
                          'https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/'
                        }
                      >
                        Kubernetes clusters
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to={'/test-authoring/test-builder/'}>
                        Test Builder
                      </Link>{' '}
                      and{' '}
                      <Link
                        to={'/cloud/creating-and-running-a-test/script-editor/'}
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
                          '/test-authoring/create-tests-from-recordings/using-the-browser-recorder/'
                        }
                      >
                        Browser Recorder
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to={'/cloud/manage/scheduled-tests/'}>
                        Scheduling
                      </Link>{' '}
                      and{' '}
                      <Link to={'/cloud/manage/notifications/'}>
                        Notifications
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to={'/cloud/project-and-team-management/members/'}>
                        Role-based access control
                      </Link>{' '}
                      in{' '}
                      <Link to={'/cloud/project-and-team-management/projects/'}>
                        Projects
                      </Link>
                      , and{' '}
                      <Link to={'/cloud/project-and-team-management/teams/'}>
                        Teams
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      SAML SSO with{' '}
                      <Link to={'/cloud/project-and-team-management/saml-sso/'}>
                        Azure AD and Okta
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
                        Compare tests and track trends
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      Integrate results with{' '}
                      <Link to={'/cloud/integrations/cloud-apm/'}>
                        APM platforms
                      </Link>{' '}
                      and{' '}
                      <Link to={'/cloud/integrations/grafana-app/'}>
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
                      <Link to={'/cloud/manage/audit-trail/'}>
                        Audit team activity
                      </Link>{' '}
                      and see{' '}
                      <Link to={'/cloud/manage/usage-reports/'}>
                        Usage reports
                      </Link>
                      .
                    </Trait>
                    <Trait>
                      <Link to={'/cloud/analyzing-results/test-results-menu/'}>
                        Create notes and share results
                      </Link>
                      .
                    </Trait>
                  </div>
                </div>
              </div>
              <p />
            </div>
          </div>
          <DocPageNavigation
            prev={null}
            next={flatSidebar[0]}
            variant="top-level"
          />
          <TableOfContents
            contentContainerRef={contentContainerRef}
            shouldMakeReplacement
          />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
};

export default Cloud;

export const Head = ({ pageContext: { version } }) => (
  <SEO version={version} {...SeoMetaData.cloud} />
);
