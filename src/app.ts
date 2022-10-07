import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { CommonError } from "./exception/common.error";
import routes from "./routes";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.forEach((route) => {
  app[route.method](route.path, ...(route.middleware || []), (req, res) => {
    route
      .handler(req)
      .then((data) => res.json(data))
      .catch((e: CommonError) => {
        console.log(e);
        res.status(e.status || 400).json({ message: e.message });
      });
  });
});
export default app;
