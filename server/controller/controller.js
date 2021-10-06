let patients = require("./patientdb.json");
const bcrypt = require("bcrypt");
const users = [
  {
    username: "leroyjenkins",
    email: "leroy@gmail.com",
    firstName: "Leroy",
    lastName: "Jenkins",
    passHash: "$2b$10$OfzRtnK7Z8/mDJY1IoRktOc/0wktn9GAM2XNYOX6AnA6XON30LO0e",
  },
];
let ptID = 4;
let userID = 1;
let calendarEvents = [];

function generateCalendarEvents() {
  calendarEvents = [];
  for (let i = 0; i < patients.length; i++) {
    let { appointments } = patients[i];
    for (let j = 0; j < appointments.length; j++) {
      calendarEvents.push(appointments[j]);
    }
  }
}
generateCalendarEvents()

module.exports = {
  registerUser: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username)
        return res.status(400).send("Username already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);

    let userObj = {
      username,
      email,
      firstName,
      lastName,
      passHash,
    };

    console.log("Registering New User");
    users.push(userObj);
    userID++;
    res.status(200).send("User Created Succesfully!");
  },

  loginUser: (req, res) => {
    console.log("Logging In User");
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].passHash);

        if (existing) {
          return res.sendStatus(200);
        }
      }
    }
    res.status(400).send("Incorrect Username or Password");
  },

  createNewPatient: (req, res) => {
    console.log("New Patient Created");
    const {
      name,
      address,
      phone,
      email,
      gender,
      pronouns,
      birthdate,
      insurance,
      insuranceIdNum,
      policyExpDate,
      provider,
    } = req.body;

    let bodyObj = {
      id: ptID,
      name: name,
      address: address,
      phone: phone,
      email: email,
      gender: gender,
      pronouns: pronouns,
      birthdate: birthdate,
      insurance: insurance,
      insuranceIdNum: insuranceIdNum,
      policyExpDate: policyExpDate,
      appointments: [],
      provider: provider,
    };

    for (pt in patients) {
      if (Object.values(pt) === Object.values(bodyObj)) {
        return res.status(400).send("Patient Already Exists");
      }
    }
    patients.push(bodyObj);
    ptID++;
    res.status(200).send("Patient Created Successfully");
  },

  getAppointments: (req, res) => {
    console.log("appointments");
    res.status(200).send(calendarEvents);
  },

  createNewAppt: (req, res) => {
    console.log("appointment added");
    for (let i = 0; i < patients.length; i++) {
      let { appointments, name, birthdate, provider } = patients[i];
      let { title, start, birthday } = req.body;
      if (name === title && birthdate === birthday) {
        let bodyObj = {
          id: provider,
          title: title,
          start: start,
          color: "",
        };
        if (provider === "yee") {
          bodyObj["color"] = "#B48291";
          appointments.push(bodyObj);
          generateCalendarEvents();
          return res.status(200).send("appt created");
        } else if (provider === "robotnik") {
          bodyObj["color"] = "#28C2FF";
          appointments.push(bodyObj);
          generateCalendarEvents();
          return res.status(200).send("appt created");
        } else {
          bodyObj["color"] = "#63A375";
          appointments.push(bodyObj);
          generateCalendarEvents();
          return res.status(200).send("appt created");
        }
      }
    }
    return res.status(400).send("Pt not found");
  },
};
