import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import os from "os";
import * as homeController from "./controllers/home";
import * as apiController from "./controllers/api";
import ipfsDefaultConfig from "./Common/IPFS/ipfsDefaultConfig";
import IPFSconnector from "./Common/IPFS/IPFSConnector";
import logger from "./Common/logger";


// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);


/**
 * API routes.
 */
app.get("/api/get/:cid/:path*?", apiController.get); 
app.get("/api/:hash/*", apiController.getByHash); 
app.get("/api/stats", apiController.getStats); 



const config = ipfsDefaultConfig;
    config.repo = os.homedir() + "/.ipfsExplorer";
    config.config = {
        Addresses: {
          Swarm: [
            "/ip4/0.0.0.0/tcp/15012",
            "/ip4/127.0.0.1/tcp/15013/ws"
          ],
          API: "/ip4/127.0.0.1/tcp/6012",
          Gateway: "/ip4/127.0.0.1/tcp/9192"
        }
      };

IPFSconnector.setConfig(config);
IPFSconnector.getInstanceAsync().then(() => logger.info("IPFS started"));


export default app;
