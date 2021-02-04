const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
const adminRouter = require("./src/controller/admin.controller");
const clientsRouter = require("./src/controller/clients.controller");
const favouriteRouter = require("./src/controller/favourite.controller");
const projectsRouter = require("./src/controller/projects.controller");
const technosRouter = require("./src/controller/technos.controller");

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/clients", clientsRouter);
app.use("/favourite", favouriteRouter);
app.use("/projects", projectsRouter);
app.use("/technos", technosRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});