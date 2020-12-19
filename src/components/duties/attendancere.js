import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Loading from "../loadingScreen";

function createData(id, name, designation, pno, contact, remark) {
  return { id, name, designation, pno, contact, remark };
}

const rows = [
  createData(
    1,
    "example name",
    "chutmarika",
    1234,
    "123456789",
    "naman backend god hai"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "क्र.सं.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "नाम अधि0/ कर्म0गण",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: true,
    label: "पद",
  },
  {
    id: "pno",
    numeric: true,
    disablePadding: true,
    label: "पीएनओ",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: true,
    label: "मोबइल नं0",
  },
  {
    id: "remark",
    numeric: false,
    disablePadding: true,
    label: "अन्य विवरण",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    totalRow,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={totalRow ? rowCount === totalRow : false}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all employees" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Attendance
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checkbox, updateCheck] = React.useState([]);
  const [status, updateStatus] = React.useState("");
  const [loading, updateLoading] = React.useState(true);
  const [users, updateUsers] = useState([]);

  const [paginatedUser, updatePaginated] = React.useState(
    users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  );
  console.log(paginatedUser);
  useEffect(() => {
    fetch(`http://localhost:8000/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          updateUsers(data.data);
        }
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      updateCheck(users.map((x) => x.pno));
      return;
    }
    updateCheck([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  function updatePagination({p,r}) {
    let start = p * r;
    let end =
      p * r + r <= users.length
        ? p * r + r
        : users.length;
    const pagination = users.slice(start, end);
    updatePaginated(pagination);
  }

  function loadingInterval() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (users.length) {
          resolve({ status: "true", interval });
        } else resolve({ status: "true", interval });
      }, 2000);
    });
  }
  function setLoadingInterval(updateLoading) {
    loadingInterval().then(({ status, interval }) => {
      if (status) {
        clearInterval(interval);
        return updateLoading(false);
      } else return;
    });

    return <Loading />;
  }

  async function updateAttendance(data, updateStatus) {
    console.log(data);
    fetch(`http://localhost:8000/users/attendance`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((doc) => {
        updateStatus(doc.status);
      });
  }

  const handleClickEvent = (e, pno) => {
    console.log(e.target.checked);
    if (!e.target.checked) {
      updateCheck(checkbox.filter((x) => x != pno));
    } else {
      updateCheck([...checkbox, pno]);
    }
  };

  const handleChangePage = (event, newPage) => {
    let start = (page + 1) * rowsPerPage;
    if (start < users.length) {
      setPage(newPage);
      updatePagination({p:page+1,r:rowsPerPage});
      console.log(page);
      console.log(rowsPerPage);
    } else return;
  };

  function setStatusInterval(msg, updateStatus) {
    if (msg == "error") {
      setTimeout(() => {
        updateStatus("");
      }, 5000);
      return msg;
    } else {
      return <Redirect to="/duties" />;
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    updatePagination({p:page,r:event.target.value});
    console.log(page);
    console.log(rowsPerPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <>
      {loading ? (
        setLoadingInterval(updateLoading, users)
      ) : (
        <div className={classes.root} style={{ marginTop: "5%" }}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={checkbox.length}
                  totalRow={users.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <>
                          {paginatedUser.length
                            ? users.map((x, i) => (
                                <>
                                  <TableRow
                                    hover
                                    // aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={x.pno}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        role="checkbox"
                                        onClick={(event) =>
                                          handleClickEvent(event, x.pno)
                                        }
                                        checked={
                                          checkbox.filter((v) => v == x.pno)
                                            .length
                                            ? true
                                            : false
                                        }
                                        inputProps={{
                                          "aria-labelledby": labelId,
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                    >
                                      {i + 1}
                                    </TableCell>

                                    <TableCell align="left" padding="none">
                                      {x.name}
                                    </TableCell>

                                    <TableCell padding="none" align="left">
                                      {x.designation}
                                    </TableCell>

                                    <TableCell padding="none" align="left">
                                      {x.pno}
                                    </TableCell>

                                    <TableCell padding="none" align="left">
                                      {x.contact}
                                    </TableCell>

                                    <TableCell padding="none" align="left">
                                      {x.remark}
                                    </TableCell>
                                  </TableRow>
                                </>
                              ))
                            : " "}
                        </>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <Button
            color="primary"
            size="large"
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={() => updateAttendance(checkbox, updateStatus)}
          >
            Next
          </Button>
          {status.length ? (
            <Typography
              variant="h6"
              displayInline
              align="center"
              style={{
                padding: "8px",
                backgroundColor: "#43A047",
                width: "120px",
                color: "white",
                borderRadius: "3px",
              }}
            >
              {setStatusInterval(status, updateStatus)}
            </Typography>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
