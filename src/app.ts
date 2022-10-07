import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import PrometheusClient from "prom-client";
import swaggerUi from "swagger-ui-express";
import { CommonError } from "./exception/common.error";
import { prisma } from "./models";
import routes from "./routes";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan(':method :status :url "HTTP/:http-version"'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize Prometheus Client
const PrometheusRegister = new PrometheusClient.Registry();
PrometheusRegister.setDefaultLabels({
  app: "StakeFish Challenge",
});
PrometheusClient.collectDefaultMetrics({ register: PrometheusRegister });

const httpRequestDurationMicroseconds = new PrometheusClient.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["route"],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});
PrometheusRegister.registerMetric(httpRequestDurationMicroseconds);

// Bind routes to the app
routes.forEach((route) => {
  app[route.method](route.path, ...(route.middleware || []), (req, res) => {
    // Record request start time for metrics
    const requestTime = new Date().valueOf();

    route
      .handler(req)
      .then((data) => {
        res.json(data);
      })
      .catch((e: CommonError) => {
        console.log(e);
        res.status(e.status || 400).json({ message: e.message });
      })
      .finally(() => {
        // Record response time for metrics
        const responseTime = new Date().valueOf();
        httpRequestDurationMicroseconds
          .labels(req.route.path)
          .observe(responseTime - requestTime);
      });
  });
});
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", PrometheusRegister.contentType);
  console.log("here");
  PrometheusRegister.metrics().then((data) => res.end(data));
});
app.get("/health", async (req, res) => {
  try {
    // Check DB connection status
    await prisma.lookup.findFirst();
    res.status(200).send("Ok");
  } catch (e) {
    res.status(500).send("DB Error");
  }
});
export default app;
