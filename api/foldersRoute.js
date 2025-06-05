import express from "express";
const foldersRouter = express.Router();
export default foldersRouter;

import {
  getFolders,
  getFolderById,
  createFileUsingFolderId,
} from "#db/queries/folders";

foldersRouter.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

foldersRouter.get("/:id", async (req, res) => {
  const folder = await getFolderById(req.params.id);
  if (Number(req.params.id) < 1 || Number(req.params.id) > 3) {
    res.status(404).json({ message: "folder not found" });
  } else {
    res.send(folder);
  }
});

foldersRouter.post("/:id/files", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.size) {
    res.status(400).json({ message: "body or body element is missing" });
  } else if (Number(req.params.id) < 1 || Number(req.params.id) > 3) {
    res.status(404).json({ message: "folder does not exist" });
  }
  const newObject = { ...req.body, folderId: req.params.id };
  const newFile = await createFileUsingFolderId(newObject);
  res.status(201).send(newFile);
});
