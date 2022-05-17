import classNames from 'classnames/bind';
import TableWrapper from 'components/shared/table-wrapper';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './table-with-nested-rows.module.scss';

const cx = classNames.bind(styles);

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
    }
  });

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
