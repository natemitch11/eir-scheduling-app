const express = require("express");
const cors = require("cors");
const path = require("path");
const controller = require("./controller/controller");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/login/login.html"))
);
app.get("/appts", controller.getAppointments)
app.post('/newappt', controller.createNewAppt);

app.post("/login", controller.loginUser);
app.post("/register", controller.registerUser);
app.post("/new-patient", controller.createNewPatient);

app.use(express.static("client"));
app.use("/scripts", express.static(path.join(__dirname, "../node_modules")));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on ${port}`));
