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
  localStorage.setItem("generatedPasswordManagerPassword", password);
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

if (localStorage.getItem("generatedPasswordManagerPassword")) {
  replaceMe.innerHTML = localStorage.getItem(
    "generatedPasswordManagerPassword"
  );
}

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

function savePassword() {
  let token = localStorage.getItem("passwordManagerToken");
  let id = decrypt(token);

  if (!token) {
    alertDiv.innerHTML = "Please Login to save";
    alertDiv.classList.add("danger");
    setTimeout(() => {
      alertDiv.innerHTML = "";
      alertDiv.classList.remove("danger");
    }, 2000);
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
        alertDiv.innerHTML = "Please Login to save 2";
        alertDiv.classList.add("danger");
        setTimeout(() => {
          alertDiv.innerHTML = "";
          alertDiv.classList.remove("danger");
        }, 2000);
        return false;
      } else {
        savePasswordDiv.style.display = "none";
        savePasswordWithNameDiv.style.display = "block";
        referenceDiv.style.display = "block";
      }
    })
    .catch((err) => {
      alertDiv.innerHTML = "Please Login to save 3";
      alertDiv.classList.add("danger");
      setTimeout(() => {
        alertDiv.innerHTML = "";
        alertDiv.classList.remove("danger");
      }, 2000);
      return false;
    });
}
function savePasswordWithName() {
  currRef = referenceInput.value.toLowerCase();
  currLink = linkInput.value.toLowerCase();
  currPswd = replaceMe.innerHTML;
  if (currRef == "") {
    alertDiv.innerHTML = "Reference Name is Compulsory";
    alertDiv.classList.add("danger");
    setTimeout(() => {
      alertDiv.innerHTML = "";
      alertDiv.classList.remove("danger");
    }, 2000);
    remove();
  }

  fetch(
    "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json"
  )
    .then((res) => res.json())
    .then((data) => {
      id = decrypt(localStorage.getItem("passwordManagerToken"));

      console.log(data);
      if (!data) {
        newData = {};
        newData[id] = {
          link: currLink.toLowerCase(),
          reference: currRef.toLowerCase(),
          password: currPswd,
        };

        fetch(
          "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            alertDiv.innerHTML = "Password has been saved";
            alertDiv.classList.add("success");
            setTimeout(() => {
              alertDiv.innerHTML = "";
              alertDiv.classList.remove("success");
            }, 2000);
          })
          .catch((err) => {
            alertDiv.innerHTML = "Oops, something went wrong";
            alertDiv.classList.add("danger");
            setTimeout(() => {
              alertDiv.innerHTML = "";
              alertDiv.classList.remove("danger");
            }, 2000);
          });
      } else {
        isLinkAlreadyPresent = false;
        for (key in data) {
          isLinkAlreadyPresent = false;
          for (userid in data[key]) {
            if (userid == id) {
              if (data[key][id]["reference"] == currRef) {
                data[key][id]["reference"] = currRef;
                data[key][id]["password"] = currPswd;
                data[key][id]["link"] = currLink;

                fetch(
                  "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                ).then((res) => {
                  alertDiv.innerHTML = "Password has been saved";
                  alertDiv.classList.add("success");
                  setTimeout(() => {
                    alertDiv.innerHTML = "";
                    alertDiv.classList.remove("success");
                  }, 2000);
                });

                isLinkAlreadyPresent = true;
                break;
              }
            }
          }
          if (isLinkAlreadyPresent) break;
        }
        if (!isLinkAlreadyPresent) {
          newData = {};
          newData[id] = {
            link: currLink.toLowerCase(),
            reference: currRef.toLowerCase(),
            password: currPswd,
          };

          fetch(
            "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              alertDiv.innerHTML = "Password has been saved";
              alertDiv.classList.add("success");
              setTimeout(() => {
                alertDiv.innerHTML = "";
                alertDiv.classList.remove("success");
              }, 2000);
            })
            .catch((err) => {
              alertDiv.innerHTML = "Oops, something went wrong";
              alertDiv.classList.add("danger");
              setTimeout(() => {
                alertDiv.innerHTML = "";
                alertDiv.classList.remove("danger");
              }, 2000);
            });
        }
      }
    });
}

let savePasswordDiv = document.getElementById("savePassword");
let savePasswordWithNameDiv = document.getElementById("savePasswordWithName");
let referenceDiv = document.getElementById("referenceDiv");
let referenceInput = document.getElementById("floatingInput pswdreference");
let linkInput = document.getElementById("floatingInput pswdlink");
savePasswordDiv.addEventListener("click", savePassword);
savePasswordWithNameDiv.addEventListener("click", savePasswordWithName);

let alertDiv = document.getElementById("alert");
