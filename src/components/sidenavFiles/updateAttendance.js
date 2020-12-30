import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Link, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Loading from "../loadingScreen";

const columns = [
  { field: "id", headerName: "क्र.सं.", width: 70 },
  { field: "name", headerName: "नाम अधि0/ कर्म0गण", width: 200 },
  { field: "designation", headerName: "पद", width: 130 },
  {
    field: "pno",
    headerName: "पीएनओ",
    width: 160,
  },
  {
    field: "contact",
    headerName: "मोबइल नं0",
    sortable: false,
    width: 160,
  },
  {
    field: "remark",
    headerName: "अन्य विवरण",
    sortable: false,
    width: 160,
  },
];
// for (var i = 0; i < columns.length; i++) {
//   columns[i].headerName.style.fontWeight = "900";
// }

async function getData(uri,station,updateRows, updateLoading) {
  fetch(uri+`/users?availability=unavailable&station=`+station)
    .then((res) => res.json())
    .then((doc) => {
      //console.log(doc);
      updateRows(
        doc.data.map((x, i) => ({
          id: i + 1,
          designation: x.designation,
          name: x.name,
          pno: x.pno,
          contact: x.contact,
          remark: x.remark,
          availability: x.availability,
        }))
      );
    });
  return updateLoading(true);
}

async function updateAttendance(uri,station,data, updateStatus) {
  //console.log(data);
  fetch(uri+`/users/attendance/update?station=`+station, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((doc) => {
      updateStatus(doc.status);
    });
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

function setStatusInterval(msg, updateStatus) {
    setTimeout(() => {
      updateStatus("");
      window.location.reload();
    }, 3000);
    return msg;
}

export default function AttendenceUpdate(props) {
  const [status, updateStatus] = useState("");
  const [rows, updateRows] = useState([
    {
      id: "",
      designation: "",
      name: "",
      pno: "",
      contact: "",
      remark: "",
      availability: "",
    },
  ]);
  const [loading, updateLoading] = useState(false);
  const [selected, updateSelected] = useState([]);
  useEffect(() => {
    console.log(props.uri)
    console.log(props.station)
    getData(props.uri,props.station,updateRows, updateLoading);
    props.nav(false);
    props.prev("/dashboard");
    
  }, []);

  return (
    <>
      {loading ? (
        setLoadingInterval(updateLoading, rows)
      ) : (
        <>
          <div style={{ height: "80%", width: "100%", marginTop: "6%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              checkboxSelection
              checked="true"
              onSelectionChange={(x) => updateSelected(x.rowIds)}
              autoPageSize="True"
            />
          </div>
          <div style={{ marginRight: "100px" }}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() =>
                updateAttendance(
                  props.uri,props.station,
                  selected.map((x) => rows[x - 1]["pno"]),
                  updateStatus
                )
              }
            >
              अपडेट करें
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
