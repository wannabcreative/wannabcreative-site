import express, { type Express } from "express";
import { registerRoutes } from "./routes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const server = await registerRoutes(app);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
