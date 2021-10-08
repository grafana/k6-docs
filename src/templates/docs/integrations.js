import classNames from 'classnames';
// components
import { DocIconsRow } from 'components/pages/doc-integrations/doc-icons-row';
import { ExternalLinksDashboard } from 'components/pages/doc-integrations/external-links-dashboard';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import CustomContentContainer from 'components/shared/custom-content-container';
import { PageInfo } from 'components/shared/page-info';
// styles
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useStaticQuery, graphql } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
// icons
import CloudWatch from 'svg/amazon-cloudwatch.inline.svg';
import Kafka from 'svg/apache-kafka.inline.svg';
import AWSCodeBuild from 'svg/aws-codebuild.inline.svg';
import Azure from 'svg/azure.inline.svg';
import Bamboo from 'svg/bamboo.inline.svg';
import CircleCI from 'svg/circleci.inline.svg';
import CSV from 'svg/csv.inline.svg';
import Datadog from 'svg/datadog.inline.svg';
import GitHub from 'svg/github.inline.svg';
import Gitlab from 'svg/gitlab.inline.svg';
import GoogleCloudBuild from 'svg/google-cloud-build.inline.svg';
import Grafana from 'svg/grafana.inline.svg';
import InfluxGrafana from 'svg/influxdb-grafana.inline.svg';
import Jenkins from 'svg/jenkins.inline.svg';
import Json from 'svg/json.inline.svg';
import K6 from 'svg/logo.inline.svg';
import Netdata from 'svg/netdata.inline.svg';
import NewRelic from 'svg/new-relic.inline.svg';
import StatsD from 'svg/statsd.inline.svg';
import TeamCity from 'svg/teamcity.inline.svg';
import SeoMetadata from 'utils/seo-metadata';
import { blog, main } from 'utils/urls';

const iconsDataSet1 = [
  {
    Icon: CloudWatch,
    name: 'Amazon CloudWatch',
    to: '/results-visualization/amazon-cloudwatch',
  },
  {
    Icon: Kafka,
    name: 'Apache Kafka',
    to: '/results-visualization/apache-kafka',
  },
  {
    Icon: K6,
    name: 'Cloud',
    to: '/results-visualization/cloud',
  },
  {
    Icon: CSV,
    name: 'CSV',
    to: '/results-visualization/csv',
  },
  {
    Icon: Datadog,
    name: 'Datadog',
    to: '/results-visualization/datadog',
  },
  {
    Icon: Grafana,
    name: 'Grafana Cloud',
    to: '/results-visualization/grafana-cloud/',
  },
  {
    Icon: InfluxGrafana,
    name: 'InfluxDB + Grafana',
    to: '/results-visualization/influxdb-+-grafana',
  },
  {
    Icon: Json,
    name: 'JSON file',
    to: '/results-visualization/json',
  },
  {
    Icon: Netdata,
    name: 'Netdata',
    to: '/results-visualization/netdata',
  },
  {
    Icon: NewRelic,
    name: 'New Relic',
    to: '/results-visualization/new-relic',
  },
  {
    Icon: StatsD,
    name: 'StatsD',
    to: '/results-visualization/statsd',
  },
];

const iconsDataSet2 = [
  {
    Icon: AWSCodeBuild,
    name: 'AWS CodeBuild',
    link: `${blog}/integrating-k6-with-aws-codebuild/`,
  },
  {
    Icon: Azure,
    name: 'Azure Pipelines',
    link: `${blog}/integrating-load-testing-with-azure-pipelines/`,
  },
  {
    Icon: Bamboo,
    name: 'Bamboo',
    link: `${blog}/integrating-k6-with-bamboo/`,
  },
  {
    Icon: CircleCI,
    name: 'CircleCI',
    link: `${blog}/integrating-load-testing-with-circleci/`,
  },
  {
    Icon: GitHub,
    name: 'GitHub Actions',
    link: `${blog}/load-testing-using-github-actions/`,
  },
  {
    Icon: Gitlab,
    name: 'GitLab',
    link: `${blog}/integrating-load-testing-with-gitlab/`,
  },
  {
    Icon: GoogleCloudBuild,
    name: 'Google Cloud Build',
    link: `${blog}/integrating-k6-with-google-cloud-build/`,
  },
  {
    Icon: Jenkins,
    name: 'Jenkins',
    link: `${blog}/integrating-load-testing-with-jenkins/`,
  },
  {
    Icon: TeamCity,
    name: 'TeamCity',
    link: `${blog}/load-testing-using-teamcity-and-k6/`,
  },
];

