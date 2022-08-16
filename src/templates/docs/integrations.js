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
// icons
import CloudWatch from 'svg/amazon-cloudwatch.inline.svg';
import AWSCodeBuild from 'svg/aws-codebuild.inline.svg';
import Azure from 'svg/azure.inline.svg';
import Bamboo from 'svg/bamboo.inline.svg';
import Buddy from 'svg/buddy.inline.svg';
import CircleCI from 'svg/circleci.inline.svg';
import CSV from 'svg/csv.inline.svg';
import Datadog from 'svg/datadog.inline.svg';
import Flagger from 'svg/flagger.inline.svg';
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
import Prometheus from 'svg/prometheus.inline.svg';
import StatsD from 'svg/statsd.inline.svg';
import TeamCity from 'svg/teamcity.inline.svg';
import TimescaleDB from 'svg/timescaledb.inline.svg';
import SeoMetadata from 'utils/seo-metadata';
import { blog, main } from 'utils/urls';

const iconsDataSet1 = [
  {
    Icon: CloudWatch,
    name: 'Amazon CloudWatch',
    to: '/results-visualization/amazon-cloudwatch',
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
    Icon: Prometheus,
    name: 'Prometheus',
    to: '/results-visualization/prometheus',
  },
  {
    Icon: TimescaleDB,
    name: 'TimescaleDB',
    to: '/results-visualization/timescaledb',
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
    Icon: Buddy,
    name: 'Buddy',
    link: `${blog}/integrating-k6-with-buddy-devops/`,
  },
  {
    Icon: CircleCI,
    name: 'CircleCI',
    link: `${blog}/integrating-load-testing-with-circleci/`,
  },
  {
    Icon: Flagger,
    name: 'Flagger',
    link: 'https://docs.flagger.app/usage/webhooks#k6-load-tester',
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
    vscodeImg,
    intellijImg,
    javascriptImg,
    browserRecorderImg,
    testBuilderImg,
    harImg,
    steadybitImg,
    k6Img,
    chaostoolkitImg,
    postmanImg,
    swaggerImg,
    azureTestImg,
    testRailImg,
    xrayImg,
  } = useStaticQuery(graphql`
    query stubImageQuery {
      azureTestImg: file(
        absolutePath: { regex: "/images/doc-integrations/azuretest/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      k6Img: file(
        absolutePath: { regex: "/images/doc-integrations/k6squarelogo/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      chaostoolkitImg: file(
        absolutePath: { regex: "/images/doc-integrations/chaostoolkit/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      steadybitImg: file(
        absolutePath: { regex: "/images/doc-integrations/steadybit/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      testRailImg: file(
        absolutePath: { regex: "/images/doc-integrations/testrail/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      xrayImg: file(absolutePath: { regex: "/images/doc-integrations/xray/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      vscodeImg: file(
        absolutePath: { regex: "/images/doc-integrations/vscode/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      intellijImg: file(
        absolutePath: { regex: "/images/doc-integrations/intellij/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      javascriptImg: file(
        absolutePath: { regex: "/images/doc-integrations/javascript/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      testBuilderImg: file(
        absolutePath: { regex: "/images/doc-integrations/test-builder/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      browserRecorderImg: file(
        absolutePath: { regex: "/images/doc-integrations/browser-recorder/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      harImg: file(absolutePath: { regex: "/images/doc-integrations/har/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      postmanImg: file(
        absolutePath: { regex: "/images/doc-integrations/postman/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      swaggerImg: file(
        absolutePath: { regex: "/images/doc-integrations/openapi/" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 44
            height: 44
            transformOptions: { cropFocus: CENTER }
          )
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
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <ExternalLinksDashboard
              dashboardTitle={'Test authoring'}
              subtitle={'Codeless tools to speed up the test creation.'}
              linksData={[
                {
                  image: testBuilderImg,
                  title: 'Test Builder',
                  description:
                    'Inspired in Postman API Builder. Codeless UI tool to generate a k6 test quickly.',
                  url: 'https://k6.io/docs/test-authoring/test-builder/',
                },
                {
                  image: browserRecorderImg,
                  title: 'Browser Recorder',
                  description: 'Record a user journey to base your k6 test.',
                  url: 'https://k6.io/docs/test-authoring/recording-a-session/browser-recorder/',
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
                  image: vscodeImg,
                  title: 'Visual Studio Code Extension',
                  description: 'Run k6 tests from VS Code.',
                  url: 'https://marketplace.visualstudio.com/items?itemName=k6.k6',
                },
                {
                  image: intellijImg,
                  title: 'IntelliJ IDEA',
                  description: 'Run k6 tests from IntelliJ IDEs.',
                  url: 'https://plugins.jetbrains.com/plugin/16141-k6',
                },
                {
                  image: javascriptImg,
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
                  image: harImg,
                  title: 'HAR-to-k6',
                  description: 'Convert a HAR file to k6 script.',
                  url: 'https://github.com/k6io/har-to-k6',
                },
                {
                  image: postmanImg,
                  title: 'Postman-to-k6',
                  description: 'Convert a Postman collection to k6 script.',
                  url: 'https://github.com/apideck-libraries/postman-to-k6',
                },
                {
                  image: swaggerImg,
                  title: 'OpenAPI generator',
                  description:
                    'Convert Swagger/OpenAPI specification to k6 script.',
                  url: 'https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6',
                },
              ]}
            />
            <DocIconsRow
              title={'Result store and visualization'}
              subtitle={
                'k6 can output test results in various formats and backends.'
              }
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
              dashboardTitle={'Chaos engineering'}
              linksData={[
                {
                  image: steadybitImg,
                  title: 'Steadybit',
                  description: 'Using k6 and Steadybit for chaos engineering',
                  url: 'https://k6.io/blog/chaos-engineering-with-k6-and-steadybit',
                },
                {
                  image: k6Img,
                  title: 'xk6-chaos',
                  description: 'A k6 extension to test k8s failures',
                  url: 'https://github.com/grafana/xk6-chaos',
                },
                {
                  image: chaostoolkitImg,
                  title: 'ChaosToolkit',
                  description: 'A collection of k6 actions and probes',
                  url: 'http://chaostoolkit.org/drivers/k6/',
                },
              ]}
            />
            <ExternalLinksDashboard
              dashboardTitle={'Test management'}
              linksData={[
                {
                  image: azureTestImg,
                  title: 'Azure Test Plan',
                  description: 'Load Testing with Azure DevOps and k6',
                  url: 'https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a',
                },
                {
                  image: testRailImg,
                  title: 'TestRail',
                  description: 'Introducing TestRail in your k6 tests',
                  url: 'https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck',
                },
                {
                  image: xrayImg,
                  title: 'Xray',
                  description:
                    'Integrating with Xray. Validate test results in JIRA.',
                  url: 'https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6',
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
          <TableOfContents
            contentContainerRef={contentContainerRef}
            shouldMakeReplacement
          />
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
