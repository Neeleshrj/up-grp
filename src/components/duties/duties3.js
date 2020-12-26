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

function createData(name, number, returnName, returnNumber, men) {
  return { name, number, returnName, returnNumber, men };
}

const rows = [createData("Rajdhani", 1234, "Svtantra senani", 5678)];

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
    id: "trainName",
    numeric: false,
    disablePadding: true,
    label: "ट्रेन का नाम",
  },
  {
    id: "trainNumber",
    numeric: true,
    disablePadding: true,
    label: "गाड़ी संख्या",
  },
  {
    id: "returnTrainName",
    numeric: false,
    disablePadding: true,
    label: "वापसी की ट्रेन का नाम",
  },
  {
    id: "returnTrainNumber",
    numeric: true,
    disablePadding: true,
    label: "वापसी की गाड़ी संख्या",
  },
  {
    id: "numberMen",
    numeric: true,
    disablePadding: true,
    label: "लोगों की संख्या",
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
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all train" }}
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
          Trains
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checkbox, updateCheck] = React.useState({});
  const [status, updateStatus] = React.useState(false);
  const [error, updateError] = React.useState("");
  const [loading, updateLoading] = useState(false);
  const [click, updateClick] = useState(false);
  //train data state

  const [trains, updateTrains] = useState([]);
  useEffect(() => {
    fetch(props.uri+`/jobs/TrainDuty?station=`+props.station)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          updateTrains(data.data);
        }
      });
    updateLoading(true);
    props.nav(false);
    props.prev("/duties2");
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      updateCheck(trains.map((x) => x.train_no));
      return;
    }
    updateCheck([]);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

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

  function loadingInterval(rows) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (rows.length) {
          resolve({ status: "true", interval });
        } else resolve({ status: "false", interval });
      }, 2000);
    });
  }

  function setLoadingInterval(updateLoading, rows) {
    loadingInterval(rows).then(({ status, interval }) => {
      if (status) {
        clearInterval(interval);
        return updateLoading(false);
      } else return;
    });

    return <Loading />;
  }

  function sendDutyRequired(data, setStatus) {
    if (Object.keys(data).length) {
      fetch(props.uri+`/jobs/requirement/TrainDuty?station=`+props.station, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStatusInterval(data.status);
        });
      updateClick(true);
      //updateLoading(true);
    } else {
      setStatusInterval("success");
    }
  }

  const handleClickEvent = (e, train_no) => {
    let obj = { ...checkbox };
    if (checkbox.hasOwnProperty(train_no)) {
      delete obj[train_no];
      updateCheck(obj);
    } else {
      updateCheck({ ...obj, [train_no]: 1 });
    }
  };

  const handleInput = (e, train_no) => {
    let obj = { ...checkbox };
    updateCheck({ ...obj, [train_no]: e.target.value });
  };

  function setStatusInterval(msg) {
    if (msg == "error") {
      handleError("retry");
      updateClick(false);
    } else {
      handleAssignment(updateStatus);
    }
  }

  function handleAssignment(updateStatus) {
    fetch(props.uri+`/jobs/generate/assignment?station=`+props.station)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") updateStatus(true);
        else {
          handleError("retry");
          updateClick(false);
        }
      });
  }

  function handleError(err) {
    setTimeout(() => {
      updateError("");
    }, 5000);
    updateError(err);
    updateStatus(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, trains.length - page * rowsPerPage);

  return (
    <>
      {loading ? (
        setLoadingInterval(updateLoading, trains)
      ) : (
        <>
          <div className={classes.root} style={{ marginTop: "5%" }}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={trains.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(trains.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <>
                            {trains.length
                              ? trains.map((x, i) => (
                                  <>
                                    <TableRow
                                      hover
                                      // onClick={(event) => handleClick(event, row.name)}
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.name}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          onClick={(event) =>
                                            handleClickEvent(event, x.train_no)
                                          }
                                          checked={checkbox.hasOwnProperty(
                                            x.train_no
                                          )}
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
                                        {x.train_name}
                                      </TableCell>

                                      <TableCell padding="none" align="left">
                                        {x.train_no}
                                      </TableCell>

                                      <TableCell padding="none" align="left">
                                        {x.return_train}
                                      </TableCell>

                                      <TableCell padding="none" align="left">
                                        {x.return_train_number}
                                      </TableCell>

                                      <TableCell padding="none" align="left">
                                        <TextField
                                          size="small"
                                          id="filled-number"
                                          type="number"
                                          align="left"
                                          disabled={
                                            !checkbox.hasOwnProperty(x.train_no)
                                          }
                                          value={
                                            checkbox.hasOwnProperty(x.train_no)
                                              ? checkbox[x.train_no]
                                              : ""
                                          }
                                          onChange={(e) =>
                                            handleInput(e, x.train_no)
                                          }
                                          variant="outlined"
                                          style={{ marginTop: "2%" }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ))
                              : ""}
                          </>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
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
              onClick={() => sendDutyRequired(checkbox, updateStatus)}
            >
              आगे बढ़ें
            </Button>

            {click ? <p>loading...</p> : ""}
            {status ? (
              <Redirect to="/assignedJobs" />
            ) : error ? (
              <p>{error}</p>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
}
