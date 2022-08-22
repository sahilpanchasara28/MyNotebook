import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Utils/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/Utils/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Utils/Alert";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

export default function App() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {

    window.onbeforeunload = function() {
      localStorage.removeItem("token");
      return undefined;
    };

    window.history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (event) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        showAlert("Logged out successfully !!", "success");
      }
    });
  }, []);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <div>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<About />} />
              <Route
                exact
                path="/home"
                element={<Home showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}
