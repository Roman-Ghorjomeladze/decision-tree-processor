import express from "express";
import helmet from "helmet";

import routes from "./routes";

const app = express();

app.use(helmet()); // Just in case, it's a good security practice to use helmet
app.use(express.json({ limit: "100kb" })); // Avoid processing too big request body. It will affect app performance
/**
 * In real project we would have some Auth middleware declared here.
 * It would omit unauthorized access to the app functionality.
 */
app.use("/api", routes);

export default app;
