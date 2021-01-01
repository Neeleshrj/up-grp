import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Loading from "../loadingScreen";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ed1c24",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function handleInput(input, area, shift, state, updateState) {
  let newState = { ...state, [area]: { no_of_men: input, shift } };
  console.log(newState);
  updateState(newState);
}

function sendDutyRequired(uri, station, data, setStatus) {
  if (Object.keys(data).length) {
    fetch(uri + `/jobs/requirement/AreaDuty?station=` + station, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus(data.status);
      });
  } else setStatus("success");
}

function setStatusInterval(msg, updateStatus) {
  if (msg == "error") {
    setTimeout(() => {
      updateStatus("");
    }, 5000);
    return msg;
  } else {
    return <Redirect to="/duty/train" />;
  }
}

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

export default function CustomizedTables2(props) {
  const classes = useStyles();
  const [status, updateStatus] = useState("");
  const [areas, updateAreas] = useState([]);
  const [input, updateInput] = useState({});
  const [loading, updateLoading] = useState(false);
  useEffect(() => {
    fetch(props.uri + `/jobs/AreaDuty?station=` + props.station)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          updateAreas(data.data);
        }
      });
    updateLoading(true);
    props.nav(false);
    props.prev("/duty/platform");
  }, []);

  return (
    <>
      {loading ? (
        setLoadingInterval(updateLoading, areas)
      ) : (
        <>
          <TableContainer component={Paper} style={{ marginTop: "15vh" }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>क्र.सं.</StyledTableCell>
                  <StyledTableCell align="left">
                    ड्यूटी का स्थान
                  </StyledTableCell>
                  <StyledTableCell align="center">पारी</StyledTableCell>
                  <StyledTableCell align="center">
                    लोगों की संख्या रात
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {areas.length
                  ? areas.map((x, i) => (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {x.location}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {x.shift}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            size="small"
                            id="filled-number"
                            type="number"
                            value={
                              input.hasOwnProperty(x._id)
                                ? input[x._id].no_of_men
                                : x.no_of_men
                            }
                            variant="outlined"
                            onChange={(e) =>
                              handleInput(
                                e.target.value,
                                x._id,
                                x.shift,
                                input,
                                updateInput
                              )
                            }
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() =>
                sendDutyRequired(props.uri, props.station, input, updateStatus)
              }
            >
              आगे बढ़ें
            </Button>
            {status.length ? (
              <Typography
                variant="h6"
                displayInline
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
        </>
      )}
    </>
  );
}
