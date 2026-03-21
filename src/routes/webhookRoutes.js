import express from 'express';
import webhookController from '../controllers/webhookController.js';

const router = express.Router();

router.get('/', webhookController.verifyWebhook);
router.post('/', webhookController.handleIncoming);

export default router;