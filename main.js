const Koa = require('koa')
const OpenAI = require('openai')
const app = new Koa()


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-92c0c06d946f4015848df87b1dc2b733'
});

app.use(async (ctx) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `"工作窗口变成“收银台”，湖南一贪官将个人收款码贴到政府办事大厅，开出3000多张假票",找出这段话关键词,并且以数组形式输出,只输出关键词` }],
        model: "deepseek-chat",
    });

    // console.log(completion.choices[0].message.content);
    console.log(JSON.stringify(completion) ,'completion.choices[0].message');
    const regex = /\[(.*?)\]/;
    ctx.body = completion.choices[0].message.content.match(regex)[0]
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
