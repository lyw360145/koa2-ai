module.exports = async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
};