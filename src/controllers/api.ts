"use strict";

import { Response, Request, NextFunction } from "express";
import DAG from "../Common/IPFS/DAG";
import IPFSconnector from "../Common/IPFS/IPFSConnector";


export const getStats = async (req: Request, res: Response) => {
    const node = (await IPFSconnector.getInstanceAsync()).node;
    const stats = {};
    stats["bitswap"] = await node.bitswap.stat();
    stats["bandwidth"] = await node.stats.bw();
    stats["repo"] = await node.stats.repo({human: true});
    stats["peers"] = [];
    for (const peer of await node.swarm.peers()) {
        peer["bandwidth"] = await node.stats.bw({peer: peer.peer.id});
        stats["peers"].push(peer);
    } 
    res.json(stats);
};

export const getByHash = async (req: Request, res: Response) => {
    res.json(await DAG.GetByHashAsync(req.params.hash, req.params[0]));
};

export const get = async (req: Request, res: Response) => {
    res.json(await DAG.Get(req.params.cid, req.params.path));
};
