import express from "express";
import pedidos from "./pedidoRoute.js";
import { promises } from "fs";
const { readFile, writeFile } = promises;
const PORT = 8080;

global.filePath = "pedidos.json";

const app = express();
app.use(express.json());

app.use("/pedidos", pedidos);

app.listen(PORT, async () => {
  try {
    await readFile(global.filePath);
  } catch {
    writeFile(global.filePath, JSON.stringify([]));
  }
  console.log(`listing on port ${PORT}`);
});
