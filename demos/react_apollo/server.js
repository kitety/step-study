const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors')
const path = require('path')

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
// 静态文件
app.use(express.static('public'))
// 别的路径
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public'), 'index.html')
})
const PORT = process.env.port || 5000
app.listen(PORT, () => { console.log('server is running!') })
