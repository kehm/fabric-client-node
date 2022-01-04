import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import enroll from '../fabric/enroll';
import isValid from '../middleware/is-valid';
import { logError, logInfo } from '../utils/logger';
import env from '../types/env';
import register from '../fabric/register';
import getIdentities from '../utils/get-identities';
import clearDirectory from '../utils/clear-directory';

const router = express.Router();

/**
 * Get names of identities in the file system wallet
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        logInfo('Getting wallet identities...');
        const identities = await getIdentities(env.FabricWalletPath);
        logInfo('Successfully retrieved list of identities in the wallet');
        res.status(200).json(identities);
    } catch (err: unknown) {
        logError('Could not get identities from wallet', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

/**
 * Enroll an identity with the Fabric CA
 */
router.post('/enroll', [
    body('name').isString().isLength({ min: 1 }),
    body('secret').isString().isLength({ min: 1 }),
    body('organization').isString().isLength({ min: 1 }),
], isValid, async (req: Request, res: Response) => {
    try {
        logInfo('Enrolling identity...');
        await enroll(
            req.body.name,
            req.body.secret,
            req.body.organization,
        );
        logInfo(`Successfully enrolled '${req.body.name}' for '${req.body.organization}'`);
        res.sendStatus(200);
    } catch (err: unknown) {
        logError('Could not enroll identity', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

/**
 * Register an identity with the Fabric CA
 */
router.post('/register', [
    body('name').isString().isLength({ min: 1 }),
    body('secret').isString().isLength({ min: 1 }),
    body('role').custom((value) => {
        if (!['client', 'peer', 'orderer', 'admin'].some((element) => element === value)) {
            throw new Error('Invalid value');
        }
        return true;
    }),
    body('organization').isString().isLength({ min: 1 }),
    body('affiliation').isString().isLength({ min: 1 }),
    body('registrar').isString().isLength({ min: 1 }),
], isValid, async (req: Request, res: Response) => {
    try {
        logInfo('Registering identity...');
        await register(
            req.body.name,
            req.body.secret,
            req.body.role,
            req.body.organization,
            req.body.affiliation,
            req.body.registrar,
        );
        logInfo(`Successfully registered '${req.body.name}' for '${req.body.organization}'`);
        res.sendStatus(200);
    } catch (err: unknown) {
        logError('Could not register identity', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

/**
 * Clear identity wallet
 */
router.post('/clear', async (req: Request, res: Response) => {
    try {
        logInfo('Clearing identity wallet...');
        await clearDirectory(env.FabricWalletPath);
        logInfo('Successfully cleared identity wallet');
        res.sendStatus(200);
    } catch (err: unknown) {
        logError('Could not clear identity wallet', err instanceof Error ? err : undefined);
        res.sendStatus(500);
    }
});

export default router;
