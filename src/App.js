import "./App.css";
import React from "react";
import SideNav from "./components/sidenav";
import Login from "./components/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  var [login, setlogin] = React.useState(false);
  return (
    <Router>
      <div className="App">
        {login ? (
          <SideNav />
        ) : (
          <Login setlogin={() => setlogin(true)} />
        )}
      </div>
    </Router>
  );
}

export default App;
