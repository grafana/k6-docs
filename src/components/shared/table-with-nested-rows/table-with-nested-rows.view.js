import classNames from 'classnames/bind';
import TableWrapper from 'components/shared/table-wrapper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { CodeInline } from '../code';

import CollapsibleClosedIcon from './svg/collapsible-closed.inline.svg';
import CollapsibleOpenIcon from './svg/collapsible-open.inline.svg';
import styles from './table-with-nested-rows.module.scss';

const cx = classNames.bind(styles);

/* 1.
 * Parse the array of children
 * to get flat array with id being the child index in original array
 * and group is the property
 * */
const parseRows = (rows) =>
  rows.map(({ props: { children } }, i) => {
    let group;
    const base = children[0]?.props?.children;
    if (Array.isArray(base)) {
      // tooltips require no special handling
      const noTooltips = base.filter(
        (item) => !['BWIPT', 'BNIT'].includes(item?.props?.mdxType),
      );
      const stringsOnly = noTooltips.map((item) => {
        if (typeof item === 'string') return item;
        if (item.props.mdxType === 'inlineCode') {
          // extract key
          return item.props.children;
        }
        if (item.props.mdxType === 'a') {
          // extract key, may be nested within another element like inline code
          // being inside a link
          return item.props.children?.props?.children ?? item.props.children;
        }
        return item;
      });
      // grab the key, assuming
      // after filtering for tooltips and empty strings
      // it comes first
      const target = stringsOnly.filter(
        (item) => item.length && item !== ' ',
      )[0];
      group = target;
    } else {
      group =
        children[0]?.props?.children?.props?.children ||
        children[0]?.props?.children;
    }
    return {
      id: i,
      group: group.trim(),
    };
  });

/* 2.
 * Transform parsed array into
 * a multidimensional array
 * that will serve as a source of truth
 * for renderer and a table state
 * */
const structureRows = (parsedRows) => {
  const result = [];
  const hash = { _: result };
  parsedRows.forEach((row) => {
    if (!row.group) {
      hash._.push(row);
      return;
    }
    row.group
      .split('.')
      .reduce((acc, cur) => {
        if (!acc[cur]) {
          acc[cur] = { _: [] };
          acc._.push(acc[cur]._);
        }
        return acc[cur];
      }, hash)
      ._.push(row);
  });
  return result;
};
// local helpers

const isObj = (item) => !Array.isArray(item);
const getPropertyPieces = (string) => string.split('.');

const generateInlineCode = (item) => {
  const [c1, c2, c3] = getPropertyPieces(item.props.children);
  return <CodeInline>{c3 || c2 || c1}</CodeInline>;
};
const generateLink = (item) => {
  const [c1, c2, c3] = getPropertyPieces(
    item.props.children?.props?.children ?? item.props.children,
  );
  return (
    <a href={item.props.href} rel="noreferrer">
      {c3 || c2 || c1}
    </a>
  );
};

// handle cell content if the argument is an array
const getContentFromArray = (array) => (
  <>
    {array.map((item, idx) => {
      if (typeof item === 'string') {
        if ([0, 1].includes(idx) && item !== ' ') {
          const [c1, c2, c3] = getPropertyPieces(item);
          return item === ' ' ? item : c3 || c2 || c1;
        }
        return item;
      }
      if (['BWIPT', 'BNIT'].includes(item?.props?.mdxType)) {
        return item;
      }
      if (item?.props?.mdxType === 'a') {
        return generateLink(item);
      }
      if (item?.props?.mdxType === 'inlineCode') {
        return generateInlineCode(item);
      }
      return item;
    })}
  </>
);

// cast passed AST piece into a cell content
const getCellContent = (property) => {
  if (Array.isArray(property)) {
    return getContentFromArray(property);
  }
  if (property?.props?.mdxType === 'inlineCode') {
    return generateInlineCode(property);
  }
  if (property?.props?.mdxType === 'a') {
    return generateLink(property);
  }
  const [p1, p2, p3] = getPropertyPieces(property?.props?.children ?? property);
  return p3 || p2 || p1;
};

