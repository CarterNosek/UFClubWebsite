const env = "development";
const PORT = 3001;
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Connection with ${env} database has been established.`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/", (req, res) => res.json({ status: "API is running on /api" }));

app.post("/login", (req, res) => {
  //TODO
  const username = req.body.username
  const password = req.body.password

  //CURRENTLY FOR TESTING
  res.send({
    token: true
  });
});

app.get("/calendar/current", (req, res) => {
  //Replace with actual data
  res.json({events: [{month: "October", day: "28", name: "Sprint 1 Presentation", description: "TODO"}, {month: "October", day: "29", name: "Sprint 1 Party", description: "Get crazy!"}]})
})

app.get("*", (req, res) =>
  res.status(404).json({ errors: { body: ["Not found"] } }),
);

// app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
