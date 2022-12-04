import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const router = express.Router();
const port = 8080;

app.use(express.static("public"));

/* express */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
