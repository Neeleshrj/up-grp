import React, { useState,useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(uri,station,e, data, setStatus) {
  e.preventDefault();
  //console.log(data);
  if (Object.keys(data).length) {
    fetch(uri+`/jobs/add/PlatformDuty?station=`+station, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
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

function AddEmp(props) {
  useEffect(() => {
    props.nav(false)
  }, [])
  const [platform, updatePlatform] = useState("");
  const [status, updateStatus] = useState("");
  return (
    <div>
      <form
        style={{ marginTop: "15%" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) =>
          handleSubmit(props.uri,props.station,
            e,
            {platform_no:platform} ,
            updateStatus
          )
        }
      >
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="प्लेटफ़ॉर्म संख्या"
          variant="outlined"
          onChange={(e) => updatePlatform(e.target.value)}
        />
        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
        >
          प्लेटफ़ॉर्म जोड़ें
        </Button>
      </form>
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
  );
}
export default AddEmp;
