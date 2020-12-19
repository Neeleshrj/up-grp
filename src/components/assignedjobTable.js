import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./assignedJobs.css";

const useStyles = makeStyles({
  tableFirst: {
    padding: "10px",
    margin: "3%",
  },
  table: {
    width: "100%",
  },
  th: {
    fontWeight: "bold",
    border: "1px solid black",
    textAlign: "left",
    padding: "8px",
  },
  td: {
    border: "1px solid black",
    textAlign: "left",
    padding: "8px",
  },
});

function TrainTable() {
  const classes = useStyles();
  const [trains, updateTrains] = useState([]);
  useEffect(() => {
    fetch(`https://uppolice-app.herokuapp.com/jobs/assigned/TrainDuty`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          updateTrains(data.data.trains);
        }
      });
  }, []);
  return (
    <div style={{ marginTop: "6%" }}>
      <div className={classes.tableFirst}>
        <h5 align="left">
          दैनिक ट्रेन एस्कॉर्ट चार्ट थाना जी.आर.पी. प्रयागराज
        </h5>
        <table border={1} className={classes.table}>
          <thead>
            <tr>
              <th>गाड़ी संख्या</th>
              <th>ट्रेन का नाम</th>
              <th>शस्त्र/उपकरण</th>
              <th>हस्ताक्षर</th>
              <th>नाम</th>
              <th>मोबाइल नंबर</th>
            </tr>
          </thead>

          <tbody className={classes.td}>
            {trains.map((x, i) => (
              <>
                <tr>
                  <td rowspan={x.user.length + 1}>{x.job.train_no}</td>
                  <td rowspan={x.user.length + 1}>{x.job.train_name}</td>
                  <td rowspan={x.user.length + 1}>हैंडसेट</td>
                  <td rowspan={x.user.length + 1}>हस्ताक्षर</td>
                </tr>
                {x.user.map((y, j) => (
                  <tr>
                    <td>{y.name}</td>
                    <td>{y.contact}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlatformTable() {
  const classes = useStyles();

  const [platforms, updatePlatforms] = useState([]);
  useEffect(() => {
    fetch(`https://uppolice-app.herokuapp.com/jobs/assigned/PlatformDuty`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          updatePlatforms(data.data.platforms);
        }
      });
  }, []);
  return (
    <div>
      <div id="table-first">
        <h5 align="left">नाइट प्लेटफॉर्म ड्यूटी जी.आर.पी. प्रयागराज</h5>
        <table border={1} className={classes.table}>
          <thead className={classes.th}>
            <tr>
              <th>ड्यूटी का स्थान</th>
              <th>शस्त्र/उपकरण</th>
              <th>हस्ताक्षर</th>
              <th>नाम</th>
              <th>मोबाइल नंबर</th>
            </tr>
          </thead>

          <tbody>
            {platforms.map((x, i) => (
              <>
                <tr className={classes.td}>
                  <td rowspan={x.user.length + 1}>{x.job.platform_no}</td>
                  <td rowspan={x.user.length + 1}>हैंडसेट</td>
                  <td rowspan={x.user.length + 1}>हस्ताक्षर</td>
                </tr>
                {x.user.map((y, j) => (
                  <tr className={classes.td}>
                    <td>{y.name}</td>
                    <td>{y.contact}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AreaTable() {
  const classes = useStyles();

  const [areas, updateAreas] = useState([]);
  useEffect(() => {
    fetch(`https://uppolice-app.herokuapp.com/jobs/assigned/AreaDuty`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          console.log(data.data);
          updateAreas(data.data.areas);
        }
      });
  }, []);
  return (
    <div>
      <div id="table-first">
        <h5 align="left">क्षेत्र चार्ट थाना जी.आर.पी. प्रयागराज</h5>
        <table border={1} className={classes.table}>
          <thead className={classes.th}>
            <tr>
              <th>ड्यूटी का स्थान</th>
              <th>शस्त्र/उपकरण</th>
              <th>हस्ताक्षर</th>
              <th>नाम</th>
              <th>मोबाइल नंबर</th>
            </tr>
          </thead>

          <tbody>
            {areas.map((x, i) => (
              <>
                <tr className={classes.td}>
                  <td rowspan={x.user.length + 1}>{x.job.location}</td>
                  <td rowspan={x.user.length + 1}>हैंडसेट</td>
                  <td rowspan={x.user.length + 1}>हस्ताक्षर</td>
                </tr>
                {x.user.map((y, j) => (
                  <tr className={classes.td}>
                    <td>{y.name}</td>
                    <td>{y.contact}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function download(filename, text) {
  // Set up the link
  console.log(text);

  // var byteNumbers = new Array(arr.length);
  // for (var i = 0; i < arr.length; i++) {
  //   byteNumbers[i] = arr.charCodeAt(i);
  // }
  // var byteArray = new Uint8Array(byteNumbers);

  var link = document.createElement("a");
  link.setAttribute("target", "_blank");
  if (Blob !== undefined) {
    var blob = new Blob([text], { type: "application/octet-stream" });
    link.setAttribute("href", URL.createObjectURL(blob));
  } else {
    link.setAttribute("href", "data:text/plain," + encodeURIComponent(text));
  }
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function handleClick(updateStatus) {
  fetch(`https://uppolice-app.herokuapp.com/jobs/generate/pdf`)
    .then((res) => res.arrayBuffer())
    .then((doc) => {
      download(`7Day_${(new Date()).toLocaleDateString()}.pdf`, doc);
      updateStatus("")
      // if (doc.status == "success") {
      //   window.open(`https://uppolice-app.herokuapp.com/uploads/${doc.data}.pdf`, "_blank");
      //   updateStatus("");
      // }
    });
  updateStatus("Loading....");
}

function AssignedjobTable(props) {
  const [status, updateStatus] = useState("");
  useEffect(() => {
    props.nav(false);
    props.prev("/duties3");
  }, []);

  return (
    <>
      <TrainTable />
      <PlatformTable />
      <AreaTable />
      {status ? <span>{status}</span> : ""}
      <button
        style={{ margin: "4%", padding: "2%" }}
        onClick={() => handleClick(updateStatus)}
      >
        Generate PDF
      </button>
    </>
  );
}

export default AssignedjobTable;
