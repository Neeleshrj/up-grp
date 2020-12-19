import React, { useState } from "react";
import image from "../img/Upplogo.png";
import Typography from "@material-ui/core/Typography";
import "./loading.css";
export default function Loading(props) {
  return (
    <Typography
      style={{ marginTop: "7%" }}
      component="div"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <img src={image} className="animate" />
      <h4>लोड हो रहा है....</h4>
    </Typography>
  );
}