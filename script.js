let page = "";
function main() {
  if (page === "home") {
    homepage();
  } else {
    product();
  }
}
let price = [];
let productName = [];
let productImage = [];

function homepage() {
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

function home() {
  window.location.href = "index.html";
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
  window.location.href = "productDesc.html";
}

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

  title.innerText = name;
  Pdesc.innerText = desc;
  pPrice.innerText = "RS." + price;
  Pimage.innerHTML = `<img src="${image}" >`;
}
