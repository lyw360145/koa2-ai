const Koa = require('koa');
const OpenAI = require('openai');
const http = require('http');
const aiRouters = require('./routes/aiRoutes');
const createWebSocketServer = require('./websocket');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = new Koa();

app.use(loggerMiddleware);
// Koa 中间件
app.use(aiRouters.routes());

// 创建 HTTP 服务器
const server = http.createServer(app.callback());

createWebSocketServer(server);


// 启动服务器
server.listen(3000, () => {
  console.log('[demo] start-quick is starting at port 3000');
});