export default function Integrations({
  pageContext: { sidebarTree, navLinks },
}) {
  const pageMetadata = SeoMetadata.integrations;
  const contentContainerRef = useRef(null);

  const {
    vscodeImg: {
      childImageSharp: { fixed: vscodeImgData },
    },
    intellijImg: {
      childImageSharp: { fixed: intellijImgData },
    },
    javascriptImg: {
      childImageSharp: { fixed: javascriptImgData },
    },
    browserRecorderImg: {
      childImageSharp: { fixed: browserRecorderImgData },
    },
    testBuilderImg: {
      childImageSharp: { fixed: testBuilderImgData },
    },
    harImg: {
      childImageSharp: { fixed: harImgData },
    },
    postmanImg: {
      childImageSharp: { fixed: postmanImgData },
    },
    swaggerImg: {
      childImageSharp: { fixed: swaggerImgData },
    },
    jmeterImg: {
      childImageSharp: { fixed: jmeterImgData },
    },
  } = useStaticQuery(graphql`
    query stubImageQuery {
      graphqlImg: file(
        absolutePath: { regex: "/images/doc-integrations/graphql/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      azureImg: file(
        absolutePath: { regex: "/images/doc-integrations/azure/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      vscodeImg: file(
        absolutePath: { regex: "/images/doc-integrations/vscode/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      intellijImg: file(
        absolutePath: { regex: "/images/doc-integrations/intellij/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      javascriptImg: file(
        absolutePath: { regex: "/images/doc-integrations/javascript/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      testBuilderImg: file(
        absolutePath: { regex: "/images/doc-integrations/test-builder/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      browserRecorderImg: file(
        absolutePath: { regex: "/images/doc-integrations/browser-recorder/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      harImg: file(absolutePath: { regex: "/images/doc-integrations/har/" }) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      postmanImg: file(
        absolutePath: { regex: "/images/doc-integrations/postman/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      swaggerImg: file(
        absolutePath: { regex: "/images/doc-integrations/openapi/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      jmeterImg: file(
        absolutePath: { regex: "/images/doc-integrations/jmeter/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);
  useScrollToAnchor();
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );
  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        sectionName="Integrations"
      >
        <PageInfo title={'Integrations & Tools'} description={''} />
        <div className={`${docPageContent.inner} `}>
          <StickyContainer>
            <div ref={contentContainerRef} className={stickyContainerClasses}>
              <ExternalLinksDashboard
                dashboardTitle={'Test authoring'}
                subtitle={'Codeless tools to speed up the test creation.'}
                linksData={[
                  {
                    picture: testBuilderImgData,
                    title: 'Test Builder',
                    description:
                      'Inspired in Postman API Builder. Codeless UI tool to generate a k6 test quickly.',
                    url: 'https://k6.io/docs/test-authoring/test-builder/',
                  },
                  {
                    picture: browserRecorderImgData,
                    title: 'Browser Recorder',
                    description: 'Record a user journey to base your k6 test.',
                    url:
                      'https://k6.io/docs/test-authoring/recording-a-session/browser-recorder/',
                  },
                ]}
              />
              <ExternalLinksDashboard
                dashboardTitle={'IDE extensions'}
                subtitle={
                  'Code k6 scripts in your IDE of choice. Empower your development workflow with IDE extensions.'
                }
                linksData={[
                  {
                    picture: vscodeImgData,
                    title: 'Visual Studio Code Extension',
                    description: 'Run k6 tests from VS Code.',
                    url:
                      'https://marketplace.visualstudio.com/items?itemName=k6.k6',
                  },
                  {
                    picture: intellijImgData,
                    title: 'IntelliJ IDEA',
                    description: 'Run k6 tests from IntelliJ IDEs.',
                    url: 'https://plugins.jetbrains.com/plugin/16141-k6',
                  },
                  {
                    picture: javascriptImgData,
                    title: 'IntelliSense',
                    description:
                      'Get code autocompletion and in-context documentation.',
                    url: 'https://k6.io/docs/misc/intellisense/',
                  },
                ]}
              />
              <ExternalLinksDashboard
                dashboardTitle={'Converters'}
                subtitle={'Generate a k6 script quickly from an existing file.'}
                linksData={[
                  {
                    picture: harImgData,
                    title: 'HAR-to-k6',
                    description: 'Convert a HAR file to k6 script.',
                    url: 'https://github.com/k6io/har-to-k6',
                  },
                  {
                    picture: jmeterImgData,
                    title: 'JMeter-to-k6',
                    description: 'Convert a JMeter .jmx file to k6 script.',
                    url: 'https://github.com/k6io/jmeter-to-k6',
                  },
                  {
                    picture: postmanImgData,
                    title: 'Postman-to-k6',
                    description: 'Convert a Postman collection to k6 script.',
                    url: 'https://github.com/k6io/postman-to-k6',
                  },
                  {
                    picture: swaggerImgData,
                    title: 'OpenAPI generator',
                    description:
                      'Convert Swagger/OpenAPI specification to k6 script.',
                    url:
                      'https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6',
                  },
                ]}
              />
              <DocIconsRow
                title={'Result store and visualization'}
                subtitle={'k6 can output test results to various backends.'}
                iconsData={iconsDataSet1}
              />
              <DocIconsRow
                title={'Continuous Integration and Continuous Delivery'}
                subtitle={
                  // eslint-disable-next-line max-len
                  'By automating load testing with your CI / CD tools, you can quickly see when a code change has introduced a performance regression.'
                }
                iconsData={iconsDataSet2}
              />
              <ExternalLinksDashboard
                dashboardTitle={'k6 Extensions'}
                subtitle={`Use k6 extensions to further extend the possible use cases of k6. 
                  Extensions are written in go and then made available as JavaScript modules
                  for you to utilise in your test scripts.`}
                linksData={[
                  {
                    title: 'Explore the growing ecosystem of k6 extensions',
                    url: 'https://k6.io/docs/extensions/',
                  },
                  {
                    title: 'Learn how to create your own k6 extensions',
                    url: 'https://k6.io/blog/extending-k6-with-xk6',
                  },
                ]}
              />
              <CustomContentContainer>
                <p>
                  Please get in touch with us on{' '}
                  <a href={`${main}/slack`} className={'link'}>
                    Slack
                  </a>{' '}
                  if you have a tool or add-on that works well with k6, and we
                  will list it here!
                </p>
              </CustomContentContainer>
            </div>
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

export const IntegrationsResultIconBlock = () => (
  <DocIconsRow iconsData={iconsDataSet1} />
);

export const IntegrationsCiIconBlock = () => (
  <DocIconsRow iconsData={iconsDataSet2} />
);
