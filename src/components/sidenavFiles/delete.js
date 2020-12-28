import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(uri,station,e, type, data, setStatus) {
  if (Object.keys(data).length) {
    fetch(uri+`/jobs/delete/${type}?station=`+station, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus(data.status);
      });
  } else {
    setStatus("error");
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
  const [train_no, updateTrain] = useState("");
  const [location, updateArea] = useState("");
  const [status, updateStatus] = useState("");
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
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "20px", width: "20%" }}
          color="primary"
          onClick={(e) => handleSubmit(props.uri,props.station,e, "User", { pno }, updateStatus)}
        >
          सिपाही मिटाएँ
        </Button>
        <br></br>

        <TextField
          id="standard-basic"
          style={{ marginTop: "20px", width: "30%" }}
          label="ट्रेन नं0"
          variant="outlined"
          onChange={(e) => updateTrain(e.target.value)}
        />
        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "20px", width: "20%" }}
          color="primary"
          onClick={(e) =>
            handleSubmit(props.uri,props.station,e, "TrainDuty", { train_no }, updateStatus)
          }
        >
          ट्रेन मिटाएँ
        </Button>
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ marginTop: "20px", width: "30%" }}
          label="क्षेत्रीय ड्यूटी नाम"
          variant="outlined"
          onChange={(e) => updateArea(e.target.value)}
        />
        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "20px", width: "20%" }}
          color="primary"
          onClick={(e) =>
            handleSubmit(props.uri,props.station,e, "AreaDuty", { location }, updateStatus)
          }
        >
          क्षेत्रीय ड्यूटी मिटाएँ
        </Button>
        <br></br>
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
