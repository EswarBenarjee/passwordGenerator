function savedPasswords() {
  let token = localStorage.getItem("passwordManagerToken");
  let id = decrypt(token);

  fetch(
    "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json"
  )
    .then((res) => res.json())
    .then((data) => {
      isUserFound = false;
      for (key in data) {
        let i = 0;
        for (userid in data[key]) {
          if (userid == id) {
            tableData = "<tr>";

            tableData += "<td>" + data[key][id]["reference"] + "</td>";
            tableData += "<td>" + data[key][id]["password"] + "</td>";
            tableData +=
              "<td><button class='btn btn-success' onclick=redirectTo('" +
              data[key][id]["link"] +
              "')><i class='fas fa-arrow-up-right-from-square'></i></button></td>";

            tableData +=
              "<td><a class='btn btn-primary' href='index.html?reference=" +
              data[key][id]["reference"] +
              "&password=" +
              data[key][id]["password"] +
              "&link=" +
              data[key][id]["link"] +
              "'><i class='fa-solid fa-pen-to-square'</i></a></td>";

            tableData +=
              "<td><button class='btn btn-danger' onclick='deletePassword(" +
              i +
              ", `" +
              key +
              "`)'><i class='fas fa-trash'></i></button></td>";
            tableData += "</tr>";

            passwordsDiv.innerHTML += tableData;

            isUserFound = true;
          }
          i++;
        }
      }
    });
}

let passwordsDiv = document.getElementById("passwords");
let passwordsTable = document.getElementById("passwordsTable");
savedPasswords();

function redirectTo(link) {
  window.location.href = "http://" + link;
}

function deletePassword(i, key) {
  let token = localStorage.getItem("passwordManagerToken");
  let id = decrypt(token);

  fetch(
    "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords.json"
  )
    .then((res) => res.json())
    .then((data) => {
      for (userid in data[key]) {
        if (userid == id) {
          fetch(
            "https://passwordmanager-dc248-default-rtdb.firebaseio.com/passwords/" +
              key +
              "/" +
              id +
              ".json",
            {
              method: "DELETE",
              body: JSON.stringify(data[key][id]),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              passwordsTable.deleteRow(i + 1);
            })
            .catch((err) => {
              alert.innerHTML = "Something went wrong. Please try again later.";
              alert.classList.add("danger");
            });
        }
      }
    });
}

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
