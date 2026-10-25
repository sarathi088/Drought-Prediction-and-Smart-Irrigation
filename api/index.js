import app from '../server/app.js';

// Vercel Serverless Function entry point
export default function handler(req, res) {
  return app(req, res);
}
