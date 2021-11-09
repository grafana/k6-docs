import Glossary from 'components/pages/doc-page/glossary';
import { Link } from 'gatsby';
import React from 'react';
import { HeadingLandmark } from 'components/shared/heading';

const links = [
  {
    title: 'Browser',
    url: '/javascript-api/k6-x-browser/browser/',
  },
  {
    title: 'BrowserContext',
    url: '/javascript-api/k6-x-browser/browsercontext/',
  },
  {
    title: 'BrowserType',
    url: '/javascript-api/k6-x-browser/browsertype/',
  },
  {
    title: 'ElementHandle',
    url: '/javascript-api/k6-x-browser/elementhandle/',
  },
  {
    title: 'Frame',
    url: '/javascript-api/k6-x-browser/frame/',
  },
  {
    title: 'JSHandle',
    url: '/javascript-api/k6-x-browser/jshandle',
  },
  {
    title: 'Keyboard',
    url: '/javascript-api/k6-x-browser/keyboard',
  },
  {
    title: 'Mouse',
    url: '/javascript-api/k6-x-browser/mouse/',
  },
  {
    title: 'Page',
    url: '/javascript-api/k6-x-browser/page/',
  },
  {
    title: 'Request',
    url: '/javascript-api/k6-x-browser/request/',
  },
  {
    title: 'Response',
    url: '/javascript-api/k6-x-browser/response/',
  },
  {
    title: 'Touchscreen',
    url: '/javascript-api/k6-x-browser/touchscreen/',
  },
];

const BrowserClassList = () => {
  const Wrapper = HeadingLandmark('h3');

  return (
    <>
      <Wrapper>Browser-level APIs</Wrapper>
      <Glossary>
        <ul>
          {links.map(({ title, url }) => (
            <li key={title}>
              <Link to={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </Glossary>
    </>
  );
};
export default BrowserClassList;
