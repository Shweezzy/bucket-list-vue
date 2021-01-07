const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bucketListItemRoutes = require("./routes/api/bucketListItem");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

app.use("/api/bucketListItems", bucketListItemRoutes);
app.get("/", (req, res) => {
  res.send("Hello im bucket list");
});

app.listen(PORT, () => {
  console.log(`server is starting on: localhost:${PORT}`);
});
