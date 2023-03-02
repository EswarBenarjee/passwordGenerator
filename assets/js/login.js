function login() {
  var username = document.getElementById("floatingInput email").value;
  var password = document.getElementById("floatingPassword pswd").value;

  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      for (const key in data) {
        if (data[key].email == username && data[key].password == password) {
          user = key;
        }
      }

      if (!user) {
        alert.innerHTML = "Invalid Credentials";
        alert.classList.add("danger");
        setTimeout(() => {
          alert.innerHTML = "";
          alert.classList.remove("danger");
        }, 2000);
        return false;
      }

      alert.innerHTML = "Login Successful";
      alert.classList.add("success");

      let token = encrypt(user + "eswarsecret");
      localStorage.setItem("passwordManagerToken", token);

      setTimeout(() => {
        alert.innerHTML = "";
        alert.classList.remove("success");

        window.location.href = "index.html";
      }, 2000);

      return false;
    })
    .catch((err) => {
      alert.innerHTML = "Invalid Credentials";
      alert.classList.add("danger");
      setTimeout(() => {
        alert.innerHTML = "";
        alert.classList.remove("danger");
      }, 2000);
      return false;
    });
}

let alert = document.getElementById("alert");
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

ifSignedInRedirectToHome();

let togglers1 = document.querySelectorAll(".navbar-toggler");
toggleIndex1 = 0;
let navbarNavAltMarkup1 = document.querySelector("#navbarNavAltMarkup");
togglers1.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    if (toggleIndex1 == 0) {
      navbarNavAltMarkup1.style.display = "block";
      toggleIndex1 = 1;
    } else {
      navbarNavAltMarkup1.style.display = "none";
      toggleIndex1 = 0;
    }
  });
});
