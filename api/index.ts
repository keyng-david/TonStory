// Removed Firebase-specific imports
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Vercel-compatible serverless function
export default (req: Request, res: Response) => {
  console.log("Hello logs!"); // Using standard console.log for logging
  res.status(200).send("Hello from Vercel serverless function!");
};