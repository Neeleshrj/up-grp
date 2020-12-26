import React, { useState } from "react";
import image from "../img/Upplogo.png";
import { TextField, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

function Login(props) {
  const { setlogin, updateStation } = props;
  const [input, updateInput] = useState("");

  return (
    <div>
      <img alt="police" src={image}></img>
      <form style={{ marginTop: "6vh" }} noValidate autoComplete="off">
        <InputLabel htmlFor="outlined-age-native-simple">Station</InputLabel>
        <Select
          native
          label="Station"
          onChange={(x) => {
            console.log(x.target.value);

            updateInput(x.target.value);
          }}
          inputProps={{
            name: "Station",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={"sangam"}>प्रयागराज</option>
          <option value={"varanasi"}>वाराणसी</option>
          <option value={"kanpur"}>कानपुर</option>
        </Select>
        <br></br>
        <Button
          size="large"
          variant="contained"
          style={{ marginTop: "6vh", width: "20%" }}
          color="primary"
          onClick={() => {
            return input ? (setlogin(),
            updateStation(input)):""
          }}
        >
          लॉग इन करें
        </Button>
      </form>
    </div>
  );
}
export default Login;
