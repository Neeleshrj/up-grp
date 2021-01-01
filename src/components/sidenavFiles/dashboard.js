import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AutoSizer, COL_REORDER_DRAG_ENTER } from "@material-ui/data-grid";

const useStyles = makeStyles({
  root: {
    width: '30%',
    margin: "0 auto",
    marginTop: 200,
    fontSize: 22,
    height: '20%',
  },
  button: {
    alignItems: "center",
    textAlign: "center",
    margin: "0 auto"
  }
});


function download(filename, text) {
  // Set up the link
  console.log(text);

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
function handleClick(updateStatus,uri,station,type) {
  fetch(uri+`/jobs/generate/finalPdf?type=${type}&&station=`+station)
    .then((res) => res.arrayBuffer())
    .then((doc) => {
      download(`${type}_${(new Date()).toLocaleDateString()}.pdf`, doc);
      updateStatus("")
      
    });
  updateStatus("Loading....");
}
function handleClickSeven(updateStatus,uri,station) {
  fetch(uri+`/jobs/generate/pdf?station=`+station)
    .then((res) => res.arrayBuffer())
    .then((doc) => {
      download(`7Days_${(new Date()).toLocaleDateString()}.pdf`, doc);
      updateStatus("")
      
    });
  updateStatus("Loading....");
}


function Dashboard(props) {
  useEffect(() => {
    props.nav(false);
  }, []);

  const classes = useStyles();
 
  const [status, updateStatus] = useState("");
  return (
    <>
    <div style={{display: "flex"}}>

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
          दिन पीडीएफ प्रिंट 
          </Typography>
          <br></br>
        </CardContent>
        <CardActions>
        <Button
            className={classes.button}
            color="primary"
            size="large"
            variant="contained"
            style={{ marginTop: "20px" }} 
            onClick={() => handleClick(updateStatus,props.uri,props.station,"Day")}
          >प्रिंट</Button>
        </CardActions>
      </Card>

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
          साप्ताहिक पीडीएफ प्रिंट
          </Typography>
          <br></br>
        </CardContent>
        <CardActions>
        <Button
            className={classes.button}
            color="primary"
            size="large"
            variant="contained"
            style={{ marginTop: "20px" }} 
            onClick={() => handleClickSeven(updateStatus,props.uri,props.station)}
          >प्रिंट</Button>
        </CardActions>
      </Card>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
          रात पीडीएफ प्रिंट
          </Typography>
          <br></br>
        </CardContent>
        <CardActions>
        <Button
            className={classes.button}
            color="primary"
            size="large"
            variant="contained"
            style={{ marginTop: "20px" }} 
            onClick={() => handleClick(updateStatus,props.uri,props.station,"Night")}
          >प्रिंट</Button>
        </CardActions>
      </Card>
    </div>
    </>
  );
}

export default Dashboard;
