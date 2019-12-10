import Layout from "./components/Layout";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello next.js" />
        <PostLink title="learn next.js" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
}
