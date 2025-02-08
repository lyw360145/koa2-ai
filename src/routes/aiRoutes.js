const Router = require('@koa/router');
const userController = require('../controllers/userController');

const router = new Router();
router.get('/ai/ds', userController.AiDeepSeek);

module.exports = router;