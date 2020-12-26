import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(uri, station, absent, setStatus) {
  if (absent.lenght) {
    fetch(uri + `/jobs/update/assignment?station=` + station, {
      method: "POST",
      body: JSON.stringify({ absent }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus(data.status);
      })
      .catch((e) => {
        setStatus("error");
      });
  } else {
    setStatus("Enter pno.");
  }
}

function setStatusInterval(msg, updateStatus) {
  setTimeout(() => {
    updateStatus("");
  }, 5000);
  return msg;
}

function RemoveEmp(props) {
  useEffect(() => {
    props.nav(false);
  }, []);
  const [pno, updatePno] = useState("");

  const [status, updateStatus] = useState("");
  const [absent, updateAbsent] = useState([]);
  return (
    <div style={{ marginTop: "10%", width: "100%" }}>
      <Typography display="block">
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="सिपाही पीएनओ"
          variant="outlined"
          onChange={(e) => updatePno(e.target.value)}
        />
        <br></br>

        <Button
          size="large"
          variant="contained"
          style={{ marginTop: "20px", width: "20%" }}
          color="primary"
          onClick={() => {
            return pno ? updateAbsent([...absent, pno]) : "";
          }}
        >
          पी.एन.ओ. जोड़
        </Button>
        <br />
        {absent.length ? (
          <ul>
            {absent.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
        <Button
          size="large"
          variant="contained"
          style={{ marginTop: "20px", width: "20%" }}
          color="primary"
          onClick={() =>
            handleSubmit(props.uri, props.station, absent, updateStatus)
          }
        >
          सिपाही बदलो
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
      </Typography>
    </div>
  );
}
export default RemoveEmp;
