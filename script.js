let page = "";

function main() {
  if (page === "home") {
    homepage();
  } else if(page==="products"){
    product();
  }
}

// ==============NAV BAR==================
let nav_rep = document.getElementById("nav-bar-replace");

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
        <li class="contactUs p-4 font-bold hover:underline hover:cursor-pointer">Contact us</li>
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
          <li class="contactUs p-4 hover:bg-yellow-500">Contact us</li>
        </ul>
    </div>
  </div>
</nav>`



let price = [];
let productName = [];
let productImage = [];

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
        ` <div class="card m-1 rounded-xl  border border-neutral-400 break-words overflow-hidden w-72 hover:cursor-pointer" onClick="productDescription(${item.id})">
        <div class="flex justify-center">
        <img src="${item.image}" class="size-52 m-2">
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
      price.push(item.cost);
      productName.push(item.productName);
      productImage.push(item.image);
    });
  };
  getData();
}

// =============ENDPOINTS==========

function home() {
  window.location.href = "index.html";
}
function productHref(){
  window.location.href = "productDesc.html";
}
function cartHref(){
  window.location.href = "cart.html";
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
  const toptitle=document.getElementById("head-title");
  console.log(toptitle)
  toptitle.innerHTML = name;
  title.innerText = name;
  Pdesc.innerText = desc;
  pPrice.innerText = "RS." + price;
  Pimage.innerHTML = `<img src="${image}" >`;
}

// =============== CART ====================

let cart_href_sel = document.querySelector(".cart");
