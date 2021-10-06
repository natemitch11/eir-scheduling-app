const baseURL = `http://localhost:5000`;

const register = (body) =>
  axios.post(baseURL + "/register", body).then((res) => {
    let container = document.querySelector("#register-user");
    let newP = document.createElement("p");
    newP.textContent = ''
    newP.textContent = res.data;
    container.appendChild(newP)
  }).catch((err)=>{
      console.log(err.response.data)
      alert("Uh oh. Your request did not work")
  });

function registerSubmitHandler(e) {
  e.preventDefault();
  let username = document.getElementById("username");
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let password2 = document.getElementById("password2");

  if (password.value !== password2.value) {
    alert("Passwords need to match, please try again");
    return;
  }

  let bodyObj = {
    username: username.value,
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    password: password.value,
  };

  for(key in bodyObj) {
    if (bodyObj[key] === '' || bodyObj[key]=== null) {
      return alert("Registration fields cannot be left blank")
    }
  }

  register(bodyObj);

  username.value = "";
  email.value = "";
  firstName.value = "";
  lastName.value = "";
  password.value = "";
  password2.value = "";
}

let registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click", registerSubmitHandler);
