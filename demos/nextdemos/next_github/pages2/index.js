import Header from "./components/Header";
import Layout from "./components/Layout";
import withLayout from "./components/Layout2";
const Index = () => (
  <div>
    <p>Hello index</p>
  </div>
);
// const Index = () => (
//   <div>
//     <Header />
//     <p>Hello index</p>
//   </div>
// );
export default withLayout(Index);
