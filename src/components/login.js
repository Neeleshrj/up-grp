import React, { useState } from "react";
import image from "../img/Upplogo.png";
import { TextField, Button } from "@material-ui/core";

function Login(props) {
  const { setlogin } = props;
  const [password, updatePassword] = useState("");
  return (
    <div>
      <img alt="police" src={image}></img>
      <form style={{ marginTop: "6vh" }} noValidate autoComplete="off">
        <Button
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
          onClick={() => setlogin()}
        >
          लॉग इन करें
        </Button>
      </form>
    </div>
  );
}
export default Login;
