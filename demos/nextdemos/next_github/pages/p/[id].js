import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Layout from "../components/Layout";
export default () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <div className="markdown">
        <Markdown
          source={`
# Open-rest

Standard restful api server, Base on restify and sequelize

[![Build status](https://api.travis-ci.org/open-node/open-rest.svg?branch=master)](https://travis-ci.org/open-node/open-rest)
[![codecov](https://codecov.io/gh/open-node/open-rest/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/open-rest)

## Node version
<pre> >= 6 </pre>
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: "Arial";
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};
