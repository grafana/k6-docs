import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import { NotFound } from 'components/pages/404/not-found';
import SeoMetadata from 'utils/seo-metadata';
import {
  buildFileTree,
  buildFileTreeNode,
  stripDirectoryPath,
  slugify,
  unorderify,
  compose,
} from 'utils';

export default function ({ data }) {
  const pageMetadata = SeoMetadata[404];

  const [sidebarTree, setSidebarTree] = useState(null);
  const [navLinks, setNavLinks] = useState([]);

  // Build a tree for a sidebar
  const sidebarTreeBuilder = buildFileTree(buildFileTreeNode);

  // examples page contains `examples` folder which causing path
  // duplication, removing it as well
  const dedupeExamples = (path) =>
    path.replace(/examples\/examples/i, 'examples');

  // no /guides route; welcome is redirecting to the root path
  // difference from removeGuides: this one is for sidebar links processing and
  // the former is for creatingPages
  const removeGuidesAndRedirectWelcome = (path) =>
    path.replace(/guides\/(getting-started\/welcome)?/i, '');

  // ensures that no trailing slash is left
  const noTrailingSlash = (path) =>
    path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

  useEffect(() => {
    data.allFile.nodes.forEach(
      ({ name, relativeDirectory, children, children: [remarkNode] }) => {
        // for debuggin purpose in case there is errors in md/html syntax
        if (
          typeof children === 'undefined' ||
          typeof remarkNode === 'undefined'
        )
          return;

        const {
          frontmatter: { title, redirect, hideFromSidebar, draft },
        } = remarkNode;
        // skip altogether if this content has draft flag
        // OR hideFromSidebar
        if ((draft === 'true' && isProduction) || hideFromSidebar) return;
        const path = slugify(
          `/${stripDirectoryPath(relativeDirectory, 'docs')}/${title.replace(
            /\//g,
            '-',
          )}`,
        );
        // titles like k6/html treated like paths otherwise
        sidebarTreeBuilder.addNode(
          unorderify(stripDirectoryPath(relativeDirectory, 'docs')),
          unorderify(name),
          {
            path: compose(
              noTrailingSlash,
              dedupeExamples,
              removeGuidesAndRedirectWelcome,
              unorderify,
            )(path),
            title,
            redirect,
          },
        );
      },
    );

    setSidebarTree(sidebarTreeBuilder.getTree().children.guides);

    const docPageNav = Object.keys(sidebarTreeBuilder.getTree().children);

    // create data for rendering docs navigation
    const docPageNavLinks = docPageNav.map((item) => ({
      label: item === 'cloud' ? 'Cloud Docs' : item.toUpperCase(),
      to: item === 'guides' ? `/` : `/${slugify(item)}`,
    }));

    setNavLinks(docPageNavLinks);
  }, []);

  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <NotFound />
    </DocLayout>
  );
}

export const query = graphql`
  query docPagesQuery {
    allFile(
      filter: { ext: { in: [".md"] }, relativeDirectory: { regex: "/docs/" } }
      sort: { fields: absolutePath, order: ASC }
    ) {
      nodes {
        name
        relativeDirectory
        children {
          ... on Mdx {
            body
            frontmatter {
              title
              head_title
              excerpt
              redirect
              hideFromSidebar
              draft
            }
          }
        }
      }
    }
  }
`;
