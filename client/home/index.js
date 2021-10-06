const baseURL = `http://localhost:5000`;

let logoutBtn = document.querySelector(".bi-box-arrow-right");
logoutBtn.addEventListener("click", () => {
  window.location.replace("http://localhost:5000/");
});

let calendar;
loadFullCalendar();

function loadFullCalendar() {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable: true,
    timeZone: "local",
    editable: true,
    initialView: "timeGridWeek",
    droppable: true,
    nowIndicator: true,
    allDaySlot: false,
    slotMinTime: "07:30:00",
    slotMaxTime: "20:30:00",
    hiddenDays: [0, 6],
    events: function (info, successCallback, failureCallback) {
      axios
        .get(baseURL + "/appts")
        .then((res) => {
          successCallback(res.data);
        })
        .catch((err) => console.error(err));
    },
  });
  calendar.render();
}

//grabbing all the HTML elements and buttons
let darkener = document.querySelector(".background-darkener");
let newPtForm = document.getElementById("create-new-pt");
let newApptForm = document.querySelector(".new-appt");
let newPtBtn = document.querySelector(".create-new");
let newApptBtn = document.querySelector(".create-appt");
let closePtBtn = document.getElementById("close");
let closeApptBtn = document.getElementById("close-appt");

//Patient Form Data
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let address = document.getElementById("pt-address");
let phone = document.getElementById("phone-number");
let email = document.getElementById("email");
let gender = document.getElementById("gender");
let pronouns = document.getElementById("pronouns");
let birthday = document.getElementById("birthday");
let insurance = document.getElementById("insurance");
let insuranceID = document.getElementById("insurance-id");
let expDate = document.getElementById("exp-date");
let provider = document.getElementById("provider-dropdown");

// Appointment Variables
let date = document.getElementById("date");
let time = document.getElementById("time");
let ptName = document.getElementById("ptName");
let ptBirthday = document.getElementById("ptBirthday");

newPtBtn.addEventListener("click", () => {
  newPtForm.classList.remove("hidden");
  darkener.classList.remove("hidden");
});
closePtBtn.addEventListener("click", () => {
  newPtForm.classList.add("hidden");
  darkener.classList.add("hidden");
});
newApptBtn.addEventListener("click", () => {
  newApptForm.classList.remove("hidden");
  darkener.classList.remove("hidden");
});
closeApptBtn.addEventListener("click", () => {
  newApptForm.classList.add("hidden");
  darkener.classList.add("hidden");
});

const submitPt = (body) =>
  axios
    .post(baseURL + "/new-patient", body)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });

function newPtSubmitHandler(e) {
  e.preventDefault();
  let bodyObj = {
    name: `${firstName.value} ${lastName.value}`,
    address: address.value,
    phone: phone.value,
    email: email.value,
    gender: gender.value,
    pronouns: pronouns.value,
    birthdate: birthday.value,
    insurance: insurance.value,
    insuranceIdNum: insuranceID.value,
    policyExpDate: expDate.value,
    provider: provider.value,
  };
  for (key in bodyObj) {
    if (bodyObj[key] === "" || bodyObj[key] === null) {
      return alert("Registration fields cannot be left blank");
    }
  }

  submitPt(bodyObj);

  firstName.value = "";
  lastName.value = "";
  address.value = "";
  phone.value = "";
  email.value = "";
  gender.value = "";
  pronouns.value = "";
  birthday.value = "";
  insurance.value = "";
  insuranceID.value = "";
  expDate.value = "";
  provider.value = "";
}

const submitAppt = (body) =>
  axios
    .post(baseURL + "/newappt", body)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.error(err));

function newApptSubmitHandler(e) {
  e.preventDefault();
  let bodyObj = {
    title: ptName.value,
    start: `${date.value}T${time.value}`,
    birthday: ptBirthday.value,
  };
  for (key in bodyObj) {
    if (bodyObj[key] === "" || bodyObj[key] === null) {
      return alert("Registration fields cannot be left blank");
    }
  }
  submitAppt(bodyObj);
  ptName.value = "";
  date.value = "";
  time.value = "";
  ptBirthday.value = "";
  calendar.refetchEvents();
}

newPtForm.addEventListener("submit", newPtSubmitHandler);
newApptForm.addEventListener("submit", newApptSubmitHandler);
