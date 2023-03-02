function profileUpdate() {
  let newprofilename = profilename.value;
  let newprofileemail = profileemail.value;
  let oldpswdValue = profileoldpswd.value;
  let newprofilepswd = profilenewpswd.value;
  let newprofilecpswd = profilenewcpswd.value;

  if (newprofilename == "") {
    alert.innerHTML = "Name cannot be null";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }
  if (newprofilepswd !== newprofilecpswd) {
    alert.innerHTML = "Passwords do not match";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.innerHTML = "";
      alert.classList.remove("danger");
    }, 2000);
    return false;
  }

  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      let token = localStorage.getItem("passwordManagerToken");
      let id = decrypt(token);
      for (key in data) {
        if (key === id && data[key]["password"] === oldpswdValue) {
          flag = true;

          data[id] = {
            name: newprofilename,
            email: newprofileemail,
            password: newprofilepswd,
          };

          fetch(
            "https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              alert.innerHTML = "Data updated successfully";
              alert.classList.add("success");
              setTimeout(() => {
                alert.innerHTML = "";
                alert.classList.remove("success");
              }, 2000);
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
        }
      }
      if (!flag) {
        alert.innerHTML = "Invalid Credentials";
        alert.classList.add("danger");
        setTimeout(() => {
          alert.innerHTML = "";
          alert.classList.remove("danger");
        }, 2000);
        return false;
      }
    });
}

let profileForm = document.getElementById("profileForm");

let profilename = document.getElementById("floatingInput name");
let profileemail = document.getElementById("floatingInput email");
let profileoldpswd = document.getElementById("floatingPassword oldpswd");
let profilenewpswd = document.getElementById("floatingPassword newpswd");
let profilenewcpswd = document.getElementById("floatingPassword newcpswd");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileUpdate();
});

function getDetails() {
  let token = localStorage.getItem("passwordManagerToken");
  let id = decrypt(token);
  fetch("https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json")
    .then((res) => res.json())
    .then((data) => {
      for (key in data) {
        if (key === id) {
          profilename.value = data[id]["name"];
          profileemail.value = data[id]["email"];
        }
      }
    });
}
getDetails();

let alert = document.getElementById("alert");

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
