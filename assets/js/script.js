function isSignedIn() {
  let passwordPage = document.getElementById("passwordPage");
  let loginPage = document.getElementById("loginPage");
  let profilePage = document.getElementById("profilePage");
  let logoutPage = document.getElementById("logoutPage");

  let token = localStorage.getItem("passwordManagerToken");
  let id = decrypt(token);

  if (!token) {
    passwordPage.style.display = "none";
    loginPage.style.display = "inline";
    profilePage.style.display = "none";
    logoutPage.style.display = "none";
    return false;
  }

  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      for (let key in data) {
        if (key === id) {
          user = key;
          break;
        }
      }
      if (!user) {
        passwordPage.style.display = "none";
        loginPage.style.display = "inline";
        profilePage.style.display = "none";
        logoutPage.style.display = "none";
      } else {
        passwordPage.style.display = "inline";
        loginPage.style.display = "none";
        profilePage.style.display = "inline";
        logoutPage.style.display = "inline";
      }
    })
    .catch((err) => {
      passwordPage.style.display = "none";
      loginPage.style.display = "inline";
      profilePage.style.display = "none";
      logoutPage.style.display = "none";
    });
}
isSignedIn();

function logout() {
  localStorage.removeItem("passwordManagerToken");
  window.location.reload();
}

function GeonTheGenerator(length = 20) {
  let password = "";
  let characters = "";

  if (isCapitalAvailable.checked) {
    characters += capitals;
  }

  if (isSmallAvailable.checked) {
    characters += smalls;
  }

  if (isNumberAvailable.checked) {
    characters += numbers;
  }

  if (isSymbolAvailable.checked) {
    characters += symbols;
  }

  if (characters == "") {
    return 'Bro, really? <i class="far fa-face-meh"></i>';
  }

  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * (characters.length - 1))];
  }
  return password;
}

const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const smalls = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = '!@#$%^&*()_-+=~`{[}]|:;"<,>.?/';
let characterLength =
  capitals.length + smalls.length + numbers.length + symbols.length;

let generator = document.getElementById("generator");
let replaceMe = document.getElementById("replaceMe");

let isCapitalAvailable = document.getElementById("capitals");
let isSmallAvailable = document.getElementById("smalls");
let isNumberAvailable = document.getElementById("numbers");
let isSymbolAvailable = document.getElementById("symbols");
let length = document.getElementById("length");

generator.addEventListener("click", function () {
  replaceMe.innerHTML = GeonTheGenerator();
});

let copyMe = document.getElementById("copyMe");
copyMe.addEventListener("click", () => {
  navigator.clipboard.writeText(replaceMe.innerText);
  copyMe.classList = "fa-solid fa-check checked";
  setTimeout(() => {
    copyMe.classList = "fa-solid fa-copy";
  }, 2000);
});

function encrypt(input) {
  output = "";
  for (var i = 0; i < input.length; i++) {
    output += input[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
}

function decrypt(input) {
  if (!input) return;
  output = "";
  input = input.split(" ");
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(parseInt(input[i], 2));
  }
  output = output.substring(0, output.length - 12);
  return output;
}

function ifSignedInRedirectToHome() {
  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      let token = localStorage.getItem("passwordManagerToken");
      let id = decrypt(token);
      for (const key in data) {
        if (id == key) {
          window.location.replace("index.html");
        }
      }
    });
}
