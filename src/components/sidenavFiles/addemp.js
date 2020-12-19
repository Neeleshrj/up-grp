import React, { useState,useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(e, data, setStatus) {
  e.preventDefault();
  //console.log(data);
  if (Object.keys(data).length) {
    fetch(`https://uppolice-app.herokuapp.com/users/add`, {
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

function AddEmp(props) {
  useEffect(() => {
    props.nav(false)
  }, [])
  const [name, updateName] = useState("");
  const [designation, updateDesignaton] = useState("");
  const [pno, updatePno] = useState("");
  const [contact, updateContact] = useState("");
  const [remark, updateRemark] = useState("");
  const [status, updateStatus] = useState("");
  return (
    <div>
      <form
        style={{ marginTop: "15%" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) =>
          handleSubmit(
            e,
            { name, designation, pno, contact, remark },
            updateStatus
          )
        }
      >
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="नाम"
          variant="outlined"
          onChange={(e) => updateName(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="पीएनओ"
          variant="outlined"
          onChange={(e) => updatePno(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="पद"
          variant="outlined"
          onChange={(e) => updateDesignaton(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="मोबइल नं0"
          variant="outlined"
          onChange={(e) => updateContact(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="अन्य विवरण"
          variant="outlined"
          onChange={(e) => updateRemark(e.target.value)}
        />
        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
        >
          सिपाही जोड़ें
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
