import React from 'react';
import { useTable } from 'react-table';
import './TableView.css';

function TableView({ columns, data }) {
  const { title, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
    {/* <SearchBar/> */}
    <div className="title"></div>
    <div className="table-container">
        <table {...getTableProps()} className="table-view">
        <thead className='table-head'>
            {headerGroups.map((headerGroup, key) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                ))}
                </tr>
            ))}
        </thead>
            <tbody {...getTableBodyProps()} className='table-body'>
                {rows.map((row, rowKey) => {
                    prepareRow(row)
                    return (
                <tr {...row.getRowProps()} key={rowKey}>
                    {row.cells.map((cell, cellKey) => {
                        return <td {...cell.getCellProps()} key={cellKey}>
                            {cell.render('Cell')}
                            </td>
                    })}
                </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </>
  );
}

export default TableView;