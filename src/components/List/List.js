import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useSortBy } from "react-table/dist/react-table.development";
import useList from "../../hooks/useList";
import "./List.css";

const List = () => {
  const { columns, data } = useList();

  const COLUMNS = useMemo(() => columns, []);
  const DATA = useMemo(() => data, []);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                column.sortable ? (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ) : (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === "id" ? (
                        <a href={`/detail/${cell.row.original.id}`}>
                          {cell.render("Cell")}
                        </a>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
