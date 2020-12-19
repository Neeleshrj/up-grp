import React, { useState,useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(e, data, setStatus) {
  e.preventDefault();
  //console.log(data);
  if (Object.keys(data).length) {
    fetch(`https://uppolice-app.herokuapp.com/jobs/add/AreaDuty`, {
      method: "POST",
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

function AddDuty(props) {
  useEffect(() => {
    props.nav(false);
  }, []);
  const [location, updateName] = useState("");

  const [status, updateStatus] = useState("");
  return (
    <div>
      <form
        style={{ marginTop: "15%" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e, { location }, updateStatus)}
      >
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="
          कार्य नाम"
          variant="outlined"
          onChange={(e) => updateName(e.target.value)}
        />
        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
        >
          जोड़ें
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
export default AddDuty;
