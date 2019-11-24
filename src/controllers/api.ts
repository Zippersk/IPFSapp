"use strict";

import { Response, Request, NextFunction } from "express";
import DAG from "../Common/IPFS/DAG";

/**
 * GET /api/test
 * List of API examples.
 */
export const getTest = (req: Request, res: Response) => {
    res.json({a: 5});
};

console.log("aa");

export const getTx = async (req: Request, res: Response) => {
    res.json(await DAG.GetAsync(req.params.tx, null));

};
  