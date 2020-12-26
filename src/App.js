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
  var [login, setlogin] = React.useState(false);

  const [station, updateStation] = React.useState("");
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