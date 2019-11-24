"use strict";

import { Response, Request, NextFunction } from "express";

/**
 * GET /api/test
 * List of API examples.
 */
export const getTest = (req: Request, res: Response) => {
    res.json({a: 5});
};