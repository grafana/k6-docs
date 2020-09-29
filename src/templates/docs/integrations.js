import classNames from 'classnames';
// components
import { DocIconsRow } from 'components/pages/doc-integrations/doc-icons-row';
import { ExternalLinksDashboard } from 'components/pages/doc-integrations/external-links-dashboard';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import CustomContentContainer from 'components/shared/custom-content-container';
// styles
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { useStaticQuery, graphql } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
// icons
import CloudWatch from 'svg/amazon-cloudwatch.inline.svg';
import Kafka from 'svg/apache-kafka.inline.svg';
import Azure from 'svg/azure.inline.svg';
import CircleCI from 'svg/circleci.inline.svg';
import CSV from 'svg/csv.inline.svg';
import Datadog from 'svg/datadog.inline.svg';
import GitHub from 'svg/github.inline.svg';
import Gitlab from 'svg/gitlab.inline.svg';
import Grafana from 'svg/influxdb-grafana.inline.svg';
import Jenkins from 'svg/jenkins.inline.svg';
import Json from 'svg/json.inline.svg';
import K6 from 'svg/k6.inline.svg';
import NewRelic from 'svg/new-relic.inline.svg';
import StatsD from 'svg/statsd.inline.svg';
import TeamCity from 'svg/teamcity.inline.svg';
import SeoMetadata from 'utils/seo-metadata';
import { blog, main } from 'utils/urls';

const iconsDataSet1 = [
  {
    Icon: Kafka,
    name: 'Apache Kafka',
    to: '/results-visualization/apache-kafka',
  },
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
    name: 'DataDog',
    to: '/results-visualization/datadog',
  },
  {
    Icon: Grafana,
    name: 'InfluxDB + Grafana',
    to: '/results-visualization/influxdb-+-grafana',
  },
  {
    Icon: Json,
    name: 'JSON file',
    to: '/results-visualization/json',
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
    Icon: Azure,
    name: 'Azure Pipelines',
    link: `${blog}/integrating-load-testing-with-azure-pipelines`,
  },
  {
    Icon: CircleCI,
    name: 'CircleCI',
    link: `${blog}/integrating-load-testing-with-circleci`,
  },
  {
    Icon: GitHub,
    name: 'GitHub Actions',
    link: `${blog}/load-testing-using-github-actions`,
  },
  {
    Icon: Gitlab,
    name: 'GitLab',
    link: `${blog}/integrating-load-testing-with-gitlab`,
  },
  {
    Icon: Jenkins,
    name: 'Jenkins',
    link: `${blog}/integrating-load-testing-with-jenkins`,
  },
  {
    Icon: TeamCity,
    name: 'TeamCity',
    link: `${blog}/load-testing-using-teamcity-and-k6`,
  },
];

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  const pageMetadata = SeoMetadata.integrations;
  const contentContainerRef = useRef(null);

  const {
    graphqlImg: {
      childImageSharp: { fixed: graphqlImgData },
    },
    azureImg: {
      childImageSharp: { fixed: azureImgData },
    },
    vscodeImg: {
      childImageSharp: { fixed: vscodeImgData },
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
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo title={'Integrations & Tools'} description={''} />
      <div className={`${docPageContent.inner} `}>
        <StickyContainer>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <ExternalLinksDashboard
              dashboardTitle={'Converters'}
              linksData={[
                {
                  picture: harImgData,
                  title: 'HAR-to-k6',
                  description: 'Convert a HAR file to k6 script.',
                  url: 'https://github.com/loadimpact/har-to-k6',
                },
                {
                  picture: jmeterImgData,
                  title: 'JMeter-to-k6',
                  description: 'Convert a JMeter .jmx file to k6 script.',
                  url: 'https://github.com/loadimpact/jmeter-to-k6',
                },
                {
                  picture: postmanImgData,
                  title: 'Postman-to-k6',
                  description: 'Convert a Postman collection to k6 script.',
                  url: 'https://github.com/loadimpact/postman-to-k6',
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
              subtitle={
                'k6 can output its test result data to different sources:'
              }
              iconsData={iconsDataSet1}
            />
            <ExternalLinksDashboard
              dashboardTitle={'IDE'}
              linksData={[
                {
                  picture: vscodeImgData,
                  title: 'Visual Studio Code Extension',
                  description:
                    'Execute VS Code commands to run a k6 test of your current file.',
                  url:
                    'https://marketplace.visualstudio.com/items?itemName=k6.k6',
                },
                {
                  picture: vscodeImgData,
                  title: 'IntelliSense',
                  description:
                    'Get code autocompletion and in-context documentation.',
                  url: 'https://k6.io/docs/misc/intellisense',
                },
              ]}
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
              dashboardTitle={'Grafana dashboards'}
              linksData={[
                {
                  title: 'dcadwallader',
                  url: 'https://grafana.com/grafana/dashboards/2587',
                },
                {
                  title: 'Stian Øvrevåge',
                  url: 'https://grafana.com/grafana/dashboards/4411',
                },
                {
                  title: 'cyaiox',
                  url: 'https://grafana.com/grafana/dashboards/8156',
                },
                {
                  title: 'smockvavelsky',
                  url: 'https://grafana.com/grafana/dashboards/10553',
                },
                {
                  title: 'k m',
                  url: 'https://grafana.com/grafana/dashboards/10660',
                },
              ]}
            />
            <ExternalLinksDashboard
              dashboardTitle={'Community integrations'}
              linksData={[
                {
                  picture: graphqlImgData,
                  title: 'easygraphql-load-tester',
                  description:
                    'Create queries from your GraphQL schema to use with your favorite load testing package.',
                  url: 'https://github.com/EasyGraphQL/easygraphql-load-tester',
                },
                {
                  picture: azureImgData,
                  title: 'k6ToAzure',
                  description:
                    'Takes output JSON from k6 (k6.io) and pushes into Azure Log Analytics.',
                  url:
                    'https://github.com/benc-uk/smilr/blob/master/azure/load-test-reports/k6ToAzure.js',
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

export const IntegrationsResultIconBlock = () => (
  <DocIconsRow iconsData={iconsDataSet1} />
);

export const IntegrationsCiIconBlock = () => (
  <DocIconsRow iconsData={iconsDataSet2} />
);
