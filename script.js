let page = "";

function main() {
  if (page === "home") {
    homepage();
  } else if (page === "products") {
    product();
  } else if (page === "cart") {
    cartpage();
  }
}

// ==============NAV BAR==================
let nav_rep = document.getElementById("nav-bar-replace");
let islogin = localStorage.getItem("islogin") || 0;

function navbar() {
  if (islogin == 1) {
    nav_rep.innerHTML = ` <nav class="relative">
        <div
    class="nav flex w-full justify-between transition-all duration-1000"
  >
    <div class="m-2 flex relative logo hover:cursor-pointer" onclick="home();hamburgerClose()">
        <img src="./icons/box.png" class="size-10" alt="logo" />
        <p class="p-2 logo-text font-bold text-xl">BAKAS</p>
    </div>
    <div
      class="search transition-all ease-in rounded-full flex m-2 border border-neutral-400 h-12 overflow-hidden"
    >
    <img src="./icons/search.svg" class="size-6 m-3" />
    <input
        type="text"
        placeholder="Enter the name of item"
        class="search-input overflow-hidden p-3 outline-none"
      />
    </div>
    <div class="options">
        <ul class="flex">
        <li class="home p-4 font-bold hover:underline hover:cursor-pointer" onclick="home()">Home</li>
        <li class="cart p-4 font-bold hover:underline hover:cursor-pointer" onclick="cartHref()">Cart</li>
        <div class="flex">
            <img src="./icons/avatar.svg" alt="avatar">
            <li class="Account py-4 font-bold hover:underline hover:cursor-pointer" onclick="">Account</li>
        </div>
    </ul>
    </div>
    
    <div class="hamburger">
        <img src="./icons/hamburger.svg" class="size-8 m-4" />
    </div>
    <div
      class="absolute transition-all ease-in-out hamburger-menu bg-yellow-600 right-0 h-screen w-[50vw] opacity-0 -z-10"
    >
    <div class="cross absolute right-0">
        <img src="./icons/x.svg" class="size-8 m-4" />
      </div>
      <ul>
          <li class="home p-4 hover:bg-yellow-500" onclick="home();hamburgerClose()">Home</li>
          <li class="cart p-4 hover:bg-yellow-500" onclick="cartHref()">Cart</li>
          <div class="flex">
            <img src="./icons/avatar.svg" alt="avatar">
            <li class="Account py-4 font-bold hover:underline hover:cursor-pointer" onclick="">Account</li>
        </div>
        </ul>
    </div>
  </div>
</nav>`;
  } else {
    nav_rep.innerHTML = `<nav class="relative">
        <div
    class="nav flex w-full justify-between transition-all duration-1000"
  >
    <div class="m-2 flex relative logo hover:cursor-pointer" onclick="home();hamburgerClose()">
        <img src="./icons/box.png" class="size-10" alt="logo" />
        <p class="p-2 logo-text font-bold text-xl">BAKAS</p>
    </div>
    <div
      class="search transition-all ease-in rounded-full flex m-2 border border-neutral-400 h-12 overflow-hidden"
    >
    <img src="./icons/search.svg" class="size-6 m-3" />
    <input
        type="text"
        placeholder="Enter the name of item"
        class="search-input overflow-hidden p-3 outline-none"
      />
    </div>
    <div class="options">
        <ul class="flex">
        <li class="home p-4 font-bold hover:underline hover:cursor-pointer" onclick="home()">Home</li>
        <li class="cart p-4 font-bold hover:underline hover:cursor-pointer" onclick="cartHref()">Cart</li>
        <li class="Login p-4 font-bold hover:underline hover:cursor-pointer" onclick="loginHref()">Login</li>
        <li class="signUp p-4 font-bold hover:underline hover:cursor-pointer" onclick="signHref()">Sign up</li>
    </ul>
    </div>
    
    <div class="hamburger">
        <img src="./icons/hamburger.svg" class="size-8 m-4" />
    </div>
    <div
      class="absolute transition-all ease-in-out hamburger-menu bg-yellow-600 right-0 h-screen w-[50vw] opacity-0 -z-10"
    >
    <div class="cross absolute right-0">
        <img src="./icons/x.svg" class="size-8 m-4" />
      </div>
      <ul>
          <li class="home p-4 hover:bg-yellow-500" onclick="home();hamburgerClose()">Home</li>
          <li class="cart p-4 hover:bg-yellow-500" onclick="cartHref()">Cart</li>
          <li class="Login p-4 hover:bg-yellow-500" onclick="loginHref()">Login</li>
          <li class="signUp p-4 hover:bg-yellow-500" onclick="signHref()">Sign up</li>
        </ul>
    </div>
  </div>
</nav>`;
  }
}
navbar();

