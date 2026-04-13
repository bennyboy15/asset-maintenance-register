import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import v1 from "./routes/v1";
import errorHandler from "./middleware/error-handler";
import morganMiddleware from "./middleware/morgan-middleware";

export const createServer = () => {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morganMiddleware)
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use(cors());

    // EXAMPLE ROUTE TO CHECK SERVER HEALTH
    app.get("/health", (req: Request, res: Response) => {
        res.json({ ok: true, environment: config.env });
    });

    // ROUTER
    app.use("/api/v1", v1);

    // ERROR HANDLER
    app.use(errorHandler);

    return app;
};

const server = createServer();

server.listen(config.port, () => {
    console.log(`Server running @ port:${config.port}`);
})