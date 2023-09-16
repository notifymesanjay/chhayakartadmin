import React, { useState, useEffect, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import UseViewport from "./use-viewport";
import styles from "./simple-table.module.scss";

const SimpleTable = ({
  isTwoTier,
  superHeaderCells = [],
  rows,
  headCells = [],
  cells,
  currentPage = 0,
  setCurrentPage = () => {},
  isFilter = true,
  showPagination = true,
  placeHolder,
}) => {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(currentPage);
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const viewPortWidth = UseViewport();

  useEffect(() => {
    if (filterText) {
      var filteredData = rows.filter(function (o) {
        return Object.keys(o).some(function (k) {
          return (
            o[k] &&
            o[k].toString().toLowerCase().indexOf(filterText.toLowerCase()) !=
              -1
          );
        });
      });
      setFilteredRows(filteredData);
    } else {
      setFilteredRows(rows);
    }
  }, [filterText, rows]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <>
      {isFilter && (
        <div className="row">
          <div className="col col-md-4">
            <div className="input-group mb-3">
              <span className="input-group-append">
                <div
                  className={`input-group-text bg-transparent ${styles.searchBtn}`}
                >
                  <i className="fa fa-search"></i>
                </div>
              </span>
              <input
                className={`form-control ${styles.filterSpacing}`}
                type="search"
                placeholder={placeHolder || "Search"}
                value={filterText}
                id="example-search-input"
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div style={{ minHeight: 320, width: "100%", overflowX: "auto" }}>
        <Table
          className={
            typeof isMobileAndTabletCheck !== "undefined" &&
            isMobileAndTabletCheck()
              ? viewPortWidth == window.innerWidth
                ? styles.tableMobileFullWidth
                : styles.tableMobilePartialWidth
              : styles.table
          }
        >
          <TableHead className={styles.tableHeader}>
            {isTwoTier && (
              <TableRow className={styles.tableRow}>
                {superHeaderCells.map((headerCell) => (
                  <TableCell
                    className={`${styles.tableCell} ${
                      headerCell.rowSpan === 1
                        ? styles.superHeaderCell
                        : styles.superHeaderRowCell
                    } ${headerCell.className ? headerCell.className : ""}`}
                    colSpan={headerCell.colSpan}
                    rowSpan={headerCell.rowSpan}
                    key={headerCell.id}
                    sortDirection={orderBy === headerCell.id ? order : false}
                  >
                    {headerCell.label && (
                      <>
                        {headerCell.rowSpan !== 1 && headerCell.id ? (
                          <TableSortLabel
                            active={orderBy === headerCell.id}
                            direction={
                              orderBy === headerCell.id ? order : "asc"
                            }
                            onClick={createSortHandler(headerCell.id)}
                          >
                            {headerCell.label}
                            {orderBy === headerCell.id ? (
                              <span className={styles.visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </span>
                            ) : null}
                          </TableSortLabel>
                        ) : (
                          headerCell.label
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
            {headCells.length > 0 && (
              <TableRow className={styles.tableRow}>
                {headCells.map((headCell) => (
                  <TableCell
                    className={`${styles.tableCell} ${
                      isTwoTier ? styles.singleTierCell : ""
                    } ${headCell.className ? headCell.className : ""}`}
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.label && (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={styles.visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody className={styles.tableBody}>
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Fragment key={index}>
                  <TableRow
                    className={styles.tableRow}
                    style={{
                      border: 0,
                    }}
                  >
                    {cells.map((cell, cIndex) => (
                      <TableCell
                        className={`${styles.tableCell} ${
                          cell.className ? cell.className : ""
                        }`}
                        key={cIndex}
                      >
                        {cell.content(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              ))}
          </TableBody>
        </Table>
        {showPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            className={styles.pagination}
          />
        )}
      </div>
    </>
  );
};

export default SimpleTable;
