import express from 'express';
import identitiesRoute from './identities';
import chaincodesRoute from './chaincodes';

/**
 * Base route
 */
const router = express.Router();

router.use('/identities', identitiesRoute);
router.use('/chaincodes', chaincodesRoute);

export default router;
