import Glossary from 'components/pages/doc-page/glossary';
import { HeadingLandmark } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

const links = [
  {
    title: 'Browser',
    url: '/javascript-api/xk6-browser/browser/',
  },
  {
    title: 'BrowserContext',
    url: '/javascript-api/xk6-browser/browsercontext/',
  },
  {
    title: 'BrowserType',
    url: '/javascript-api/xk6-browser/browsertype/',
  },
  {
    title: 'ElementHandle',
    url: '/javascript-api/xk6-browser/elementhandle/',
  },
  {
    title: 'Frame',
    url: '/javascript-api/xk6-browser/frame/',
  },
  {
    title: 'JSHandle',
    url: '/javascript-api/xk6-browser/jshandle',
  },
  {
    title: 'Keyboard',
    url: '/javascript-api/xk6-browser/keyboard',
  },
  {
    title: 'Mouse',
    url: '/javascript-api/xk6-browser/mouse/',
  },
  {
    title: 'Page',
    url: '/javascript-api/xk6-browser/page/',
  },
  {
    title: 'Request',
    url: '/javascript-api/xk6-browser/request/',
  },
  {
    title: 'Response',
    url: '/javascript-api/xk6-browser/response/',
  },
  {
    title: 'Touchscreen',
    url: '/javascript-api/xk6-browser/touchscreen/',
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
