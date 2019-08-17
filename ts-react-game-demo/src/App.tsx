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
type ONGOING_GAME = -1;
const ONGOING_GAME = -1;
interface IState {
  board: Player[];
  nextPlayerTurn: Player;
  gameIsWin: Player | ONGOING_GAME;
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
    ],
    nextPlayerTurn: Player.One,
    gameIsWin: ONGOING_GAME
  };
  public checkIfGameOver(board: Player[]) {
    if (
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[0] !== Player.None
    ) {
      return board[0];
    } else if (
      board[3] === board[4] &&
      board[4] === board[5] &&
      board[3] !== Player.None
    ) {
      return board[3];
    } else if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[6] !== Player.None
    ) {
      return board[6];
    } else if (
      board[0] === board[3] &&
      board[3] === board[6] &&
      board[0] !== Player.None
    ) {
      return board[0];
    } else if (
      board[1] === board[4] &&
      board[4] === board[7] &&
      board[1] !== Player.None
    ) {
      return board[1];
    } else if (
      board[2] === board[5] &&
      board[5] === board[8] &&
      board[2] !== Player.None
    ) {
      return board[0];
    } else if (
      board[0] === board[4] &&
      board[4] === board[8] &&
      board[0] !== Player.None
    ) {
      return board[0];
    } else if (
      board[2] === board[4] &&
      board[4] === board[6] &&
      board[2] !== Player.None
    ) {
      return board[2];
    }
    return ONGOING_GAME;
  }
  public handleCellClick = (index: number) => {
    const { board, nextPlayerTurn, gameIsWin } = this.state;
    const newBoard = board.slice();
    if (gameIsWin !== ONGOING_GAME || newBoard[index] !== Player.None) return;
    newBoard[index] = nextPlayerTurn;
    let newGameIsWin = this.checkIfGameOver(newBoard);
    this.setState({
      board: newBoard,
      nextPlayerTurn: 3 - nextPlayerTurn,
      gameIsWin: newGameIsWin
    });
  };
  public renderCell = (index: number) => {
    const { board } = this.state;
    return (
      <div
        className="cell"
        key={index}
        onClick={() => this.handleCellClick(index)}
        data-player={board[index]}
      />
    );
  };
  public renderStatus = () => {
    const { board, nextPlayerTurn, gameIsWin } = this.state;
    const winText =
      gameIsWin !== ONGOING_GAME
        ? `Player ${gameIsWin} won`
        : "The Game Is Going";
    return (
      <div style={{ marginTop: "30px" }}>
        {"Player One is Green"}
        <br />
        {"Player One is Red"}
        <br />
        {winText}
      </div>
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
        {this.renderStatus()}
      </div>
    );
  }
}

export default App;
