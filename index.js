const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
const indexRouter = require('./src/router/index.router');

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use('/', indexRouter);


app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});