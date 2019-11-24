import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";


// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";


// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
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
 * API examples routes.
 */
app.get("/api", apiController.getApi);
app.get("/api/test", apiController.getTest);



export default app;
