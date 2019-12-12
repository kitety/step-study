import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
const Post = props => {
  return (
    <Layout>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
      <img src={props.show.image.medium} />
    </Layout>
  );
};
Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  console.log(`111111Fetched show: ${show.name}`);
  return { show };
};
export default Post;
