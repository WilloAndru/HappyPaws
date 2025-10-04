// src/server.ts
import app, { connectDb } from "./app";

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
