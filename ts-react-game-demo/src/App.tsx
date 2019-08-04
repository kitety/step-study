import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Form from "./components/Form";
// import Func from "./components/Func";

// 枚举问题
enum Player {
  None = 0,
  One = 1,
  Two = 2
}
interface IState {
  board: Player[];
}
class App extends React.Component<{}, IState> {
  state = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None
    ]
  };
  public handleCellClick = (index: number) => {
    console.log(index);
  };
  public renderCell = (index: number) => {
    return (
      <div
        className="cell"
        key={index}
        onClick={() => this.handleCellClick(index)}
      />
    );
  };
  public renderBoard = () => {
    const { board } = this.state;
    return (
      <div className="board-container">
        {board.map((value, index) => {
          return this.renderCell(index);
        })}
      </div>
    );
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/*
        // 之前的测试
       <Form name={"kitety"} />
       <Func name={"kitety"} />
    */}
        {this.renderBoard()}
      </div>
    );
  }
}

export default App;
