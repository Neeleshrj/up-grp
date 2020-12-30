import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TrainIcon from "@material-ui/icons/Train";
import TocIcon from "@material-ui/icons/Toc";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import image from "../img/Upplogo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Sidenav from "./sidenav";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import UpdateIcon from "@material-ui/icons/Update";
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
//const [title, updateTitle] = useState("");

export const MainListItems = (props) => {
  return (
    <div>
      <Link to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="डैशबोर्ड" />
        </ListItem>
      </Link>
      <Link
        to="/duty/assigned/update"
        onClick={() => {
          props.title("सूची अपडेट");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          <ListItemText primary="अपडेट" />
        </ListItem>
      </Link>
      <Link
        to="/user/add"
        onClick={() => {
          props.title("सिपाही जोड़ें");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="सिपाही जोड़ें" />
        </ListItem>
      </Link>
      <Link
        to="/duty/train/add"
        onClick={() => {
          props.title("ट्रेन जोड़ें");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <TrainIcon />
          </ListItemIcon>
          <ListItemText primary="ट्रेन जोड़ें" />
        </ListItem>
      </Link>
      <Link
        to="/duty/add"
        onClick={() => {
          props.title("क्षेत्रीय ड्यूटी");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <ThreeSixtyIcon />
          </ListItemIcon>
          <ListItemText primary="क्षेत्रीय ड्यूटी" />
        </ListItem>
      </Link>
      <Link
        to="/duty/delete"
        onClick={() => {
          props.title("मिटाएँ");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary="मिटाएँ" />
        </ListItem>
      </Link>
      <Link to="/duty/platform/add" onClick={() => {
        props.title("प्लेटफ़ॉर्म जोड़ें");
        props.prev("/dashboard");
      }}>
        <ListItem button>
          <ListItemIcon>
            <TransferWithinAStationIcon />
          </ListItemIcon>
          <ListItemText primary="प्लेटफ़ॉर्म जोड़ें" />
        </ListItem>
      </Link>
      <Link
        to="/user/attendence"
        onClick={() => {
          props.title("सूची बनाएं");
          props.prev("/dashboard");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <TocIcon />
          </ListItemIcon>
          <ListItemText
            primary="
        सूची बनाएं"
          />
        </ListItem>
      </Link>

      <Link
        to="/user/attendance/update"
        onClick={() => {
          props.title("अपडेट उपस्थिति");
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="अपडेट उपस्थिति"
          />
        </ListItem>
      </Link>
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <img
      style={{ width: "65%", marginTop: "30%" }}
      alt="police"
      src={image}
    ></img>
  </div>
);
