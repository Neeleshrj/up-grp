import React, { useState,useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

function handleSubmit(uri,station,e, data, setStatus) {
  e.preventDefault();
  //console.log(data);
  if (data) {
    fetch(uri+`/jobs/add/TrainDuty?station=`+station, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setStatus(data.status);
      });
  }
}

function setStatusInterval(msg, updateStatus) {
  setTimeout(() => {
    updateStatus("");
  }, 5000);
  return msg;
}

function AddTrain(props) {
  useEffect(() => {
    props.nav(false)
  }, [])
  const [train_name, updateName] = useState("");
  const [train_no, updateCurrent] = useState("");
  const [return_train, updatereturn] = useState("");
  const [return_train_number, updateReturnNo] = useState("");
  const [kahase, updatekahase] = useState("");
  const [kahatak, updatekahatak] = useState("");
  const [anekasamay, updateane] = useState("");
  const [janekasamay, updatejane] = useState("");
  const [status, updateStatus] = useState("");
  return (
    <div>
      <form
        style={{ marginTop: "6%" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) =>
          handleSubmit(props.uri,props.station,
            e,
            {
              train_name,
              train_no,
              return_train,
              return_train_number,
              kahase,
              kahatak,
              anekasamay,
              janekasamay,
            },
            updateStatus
          )
        }
      >
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="ट्रेन का नाम"
          variant="outlined"
          onChange={(e) => updateName(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="ट्रेन नं0"
          variant="outlined"
          onChange={(e) => updateCurrent(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="वापसी ट्रेन का नाम"
          variant="outlined"
          onChange={(e) => updatereturn(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="

          वापसी ट्रेन नं0"
          variant="outlined"
          onChange={(e) => updateReturnNo(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="
          
          कहां से "
          variant="outlined"
          onChange={(e) => updatekahase(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="
          
          कहां तक"
          variant="outlined"
          onChange={(e) => updatekahatak(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="
          
          जाने का समय "
          variant="outlined"
          onChange={(e) => updatejane(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="standard-basic"
          style={{ width: "30%" }}
          label="
          
          वापसी का समय/स्टेशन"
          variant="outlined"
          onChange={(e) => updateane(e.target.value)}
        />

        <br></br>
        <Button
          type="submit"
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
        >
          ट्रेन जोड़ें
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
export default AddTrain;
