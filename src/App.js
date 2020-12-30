import "./App.css";
import React from "react";
import SideNav from "./components/sidenav";
import Login from "./components/login";
import { Station } from "./contextStation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  const initialLogin = window.localStorage.getItem('login')?window.localStorage.getItem('login'):""
  const initialStation = window.localStorage.getItem('station')?window.localStorage.getItem('station'):""
  
  const [login, setlogin] = React.useState(initialLogin);
  const [station, updateStation] = React.useState(initialStation);
  return (
    <Router>
      <div className="App">
        {login ? (
          <SideNav station={station}/>
        ) : (
          <Login
            updateStation={(x) => updateStation(x)}
            setlogin={() => setlogin(true)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;


// {
//   "name": "@electron-forge/maker-squirrel",
//   "config": {
//     "name": "police"
//   }
// },