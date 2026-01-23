// ===== AUTH GUARD =====
const publicPages = ["login.html", "register.html"];

const currentPage = window.location.pathname.split("/").pop();

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser && !publicPages.includes(currentPage)) {
  window.location.href = "login.html";
}
// ===== REGEX =====
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordPattern = {
  length: /.{8,}/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[@$!%*?#&]/
};


// ===== REGISTER =====
function registerUser() {
  let name = regName.value.trim();
  let email = regEmail.value.trim();
  let password = regPassword.value;

  regNameError.innerText = "";
  regEmailError.innerText = "";
  regPasswordError.innerText = "";
  regMsg.innerText = "";

  if (!name) {
    regNameError.innerText = "Name is required";
    return;
  }

  if (!emailPattern.test(email)) {
    regEmailError.innerText = "Invalid email format";
    return;
  }

  let errors = [];
  if (!passwordPattern.length.test(password)) errors.push("Min 8 chars");
  if (!passwordPattern.uppercase.test(password)) errors.push("1 uppercase");
  if (!passwordPattern.lowercase.test(password)) errors.push("1 lowercase");
  if (!passwordPattern.number.test(password)) errors.push("1 number");
  if (!passwordPattern.special.test(password)) errors.push("1 special char");

  if (errors.length > 0) {
    regPasswordError.innerText = errors.join(", ");
    return;   // 🚨 STOP saving if invalid
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let existing = users.find(u => u.email === email);
  if (existing) {
    regMsg.innerText = "User already exists. Please login.";
    regMsg.style.color = "red";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.innerText = "Registration successful! Go to login.";
  regMsg.style.color = "green";
}


let regPassword = document.getElementById("regPassword");
let passwordRules = document.getElementById("passwordRules");

if (regPassword) {
  regPassword.addEventListener("input", function () {
    let pwd = regPassword.value;

    let rules = {
      length: /.{8,}/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[@$!%*?#&]/.test(pwd)
    };

    let msg = "";
    msg += rules.length ? "✔ 8 chars<br>" : "✖ 8 chars<br>";
    msg += rules.upper ? "✔ Uppercase<br>" : "✖ Uppercase<br>";
    msg += rules.lower ? "✔ Lowercase<br>" : "✖ Lowercase<br>";
    msg += rules.number ? "✔ Number<br>" : "✖ Number<br>";
    msg += rules.special ? "✔ Special<br>" : "✖ Special<br>";

    passwordRules.innerHTML = msg;
  });
}


// ===== LOGIN =====
function loginUser() {
  let email = loginEmail.value.trim();
  let password = loginPassword.value;

  loginEmailError.innerText = "";
  loginPasswordError.innerText = "";
  loginMsg.innerText = "";

  if (!emailPattern.test(email)) {
    loginEmailError.innerText = "Invalid email format";
    return;
  }

  if (!password) {
    loginPasswordError.innerText = "Password is required";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    loginMsg.innerHTML = "No user found. <a href='register.html'>Register now</a>";
    loginMsg.style.color = "red";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "index.html";
}


// ===== LOGOUT =====
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}


// ===== NAVBAR LOGIN STATE =====
function updateNavbarAuth() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  let userNameEl = document.getElementById("user-name");
  let loginLink = document.getElementById("loginLink");
  let logoutLink = document.getElementById("logoutLink");

  if (!userNameEl || !loginLink || !logoutLink) return;

  if (user) {
    userNameEl.innerText = "Hi, " + user.name;
    userNameEl.style.display = "inline-block";

    loginLink.style.display = "none";
    logoutLink.style.display = "inline-block";
  } else {
    userNameEl.style.display = "none";

    loginLink.style.display = "inline-block";
    logoutLink.style.display = "none";
  }
}

updateNavbarAuth();


// ===== SHOW / HIDE PASSWORD =====

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈"; // hide icon
  } else {
    input.type = "password";
    icon.textContent = "👁"; // show icon
  }
}
