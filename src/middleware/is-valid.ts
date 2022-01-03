import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

/**
 * Check if input is valid
 */
const isValid = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else res.status(400).json({ errors: errors.array() });
};

export default isValid;
