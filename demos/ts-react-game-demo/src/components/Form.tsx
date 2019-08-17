import React, { Component } from "react";

interface IProps {
  name: string;
}
interface IState {
  age: number;
  name: string;
  [key: string]: number | string;
}
// 类型别名
type IPropsT = {
  name: string;
};

class Form extends Component<IProps, IState> {
  state = {
    age: 24,
    name: "111"
  };
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value
    }: { name: keyof IState; value: string | number } = e.currentTarget;
    this.setState({ [name]: value });
  };
  public render() {
    return (
      <div>
        <span>
          Form {this.props.name} {this.state.age}
        </span>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="age"
          value={this.state.age}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default Form;
