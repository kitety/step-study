import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Func from "./components/Func";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Form name={"kitety"} />
      <Func name={"kitety"} />
    </div>
  );
};

export default App;
