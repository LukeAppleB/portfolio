import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Set environment
const env = process.env.NODE_ENV || "development";
process.env.NODE_ENV = env;

const app = express();

// Production-specific middleware
if (env === "production") {
  // Trust proxy for secure cookies behind a reverse proxy
  app.set("trust proxy", 1);
  // Disable powered by header for security
  app.disable("x-powered-by");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in development, serve static in production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Get port from environment variable or default to 5000
  const port = process.env.PORT || 5000;
  // In production, listen on all interfaces, in development only on localhost
  const host = env === "production" ? "0.0.0.0" : "127.0.0.1";

  server.listen({
    port,
    host,
  }, () => {
    log(`Server running in ${env} mode on http://${host}:${port}`);
  });
})();
