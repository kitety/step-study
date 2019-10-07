const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // 图形化工具
    graphiql: true,
  }),
);
const PORT = process.env.port || 4000
app.listen(PORT, () => { console.log('server is running!') })
