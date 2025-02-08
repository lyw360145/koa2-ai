
const OpenAI = require('openai');

exports.AiDeepSeek = async (ctx) => {
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-92c0c06d946f4015848df87b1dc2b733',
      });
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: `"工作窗口变成“收银台”，湖南一贪官将个人收款码贴到政府办事大厅，开出3000多张假票",找出这段话关键词,并且以数组形式输出,只输出关键词` }],
          model: "deepseek-chat",
        });
    
        const regex = /\[(.*?)\]/;
        const match = completion.choices[0].message.content.match(regex);
    
        if (match) {
          ctx.body = match[0];
        } else {
          ctx.status = 500;
          ctx.body = 'Failed to extract keywords';
        }
      } catch (error) {
        console.error('OpenAI API error:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
      }
};
