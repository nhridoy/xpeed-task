import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTable, useFilters, useSortBy } from "react-table";

import useList from "../../hooks/useList";
import Filter from "../Filter/Filter";
import successMessages from "../utils/successMessages";
import "./List.css";

const List = () => {
  const [columns, data] = useList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".droppable");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        successMessages("http://localhost/api/reorder.php", setLoading).then(
          (response) => {
            setLoading(false);
          }
        );
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }, [data]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: Filter,
    };
  }, []);

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
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
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>

                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ) : (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="droppable">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  draggable="true"
                  className="draggable"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.column.id === "id" ? (
                          <Link to={`get_form/${cell.row.original.id}`}>
                            {cell.render("Cell")}
                          </Link>
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
      {loading ? <div className="lds-dual-ring"></div> : null}
    </>
  );
};

export default List;
