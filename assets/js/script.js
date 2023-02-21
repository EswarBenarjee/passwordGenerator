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
    console.log(Math.floor(Math.random() * characters.length - 1));
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
