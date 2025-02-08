const WebSocket = require('ws');
const OpenAI = require('openai');

function createWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-92c0c06d946f4015848df87b1dc2b733',
      });
    wss.on('connection', (ws) => {


        ws.on('message', async (message) => {
          console.log(message.toString(),'xxx')
          if(message.toString() === 'ping'){
              return;
          }
          ws.send('ai生成中...');
          try {
            const completion = await openai.chat.completions.create({
              messages: [{ role: "system", content: `"${message}"` }],
              model: "deepseek-chat",
            });
            const regex = /\[(.*?)\]/;
            const match = completion.choices[0].message.content.match(regex);
      
            if (completion.choices[0].message.content) {
              ws.send(`Keywords: ${completion.choices[0].message.content}`);
            } else {
              ws.send('Failed to extract keywords');
            }
          } catch (error) {
            console.error('OpenAI API error:', error);
            ws.send('Internal Server Error');
          }
        });
      
        ws.on('close', () => {
          console.log('Client disconnected');
        });
      });

}
module.exports = createWebSocketServer;