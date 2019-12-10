import Header from "./Header";
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #ddd"
};
const WithLayout = props => {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.content}
    </div>
  );
};
export default WithLayout;