let price = JSON.parse(localStorage.getItem("price")) || [];
let productName = JSON.parse(localStorage.getItem("productName")) || [];
let productImage = JSON.parse(localStorage.getItem("productImage")) || [];

// ==============HAMBURGER==================
const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const cross = document.querySelector(".cross");
// w-[50vw] opacity-0 -z-10

function hamburgerClose() {
  // console.log("closed");
  hamburgerMenu.classList.add("w-[50vw]", "opacity-0", "-z-10");
  hamburgerMenu.classList.remove("w-[100vw]", "opacity-100", "z-10");
}

hamburger.addEventListener("click", () => {
  // console.log("clicked");
  hamburgerMenu.classList.remove("w-[50vw]", "opacity-0", "-z-10");
  hamburgerMenu.classList.add("w-[100vw]", "opacity-100", "z-10");
});
cross.addEventListener("click", () => hamburgerClose());
// ===========HOMEPAGE===============
function homepage() {
  let cards = document.querySelector(".cards");
  let getData = async () => {
    let data = await fetch("./info.json");
    let response = await data.json();
    console.log(response);
    response.forEach((item) => {
      cards.innerHTML =
        cards.innerHTML +
        ` <div class="card${item.id} m-1 rounded-xl border border-neutral-400 break-words overflow-hidden w-72 hover:cursor-pointer" onClick="productDescription(${item.id})">
      <div class="flex justify-center">
      <img src="${item.image}" class="h-52 w-52 m-2 object-contain">
      </div>
      <div class="m-2">    
      <p class="font-bold m-2 Pname">${item.productName}</p>
      <p class="m-2 text-2xl text-yellow-900 font-bold">RS.${item.cost}</p>
      <div class="flex m-2">
      <img src="./icons/pin.svg" alt="">
      <p class="text-gray-600">
      ${item.location}
      </p>
      </div>
      </div>
      </div>`;
      if (!productName.includes(item.productName)) {
        price.push(item.cost);
        productName.push(item.productName);
        productImage.push(item.image);
        localStorage.setItem("price", JSON.stringify(price));
        localStorage.setItem("productName", JSON.stringify(productName));
        localStorage.setItem("productImage", JSON.stringify(productImage));
      }
    });
  };
  getData();
}

// =============ENDPOINTS==========

function home() {
  window.location.href = "index.html";
}
function productHref() {
  window.location.href = "productDesc.html";
}
function cartHref() {
  window.location.href = "cart.html";
}
function loginHref() {
  window.location.href = "login.html";
}
function signHref() {
  window.location.href = "signup.html";
}

let description = [];
async function getDescription() {
  let data = await fetch("./description.json");
  let response = await data.json();
  // console.log(response[0].description)
  response.forEach((item) => {
    description.push(item.description);
  });
}
getDescription();

function productDescription(cardID) {
  localStorage.setItem("selectedProduct", cardID);
  localStorage.setItem("selectedProductTitle", productName[cardID]);
  localStorage.setItem("selectedProductPrice", price[cardID]);
  localStorage.setItem("selectedProductImage", productImage[cardID]);
  localStorage.setItem("selectedProductDescription", description[cardID]);
  productHref();
}

// ============PRODUCTS DESCRIPTION PAGE ================

function product() {
  window.onload = function () {
    let cardID = localStorage.getItem("selectedProduct");
    let name = localStorage.getItem("selectedProductTitle");
    let price = localStorage.getItem("selectedProductPrice");
    let image = localStorage.getItem("selectedProductImage");
    let desc = localStorage.getItem("selectedProductDescription");
    console.log(cardID);
    openmodel(name, price, image, desc);
  };
}
const products = document.querySelector(".products");
const info = document.querySelector(".showinfo");

function openmodel(name, price, image, desc) {
  // products.classList.add("hidden");
  // info.classList.remove("hidden");

  const title = document.getElementById("product-title");
  console.log(title);
  const Pdesc = document.getElementById("productDes");
  const Pimage = document.getElementById("productImage");
  const pPrice = document.getElementById("product-price");
  const toptitle = document.getElementById("head-title");
  console.log(toptitle);
  toptitle.innerHTML = name;
  title.innerText = name;
  Pdesc.innerText = desc;
  pPrice.innerText = "RS." + price;
  Pimage.innerHTML = `<img src="${image}" class="object-contain w-96">`;
}

// =============== CART ====================

