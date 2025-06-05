import express from "express";
const app = express();
export default app;
import filesRouter from "#api/filesRoute";
import foldersRouter from "#api/foldersRoute";

app.use(express.json());
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});
