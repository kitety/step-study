import Layout from "./components/Layout";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href={`/p/[id]`} as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="Hello next.js" />
        <PostLink id="learn next.js" />
        <PostLink id="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
}
