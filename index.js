const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
const adminRouter = require("./router/admin.controller");
const favouriteRouter = require("./router/favourite.controller");
const projectsRouter = require("./router/projects.controller");
const technosRouter = require("./router/technos.controller");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/favourite", favouriteRouter);
app.use("/projects", projectsRouter);
app.use("/techno", technosRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});