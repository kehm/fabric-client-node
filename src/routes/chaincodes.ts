import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import invoke from '../fabric/invoke';
import query from '../fabric/query';
import isValid from '../middleware/is-valid';
import { logError, logInfo } from '../utils/logger';

const router = express.Router();

/**
 * Invoke chaincode function
 */
router.post('/invoke', [
    body('identity').isString().isLength({ min: 1 }),
    body('channel').isString().isLength({ min: 1 }),
    body('chaincode').isString().isLength({ min: 1 }),
    body('func').isString().isLength({ min: 1 }),
    body('args').isArray(),
    body('transient').isJSON().optional(),
], isValid, async (req: Request, res: Response) => {
    try {
        logInfo('Invoking chaincode function...');
        const response = await invoke(
            req.body.identity,
            req.body.channel,
            req.body.chaincode,
            req.body.func,
            req.body.transient,
            ...req.body.args,
        );
        logInfo('Successfully invoked chaincode function');
        res.status(200).json(response);
    } catch (err: unknown) {
        logError('Could not invoke chaincode function', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

/**
 * Query the blockchain
 */
router.post('/query', [
    body('identity').isString().isLength({ min: 1 }),
    body('channel').isString().isLength({ min: 1 }),
    body('chaincode').isString().isLength({ min: 1 }),
    body('func').isString().isLength({ min: 1 }),
    body('args').isArray(),
], isValid, async (req: Request, res: Response) => {
    try {
        logInfo('Executing chaincode query...');
        const response = await query(
            req.body.identity,
            req.body.channel,
            req.body.chaincode,
            req.body.func,
            req.body.args,
        );
        logInfo('Successfully executed chaincode query');
        res.status(200).json(response);
    } catch (err: unknown) {
        logError('Could not query the blockchain', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

export default router;
