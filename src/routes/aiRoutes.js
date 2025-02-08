const Router = require('@koa/router');
const userController = require('../controllers/aiController');

const router = new Router();
router.get('/ai/ds', userController.AiDeepSeek);
router.get('/ai/ryfRecommendTool', userController.AiRyfTool);
module.exports = router;