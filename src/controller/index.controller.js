const express = require('express');

const router = express.Router();

const adminRouter = require("./controller/admin.controller");
const clientsRouter = require("./controller/clients.controller");
const favouriteRouter = require("./controller/favourite.controller");
const projectsRouter = require("./controller/projects.controller");
const technosRouter = require("./controller/technos.controller");

app.use("/admin", adminRouter);
app.use("/clients", clientsRouter);
app.use("/favourite", favouriteRouter);
app.use("/projects", projectsRouter);
app.use("/technos", technosRouter);

module.exports = router;