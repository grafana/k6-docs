import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { graphql, Link } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { Sticky, StickyContainer } from 'react-sticky';
import {
  slugify,
  stripDirectoryPath,
  unorderify,
  compose,
  noSlugDuplication,
  whenElementAvailable,
} from 'utils';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import { default as docPageContent } from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { default as docPageNav } from 'components/pages/doc-page/doc-page-nav/doc-page-nav.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { HtmlContent } from 'components/blocks/html-content';
import { styles as codeStyles } from 'components/shared/code';
import CustomContentContainer from 'components/shared/custom-content-container';
import { CodeGroup } from 'components/templates/doc-page/code-group';
import { DocBlockquote } from 'components/pages/doc-page/doc-blockquote';
import jsApiStyles from 'components/pages/doc-javascript-api/doc-javascript-api.module.scss';
import AnchorIcon from 'components/templates/doc-page/doc-page-content/svg/anchor.inline.svg';
import docPage from 'templates/doc-page';

// Return an array of { module: <div>, classes: [<tr>...], functions: [<tr>...] } objects.
// Top-level documents (modules) as defined by the sidebarTree will be
// rendered as header+content, and child documents as table rows.
function buildIndex(nodes, sidebarTree) {
  const index = [];

  const components = {
    '.code-group': CodeGroup,
    h2: ({ mdBlockContent }) => (
      <h2
        className={docPageContent.markHeading}
        id={`${slugify(mdBlockContent).replace(/\//g, '-')}`}
      >
        <a href={`#${slugify(mdBlockContent).replace(/\//g, '-')}`}>
          <AnchorIcon />
        </a>
        {mdBlockContent}
      </h2>
    ),
    '.doc-blockquote': DocBlockquote,
    table: ({ mdBlockContent }) => (
      <div className={jsApiStyles.tableWrapper}>
        <table dangerouslySetInnerHTML={{ __html: mdBlockContent }} />
      </div>
    ),
  };

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const md = node.children[0];
    if (md.frontmatter.title.replace('/', '-') in sidebarTree.children) {
      index.push({
        module: (
          <div key={node.id} className={jsApiStyles.moduleWrapper}>
            <h2>{md.frontmatter.title}</h2>
            <HtmlContent
              content={md.html}
              components={components}
              className={classNames(
                docPageContent.contentWRapper,
                codeStyles.docContainer,
              )}
            />
          </div>
        ),
        classes: [],
        functions: [],
      });
      continue;
    }

    // FIXME: Hack to avoid showing methods in the Functions table.
    // This needs a more structural fix (exclude by frontmatter field?),
    // but I wasn't able to get an exclude filter working with allFile or
    // allMarkdownRemark.
    if (
      md.frontmatter.title.match(
        /(CookieJar|Counter|Gauge|Rate|Response|Selection|Socket|Trend)\./,
      )
    ) {
      continue;
    }

    const path = `${stripDirectoryPath(
      node.relativeDirectory,
      'docs',
    )}/${md.frontmatter.title.replace(/\//g, '-')}`;
    const slug = compose(unorderify, slugify)(path);

    const row = (
      <tr key={node.id}>
        <td>
          <Link to={`/${slug}`}>{md.frontmatter.title}</Link>
        </td>
        <td>{md.frontmatter.description}</td>
      </tr>
    );

    let nodeType = 'functions';
    if (md.frontmatter.category === 'k6api-class') {
      nodeType = 'classes';
    }

    const last = index[index.length - 1];
    // checking if here is identical slug already exists in main module
    // skipping row addition if true
    if (noSlugDuplication(last, slug)) {
      last[nodeType].push(row);
    }
  }

  return index;
}

function createTableMaybe(elements, header) {
  if (elements.length > 0) {
    return (
      <div className={jsApiStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>{header}</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function({ data, pageContext: { sidebarTree, navLinks } }) {
  const index = buildIndex(data.allFile.nodes, sidebarTree);
  const pageMetadata = SeoMetadata['javascript-api'];

  const [pageNavLinks, setPageNavLinks] = useState([]);

  useEffect(() => {
    const allHeadingMarks = document
      .querySelector(`.${docPageContent.inner}`)
      .querySelectorAll('h2');
    setPageNavLinks(
      Array.from(allHeadingMarks).map(({ innerHTML }) => ({
        title: innerHTML,
        anchor: `#${slugify(innerHTML).replace(/\//g, '-')}`,
      })),
    );
  }, []);

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
          {pageNavLinks.map(({ title, anchor }, i) => (
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
  );
  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo
        title={'JavaScript API'}
        description={'Welcome to the k6 JavaScript API documentation.'}
      />
      <div className={docPageContent.inner}>
        <StickyContainer>
          <div className={stickyContainerClasses}>
            <div className={`${htmlStyles.wrapper}`}>
              <CustomContentContainer label={jsApiStyles.jsApiWrapper}>
                {index.map(node => {
                  const out = [node.module];
                  out.push(createTableMaybe(node.classes, 'Class'));
                  out.push(createTableMaybe(node.functions, 'Function'));
                  return out;
                })}
              </CustomContentContainer>
            </div>
          </div>
          <Sticky topOffset={-15} bottomOffset={10} disableCompensation>
            {renderSidebar}
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}

export const query = graphql`
  query IndexQuery {
    allFile(
      filter: {
        ext: { eq: ".md" }
        relativeDirectory: { regex: "/javascript api/" }
      }
      sort: { fields: absolutePath, order: ASC }
    ) {
      nodes {
        id
        relativeDirectory
        children {
          ... on MarkdownRemark {
            html
            frontmatter {
              title
              category
              description
            }
          }
        }
      }
    }
  }
`;
