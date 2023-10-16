const handlerErros = require("./middlewares/handlerErros");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/todo", require("./routes/todos-router"));
app.get("/", (req, res) => {
  res.send({ message: "Welcome to todos APIs" });
});
app.all("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

const db = require("./models/index");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    // __________________________________________________________________________________//

    // You can Sstart your sxpress server here only when database connection is successful
    // __________________________________________________________________________________//
  })
  .catch((error) => {
    next({
      message: "Unable to connect to the database",
      error: error.message,
    });
  });

app.use(handlerErros);

app.listen(3005, () =>
  console.log("server is running on http://localhost:3005")
);
