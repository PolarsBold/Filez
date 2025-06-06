import express from "express";
const filesRouter = express.Router();
export default filesRouter;

import { getFiles } from "#db/queries/files";

filesRouter.get("/", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