let cart_href_sel = document.querySelector(".cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
function addToCart() {
  let cardID = localStorage.getItem("selectedProduct");
  cart.push(cardID);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart Succesfully !");
}

function cartpage() {
  let cards = document.querySelector(".cartCards");
  console.log(cards);
  let i = 0;
  if (cart.length === 0) {
    console.log("empty");
    cards.innerHTML = `<div class="flex flex-col justify-center items-center h-96">
        <img src="./icons/icons8-cart-80.png" alt="cart">
        <p>Your Cart is empty</p>
        <p class="text-yellow-900 underline cursor-pointer" onclick="home()">Start shopping</p>
    </div>`;
  } else {
    cart.forEach((product) => {
      cards.innerHTML =
        cards.innerHTML +
        ` 
    
    <div class="relative">
          <input class="absolute top-0 left-0 m-3 size-4 selProd" type="checkbox" name="selectprod" id="checkbox${[
            product,
          ]}" onclick="animationDel();getid(${i})">
          <div class="flex p-6 my-1 rounded-xl border-b-2 border border-neutral-600" onclick="productDescription(${product})">
         <img src="${productImage[product]}"
          alt="icon"
          class="product-image mx-2 h-32 w-32"
          />
          <div class="flex flex-col justify-between mx-2">
          <p class="product-description-cart font-bold text-lg">${
            productName[product]
          }
            </p>
            <div class="productCardBottom flex justify-between">
            <p class="font-bold text-yellow-900 text-2xl">RS.${
              price[product]
            }</p>
            <div class="flex">
            <img class="size-7" src="./icons/pin.svg" alt="pin" />
            <p class="text-gray-600">Location,Location</p>
            </div>
            </div>
            </div>
            </div>
            </div>`;
      i++;
    });
  }
  // console.log(productName)
}

// ============other functions ===========
function showPassword() {
  let pw = document.getElementById("password");
  let eye1 = document.getElementById("eyeopen");
  // console.log(pw)
  if (pw.type === "password") {
    pw.type = "text";
    eye1.src = "./icons/eyeclose.svg";
  } else {
    pw.type = "password";
    eye1.src = "./icons/eyeopen.svg";
  }
}
function showPasswordverify() {
  let pwv = document.getElementById("passwordver");
  let eye2 = document.getElementById("eyeopenv");
  if (pwv.type === "password") {
    pwv.type = "text";
    eye2.src = "./icons/eyeclose.svg";
  } else {
    pwv.type = "password";
    eye2.src = "./icons/eyeopen.svg";
  }
}

function signup() {
  let pw = document.getElementById("password");
  let pwv = document.getElementById("passwordver");
  let uname = document.getElementById("username").value;
  if (pw.value == "") {
    alert("Enter the details");
  } else if (pw.value === pwv.value) {
    alert("Login Succesful!");
    localStorage.setItem("username", uname);
    localStorage.setItem("password", pw.value);
    loginHref();
  } else {
    alert("Passwords donot match");
  }
}

function login() {
  let pw = document.getElementById("password");
  let uname = document.getElementById("username");
  let usernameRecord = localStorage.getItem("username");
  let passwordRecord = localStorage.getItem("password");
  if (usernameRecord == uname.value && passwordRecord == pw.value) {
    alert("login successful");
    home();
    localStorage.setItem("islogin", 1);
    navbar();
  } else {
    alert("Invalid password or username");
  }
}

function animationDel() {
  let btn = document.getElementById("Delete");
  let selected = document.querySelectorAll(".selProd");
  let selArr = Array.from(selected);

  if (selArr.every((ch) => !ch.checked)) {
    btn.classList.add("opacity-0", "bottom-0");
    btn.classList.remove("bottom-4");
  } else {
    btn.classList.remove("opacity-0", "bottom-0");
    btn.classList.add("bottom-4");
  }
}
function getid(selectedID) {
  console.log(selectedID);
  cart.splice(selectedID, 1);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ============Search=================
let input = document.querySelector(".search-input");
console.log(input);
input.addEventListener("keydown", (event) => checkEnter(event));

function checkEnter(event) {
  if (event.key === "Enter") {
    searchFunction();
  }
}

function searchFunction() {
  for (let i = 0; i < productName.length; i++) {
    let cards = document.getElementsByClassName(`card${i}`);
    data = cards[0];                                    // cards[0] because the cards give the HTML collection which is object but array but not both.
    let name = productName[i].toLowerCase();
    if (!name.includes(input.value.toLowerCase())) {    //if doesnt include then adds hidden class
      data.classList.add("hidden");
    } else {
      data.classList.remove("hidden");
    }
  }
}
