const baseURL = `http://localhost:5000`;

const login = (body) =>
  axios.post(baseURL + "/login", body).then((res) => {
    if (res.status === 200) {
      window.location.replace(baseURL + "/home/index.html").catch((err) => {
        console.error(err);
      });
    }
  });

function loginSubmitHandler(e) {
  e.preventDefault();

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let bodyObj = {
    username: username.value,
    password: password.value,
  };

  if (username.value === "" || password.value === "") {
    return alert("Username or Password cannot be blank");
  }

  login(bodyObj);
  username.value = "";
  password.value = "";
}

let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", loginSubmitHandler);
