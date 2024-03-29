import React, { useState, useEffect } from "react";
import Card from "./card";
import { Button } from "@material-ui/core";

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
function handleClick(updateStatus,uri,station) {
  fetch(uri+`/jobs/generate/finalPdf?station=`+station)
    .then((res) => res.arrayBuffer())
    .then((doc) => {
      download(`Daily_${(new Date()).toLocaleDateString()}.pdf`, doc);
      updateStatus("")
      
    });
  updateStatus("Loading....");
}

function Dashboard(props) {
  useEffect(() => {
    props.nav(false);
  }, []);
 
  const [status, updateStatus] = useState("");
  return (
    <>
      <div style={{ marginTop: "10%" }}>
        
        {status ? <span>{status}</span> : ""}
        <Button
          color="primary"
          size="large"
          variant="contained"
          style={{ marginTop: "20px" }} 
          onClick={() => handleClick(updateStatus,props.uri,props.station)}
        >Print Daily Pdf</Button>
        <br></br>
        <Button
          color="primary"
          size="large"
          variant="contained"
          style={{ marginTop: "20px" }} 
          
        >Print 7 Day PDF</Button>
      </div>
    </>
  );
}

export default Dashboard;
