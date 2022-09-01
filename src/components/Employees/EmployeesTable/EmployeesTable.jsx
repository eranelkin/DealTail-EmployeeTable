import React, { memo } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EmployeeRow from "./EmployeeRow/EmployeeRow";
import useTableSort from "./useTableSort";
import CircularProgress from "@mui/material/CircularProgress";
import { useEmployees } from "./EmployeesContext";
import { translations } from "../../../translations/translations";

import "./employeesTable.scss";

const {
  employees: { headers },
} = translations;

const EmployeesTable = () => {
  const { employees, isLoading, isError } = useEmployees();
  const [sortedEmployees, orderKey, orderDirection, onColumnSort] =
    useTableSort(employees);

  // console.log("XXX: ", employees);
  return isLoading === "loading" ? (
    <div className="loading">
      <CircularProgress disableShrink />
    </div>
  ) : (
    <div className="employees-page">
      <Typography variant="h5" component="div" className="page-title">
        {translations.employees.title}
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 1400 }} className="">
        <Table sx={{ minWidth: 650 }} stickyHeader className="">
          <TableHead>
            <TableRow className="header-row">
              <TableCell style={{ width: 335 }}>{headers.name}</TableCell>
              <TableCell style={{ width: 235 }}>{headers.email}</TableCell>
              <TableCell style={{ width: 220 }} align="right">
                <TableSortLabel
                  active={orderKey === "salary"}
                  direction={orderKey === "salary" ? orderDirection : "asc"}
                  onClick={onColumnSort("salary")}
                >
                  {headers.salary}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderKey === "rating"}
                  direction={orderKey === "rating" ? orderDirection : "asc"}
                  onClick={onColumnSort("rating")}
                >
                  {headers.rating}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees &&
              sortedEmployees.map((employee) => {
                return <EmployeeRow key={employee.id} employee={employee} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

EmployeesTable.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({})),
};

export default memo(EmployeesTable);