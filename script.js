const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const cross  = document.querySelector(".cross");
// w-[50vw] opacity-0 -z-10

function hamburgerClose(){
  // console.log("closed");
  hamburgerMenu.classList.add("w-[50vw]","opacity-0","-z-10");
  hamburgerMenu.classList.remove("w-[100vw]","opacity-100","z-10");
}


hamburger.addEventListener("click", ()=>{
    // console.log("clicked");
    hamburgerMenu.classList.remove("w-[50vw]","opacity-0","-z-10");
    hamburgerMenu.classList.add("w-[100vw]","opacity-100","z-10");
})
cross.addEventListener("click", ()=>hamburgerClose())

let cards = document.querySelector(".cards");
let price =[]
let productName = []
let productImage = []
let getData = async () =>{
    let data = await fetch("./info.json");
    let response = await data.json()
    console.log(response)
    response.forEach(item => {        
        cards.innerHTML = cards.innerHTML + ` <div class="card m-1 rounded-xl  border border-neutral-400 break-words overflow-hidden w-72 hover:cursor-pointer" onClick="openmodel(${item.id})">
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
        </div>`
        price.push(item.cost)
        productName.push(item.productName);
        productImage.push(item.image)
        });
}
getData()

const products = document.querySelector(".products");
const info = document.querySelector(".showinfo");

function home(){
  window.location.href = "index.html"
}


let description = []
async function getDescription() {
  let data = await fetch("http://127.0.0.1:5500/description.json");
  let response = await data.json();
  // console.log(response[0].description)
  response.forEach(item => {
    description.push(item.description);
  })
}
getDescription()


function openmodel(cardID){
  // products.classList.add("hidden");
  // info.classList.remove("hidden");

  window.location.href="productDesc.html"

  const title = document.getElementById("product-title");
  console.log(title);
  const Pdesc= document.getElementById("productDes");
  const Pimage = document.getElementById("productImage");
  const pPrice = document.getElementById("product-price");

  title.innerText = productName[cardID]
  Pdesc.innerText = description[cardID]
  pPrice.innerText = "RS." + price[cardID]
  Pimage.innerHTML = `<img src="${productImage[cardID]}" >`
}


