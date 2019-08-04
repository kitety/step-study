import * as React from "react";

interface IProps {
  name: string;
}
// 两种方式 其实都是一样的
const Func: React.FunctionComponent<IProps> = ({ name }) => {
  const [myName, setName] = React.useState<string>(name);
  return (
    <div
      onClick={() => {
        setName("new Myname");
      }}
    >
      Func {myName}
    </div>
  );
};
// const Func: React.SFC<IProps> = ({ name }) => {
//   // const [name, setName] = React.useState(props.name);
//   return <div>Func {name}</div>;
// };

// const Func = ({ name }: IProps) => {
//   // const [name, setName] = React.useState(props.name);
//   return <div>Func {name}</div>;
// };
export default Func;
