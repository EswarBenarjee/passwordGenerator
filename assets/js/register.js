function register() {
  let n = name.value;
  let e = email.value;
  let p = pswd.value;
  let cp = cpswd.value;

  if (n == "") {
    alert.innerHTML = "Please enter your name";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }

  if (e == "") {
    alert.innerHTML = "Please enter your email";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }

  if (p.length < 4 || p.length > 16) {
    alert.innerHTML = "Password must be in between 4 to 16 characters";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }

  if (p != cp) {
    alert.innerHTML = "Password and Confirm Password must be saved";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }

  let user = {
    name: n,
    email: e,
    password: p,
  };

  // Check if the user exists in the database or not
  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      for (let key in data) {
        if (data[key].email == e) {
          alert.innerHTML = "User already exists";
          alert.classList.add("danger");
          setTimeout(() => {
            alert.innerHTML = "";
            alert.classList.remove("danger");
          }, 2000);
          return false;
        }
      }

      fetch(
        "https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert.innerHTML = "Registration Successful";
          alert.classList.add("success");
          setTimeout(() => {
            alert.innerHTML = "";
            alert.classList.remove("success");
          }, 2000);

          let token = encrypt(data.name + "eswarsecret");
          localStorage.setItem("passwordManagerToken", token);

          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);

          return false;
        })
        .catch((err) => {
          alert.innerHTML = "Oops, something went wrong";
          alert.classList.add("danger");
          setTimeout(() => {
            alert.innerHTML = "";
            alert.classList.remove("danger");
          }, 2000);
          return false;
        });
    })
    .catch((err) => {
      alert.innerHTML = "Oops, something went wrong";
      alert.classList.add("danger");
      setTimeout(() => {
        alert.innerHTML = "";
        alert.classList.remove("danger");
      }, 2000);
      return false;
    });

  return false;
}

let name = document.getElementById("floatingInput name");
let email = document.getElementById("floatingInput email");
let pswd = document.getElementById("floatingPassword pswd");
let cpswd = document.getElementById("floatingPassword cpswd");
let alert = document.getElementById("alert");

let registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});

ifSignedInRedirectToHome();
