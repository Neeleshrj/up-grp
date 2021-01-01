import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Link, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Loading from "../loadingScreen";
import SearchBar from "../searchBar";



// for (var i = 0; i < columns.length; i++) {
//   columns[i].headerName.style.fontWeight = "900";
// }

async function getData(uri,station,updateRows, updateLoading, updateFilterData) {
  fetch(uri+`/users?station=`+station)
    .then((res) => res.json())
    .then((doc) => {
      //console.log(doc);
      const data = doc.data.map((x, i) => ({
        id: i + 1,
        designation: x.designation,
        name: x.name,
        pno: x.pno,
        contact: x.contact,
        remark: x.remark,
        availability: x.availability,
      }))
      updateRows(data);
      updateFilterData(data);
    });
  return updateLoading(true);
}

async function updateAttendance(uri,station,data, updateStatus) {
  //console.log(data);
  fetch(uri+`/users/attendance?station=`+station, {
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
  if (msg == "error") {
    setTimeout(() => {
      updateStatus("");
    }, 5000);
    return msg;
  } else {
    return <Redirect to="/duty/platform" />;
  }
}

export default function Attendence(props) {

  
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
  const [filterData,updateFilterData] = useState([])
  const [loading, updateLoading] = useState(false);
  const [selected, updateSelected] = useState([]);
  useEffect(() => {
    console.log(props.uri)
    console.log(props.station)
    getData(props.uri,props.station,updateRows, updateLoading, updateFilterData);
    props.nav(false);
    props.prev("/dashboard");
    
  }, []);


  function updateSelection(row){
    //console.log(row)
    const select = new Set(selected)
    if(row.isSelected==true) select.add(row.data.id)
    else select.delete(row.data.id)
    console.log(select)
    return updateSelected([...select])
  }

  return (
    <>
      {loading ? (
        setLoadingInterval(updateLoading, rows)
      ) : (
        <>
        {/* <div style={{ height: "75%", width: "100%", marginTop: "6%" }}>
          <SearchBar rows={rows} updateRows={updateFilterData}/>
          </div> */}
          <div style={{ height: "80%", width: "100%", marginTop: "6%" }}>
          <SearchBar rows={rows} updateRows={updateFilterData}/>
            <DataGrid
              rows={filterData}
              disableSelectionOnClick="true"
              columns={columns}
              pageSize={10}
              checkboxSelection
              checked="true"
              selection={selected}
              onSelectionChange={(x) => updateSelected(x.rowIds)}
              autoPageSize="True"
            />
          </div>
          <div style={{marginTop: "5%"}}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginTop: "2%",marginBottom: "2%" }}
              onClick={() =>
                updateAttendance(
                  props.uri,props.station,
                  selected.map((x) => rows[x - 1]["pno"]),
                  updateStatus
                )
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
