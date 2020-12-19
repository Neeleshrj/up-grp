import React, { useState, useEffect } from "react";
import Card from "./card";

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
function handleClick(updateStatus) {
  fetch(`https://uppolice-app.herokuapp.com/jobs/generate/finalPdf`)
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
        <button onClick={() => handleClick(updateStatus)}>Print Pdf</button>
      </div>
    </>
  );
}

export default Dashboard;
