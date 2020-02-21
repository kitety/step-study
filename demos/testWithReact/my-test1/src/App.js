import React from "react";
import Header from "./components/header";
import Headline from "./components/headline";
import SharedButton from "./components/button";
import ListItem from "./components/listItem";
import { connect } from "react-redux";
import { fetchProps } from "./actions/index";
import "./app.css";

const tempArr = [
  {
    fName: "L",
    lName: "B",
    age: 24,
    onlineStatus: false
  }
];
function App(props) {
  const { fetchProps, posts } = props;
  console.log(props);

  const configButton = {
    buttonText: "Get Posts",
    emitEvent: fetchProps
  };
  return (
    <div className="App">
      <Header />
      <section className="main">
        <Headline
          header="Posts"
          desc="Click the button to render posts!"
          tempArr={tempArr}
        />
        <SharedButton {...configButton} />
        {posts.map(item => (
          <ListItem title={item.title} desc={item.body} key={item.id} />
        ))}
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { fetchProps })(App);
