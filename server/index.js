import app from './app.js';

const PORT = process.env.PORT || 5005;

// Start standalone HTTP server when executed directly (e.g. npm run dev or node server/index.js)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[AgriDrought AI Backend API Server running on port ${PORT}]`);
  });
}

export default app;
