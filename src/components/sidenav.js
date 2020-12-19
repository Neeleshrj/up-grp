import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems, secondaryListItems } from "./listItems";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AddEmp from "./sidenavFiles/addemp";
import AddTrain from "./sidenavFiles/addtrain";
import Attendence from "./duties/attendence";
import Attendencere from "./duties/attendancere";
import Duties from "./duties/duties";
import Duties2 from "./duties/duties2";
import Duties3 from "./duties/duties3";
import Loading from "./loadingScreen";
import Delete from "./sidenavFiles/delete";
import AddAreaDuty from "./sidenavFiles/addAreaDuty";
import AssignedJobs from "./assignedjobTable";
import DashboardPage from "./sidenavFiles/dashboard";
import ArrowBack from "@material-ui/icons/ArrowBack";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const [title, updateTitle] = useState("डैशबोर्ड");
  const [prevPage, updatePrev] = useState("/");
  const [redirect, updateRedirect] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const navigate = () => {
    return <Redirect to={prevPage} />
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            color="secondry"
            className={classes.button}
            startIcon={<ArrowBack />}
            onClick={() => updateRedirect(true)}
          >
            पीछे की ओर
          </Button>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems title={updateTitle} prev={updatePrev} />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/dashboard">
            <DashboardPage nav={updateRedirect}/>
          </Route>
          <Route path="/addemp">
            <AddEmp nav={updateRedirect}/>
          </Route>
          <Route path="/addtrain">
            <AddTrain nav={updateRedirect}/>
          </Route>
          <Route path="/duties3">
            <Duties3 nav={updateRedirect} prev={updatePrev}/>
          </Route>
          <Route path="/delete">
            <Delete nav={updateRedirect}/>
          </Route>
          <Route path="/duties">
            <Duties nav={updateRedirect} prev={updatePrev}/>
          </Route>
          <Route path="/duties2">
            <Duties2 nav={updateRedirect} prev={updatePrev}/>
          </Route>
          <Route path="/attendence">
            <Attendence nav={updateRedirect} prev={updatePrev}/>
          </Route>
          <Route path="/addDuty">
            <AddAreaDuty nav={updateRedirect} prev={updatePrev}/>
          </Route>
          <Route path="/assignedJobs" >
            <AssignedJobs nav={updateRedirect} prev={updatePrev}/>
          </Route>
        </Switch>
      </main>
      {redirect ? navigate() : ""}
    </div>
  );
}
