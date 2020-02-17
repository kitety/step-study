import React from "react";
import Header from "./components/header";
import Headline from "./components/headline";
import "./app.css";

const tempArr = [
  {
    fName: "L",
    lName: "B",
    age: 24,
    onlineStatus: false
  }
];
function App() {
  return (
    <div className="App">
      <Header />
      <section className="main">
        <Headline
          header="Posts"
          desc="Click the button to render posts!"
          tempArr={tempArr}
        />
      </section>
    </div>
  );
}

export default App;
