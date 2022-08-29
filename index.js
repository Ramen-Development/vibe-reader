const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/views/index.html'));
});


app.use('/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
