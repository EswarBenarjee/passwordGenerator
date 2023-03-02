function stayInPage() {
  let token = localStorage.getItem("passwordManagerToken");
  if (!token) {
    window.location.replace("login.html");
  } else {
    let id = decrypt(token);
    fetch(
      "https://passwordmanager-dc248-default-rtdb.firebaseio.com/users.json"
    )
      .then((res) => res.json())
      .then((data) => {
        for (let key in data) {
          if (key === id) {
            user = key;
            break;
          }
        }
        if (!user) {
          window.location.replace("login.html");
        }
      })
      .catch((err) => {
        window.location.replace("login.html");
      });
  }
}
stayInPage();
