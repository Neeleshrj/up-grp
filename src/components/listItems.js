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
        to="/UpdateList"
        onClick={() => {
          props.title("अपडेट");
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
        to="/addemp"
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
        to="/addtrain"
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
        to="/addDuty"
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
        to="/delete"
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
      <Link
        to="/attendence"
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
