import classNames from 'classnames/bind';
import TableWrapper from 'components/shared/table-wrapper';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './table-with-nested-rows.module.scss';

const cx = classNames.bind(styles);

<<<<<<< HEAD
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
      const noTooltips = base.filter(
        (item) => !['BWIPT', 'BNIT'].includes(item?.props?.mdxType),
      );
      const stringsOnly = noTooltips.map((item) => {
        if (typeof item === 'string') return item;
        if (item.props.mdxType === 'inlineCode') {
          return item.props.children;
        }
        if (item.props.mdxType === 'a') {
          return item.props.children?.props?.children ?? item.props.children;
        }
        return item;
      });
      const target = stringsOnly.filter(
        (item) => item.length && item !== ' ',
      )[0];
      group = target;
    } else {
      group =
        children[0]?.props?.children?.props?.children ||
        children[0]?.props?.children;
=======
function parseRows(rows) {
  return rows.map(
    ({ props: { children } }) =>
      children[0]?.props?.children?.props?.children ||
      children[0]?.props?.children,
  );
}

function getCollapsibleRowIndexes(rows) {
  const parsedRows = parseRows(rows);
  const collapsibleRowIndexes = {};

  parsedRows.forEach((startRow, startRowIndex) => {
    if (!startRow.includes('.')) {
      const nestedRowIndexes = [];

      for (
        let nestedRowIndex = 0;
        nestedRowIndex < parsedRows.length;
        nestedRowIndex += 1
      ) {
        if (nestedRowIndex > startRowIndex) {
          if (
            new RegExp(`^${startRow}\\..*`).test(parsedRows[nestedRowIndex])
          ) {
            nestedRowIndexes.push(nestedRowIndex);
          } else {
            break;
          }
        }
      }

      if (nestedRowIndexes.length > 0) {
        collapsibleRowIndexes[startRowIndex] = nestedRowIndexes;
      }
>>>>>>> 95e979e2 (feat: add component TableWithNestedRows)
    }
  });

<<<<<<< HEAD
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

const getPropertyPieces = (string) => string.split('.');

const getContentFromArray = (array) => (
  <>
    {array.map((item) => {
      if (typeof item === 'string') {
        if (item === ' ') {
          return ` `;
        }
        return item;
      }
      if (['BWIPT', 'BNIT'].includes(item?.props?.mdxType)) {
        return item;
      }
      if (item?.props?.mdxType === 'a') {
        const [c1, c2, c3] = getPropertyPieces(
          item.props.children?.props?.children ?? item.props.children,
        );
        return (
          <a href={item.props.href} rel="noreferrer">
            {c3 || c2 || c1}
          </a>
        );
      }
      if (item?.props?.mdxType === 'inlineCode') {
        const [c1, c2, c3] = getPropertyPieces(item.props.children);
        return <CodeInline>{c3 || c2 || c1}</CodeInline>;
      }
      return item;
    })}
  </>
);

const getCellContent = (property) => {
  if (Array.isArray(property)) {
    return getContentFromArray(property);
  }
  const [p1, p2, p3] = getPropertyPieces(property?.props?.children ?? property);
  return p3 || p2 || p1;
};

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

const isObj = (item) => !Array.isArray(item);

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

const changeExpandedAtId = (id) => (row) => {
  if (Array.isArray(row)) return row.map(changeExpandedAtId(id));
  if (row.id === id)
    return {
      ...row,
      isExpanded: !row.isExpanded,
    };
  return row;
};
=======
  return collapsibleRowIndexes;
}

function checkIsActive(activeParentRowIndexes, rowIndex) {
  return activeParentRowIndexes.includes(rowIndex);
}

function checkIsExpanded(index, collapsibleRowIndexes, activeParentRowIndexes) {
  const isChildRow = Object.values(collapsibleRowIndexes).some((childrenRows) =>
    childrenRows.includes(index),
  );

  if (!isChildRow) return true;

  if (activeParentRowIndexes.length === 0) return false;

  return activeParentRowIndexes.some((activeParentRowIndex) =>
    collapsibleRowIndexes[activeParentRowIndex].includes(index),
  );
}
>>>>>>> 95e979e2 (feat: add component TableWithNestedRows)

const TableBody = ({ children }) => {
  const [activeParentRowIndexes, setActiveParentRowIndexes] = React.useState(
    [],
  );

  const collapsibleRowIndexes = getCollapsibleRowIndexes(children);

  const handleToggleButtonClick = (rowIndex) => {
    setActiveParentRowIndexes((activeParentRowIndexes) =>
      activeParentRowIndexes.includes(rowIndex)
        ? activeParentRowIndexes.slice(
            0,
            activeParentRowIndexes.indexOf(rowIndex),
          )
        : [...activeParentRowIndexes, rowIndex],
    );
  };

  return (
    <tbody>
      {children.map(({ props: { children } }, rowIndex) => {
        const isCollapsible = collapsibleRowIndexes[rowIndex]?.length > 0;
        const isActive = checkIsActive(activeParentRowIndexes, rowIndex);
        const isExpanded = checkIsExpanded(
          rowIndex,
          collapsibleRowIndexes,
          activeParentRowIndexes,
        );

        if (!isExpanded) return null;

        return (
          <tr key={rowIndex}>
            {children.map(({ props: { children } }, cellIndex) => (
              <td key={cellIndex}>
                {children}
                {cellIndex === 0 && isCollapsible && (
                  <button
                    className={cx('toggle-button')}
                    type="button"
                    onClick={() => handleToggleButtonClick(rowIndex)}
                  >
                    {isActive ? 'Collapse' : 'Expand'}
                  </button>
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

const TableWithNestedRows = ({ children }) => {
  const thead = children.props.children.find(
    ({ props: { originalType } }) => originalType === 'thead',
  );
  const tbody = children.props.children.find(
    ({ props: { originalType } }) => originalType === 'tbody',
  );

  return (
    <TableWrapper className={cx('nested-table')}>
      {thead && thead}
      {tbody && <TableBody>{tbody.props.children}</TableBody>}
    </TableWrapper>
  );
};

TableWithNestedRows.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableWithNestedRows;