// a single unit, the row table component
const TableRow = (props) => {
  const {
    handleToggleClick,
    data,
    isCollapsible = false,
    isExpanded = false,
    nestLevel = 0,
    isLast,
  } = props;
  return (
    <tr
      className={cx(
        `nesting-${nestLevel}`,
        isExpanded && `is-expanded-${nestLevel}`,
        isLast && `is-last`,
      )}
    >
      {data?.props?.children.map(({ props: { children } }, cellIndex) => (
        <td key={cellIndex}>
          {cellIndex === 0 && isCollapsible && (
            <button
              className={cx('toggle-button')}
              type="button"
              onClick={handleToggleClick}
            >
              {isExpanded ? <CollapsibleOpenIcon /> : <CollapsibleClosedIcon />}
            </button>
          )}
          <div>{cellIndex === 0 ? getCellContent(children) : children}</div>
        </td>
      )) ?? [<td>invalid row markup</td>]}
    </tr>
  );
};

// recursive row renderer
const renderRowsGroup = (params) => {
  const {
    data,
    handleToggleClick,
    row,
    isCollapsible,
    isExpanded = false,
    nestLevel,
    isLast,
  } = params;

  if (!isCollapsible) {
    return (
      <TableRow
        data={isObj(row) ? data[row.id] : data[row[0].id]}
        handleToggleClick={() =>
          handleToggleClick(isObj(row) ? row.id : row[0].id)
        }
        nestLevel={nestLevel}
        isLast={isLast}
      />
    );
  }

  if (isObj(row)) {
    return (
      <TableRow
        isCollapsible={isCollapsible}
        isExpanded={row.isExpanded ?? false}
        data={data[row.id]}
        handleToggleClick={() => handleToggleClick(row.id)}
        nestLevel={nestLevel - 1}
        isLast={isLast}
      />
    );
  }

  if (isExpanded) {
    return row.map((nestedRow, nestedRowIdx) =>
      renderRowsGroup({
        data,
        handleToggleClick,
        row: nestedRow,
        isCollapsible: nestedRow.length > 1 || nestedRow.isExpanded || false,
        isExpanded: nestedRow?.[0]?.isExpanded ?? false,
        nestLevel: nestLevel + 1,
        isLast: row.length - 1 === nestedRowIdx,
      }),
    );
  }
  return (
    <TableRow
      isCollapsible
      data={data[row[0].id]}
      handleToggleClick={() => handleToggleClick(row[0].id)}
      nestLevel={nestLevel}
      isLast={isLast}
    />
  );
};

// change state handler
const changeExpandedAtId = (id) => (row) => {
  if (Array.isArray(row)) return row.map(changeExpandedAtId(id));
  if (row.id === id)
    return {
      ...row,
      isExpanded: !row.isExpanded,
    };
  return row;
};

const TableBody = ({ children }) => {
  const [rowsState, setRowsState] = useState(() =>
    structureRows(parseRows(children)),
  );
  const handleToggleClick = (rowId) =>
    setRowsState((rows) => rows.map(changeExpandedAtId(rowId)));
  return (
    <tbody>
      {rowsState.map((row, idx) =>
        renderRowsGroup({
          handleToggleClick,
          data: children,
          row,
          rowIdx: idx,
          isLast: idx === rowsState.length - 1,
          isCollapsible: row.length > 1,
          isExpanded: row?.[0]?.isExpanded ?? false,
          nestLevel: 0,
        }),
      )}
    </tbody>
  );
};

// main component
const TableWithNestedRows = ({ children }) => {
  const thead = children.props.children.find(
    ({ props: { originalType } }) => originalType === 'thead',
  );
  const tbody = children.props.children.find(
    ({ props: { originalType } }) => originalType === 'tbody',
  );

  return (
    <TableWrapper>
      {thead && thead}
      {tbody && <TableBody>{tbody.props.children}</TableBody>}
    </TableWrapper>
  );
};

TableWithNestedRows.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableWithNestedRows;
