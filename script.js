const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const cross  = document.querySelector(".cross");
// w-[50vw] opacity-0 -z-10

hamburger.addEventListener("click", ()=>{
    console.log("clicked");
    hamburgerMenu.classList.remove("w-[50vw]","opacity-0","-z-10");
    hamburgerMenu.classList.add("w-[100vw]","opacity-100","z-10");
})
cross.addEventListener("click", ()=>{
    hamburgerMenu.classList.add("w-[50vw]","opacity-0","-z-10");
    hamburgerMenu.classList.remove("w-[100vw]","opacity-100","z-10");
})

let cards = document.querySelector(".cards");

let getData = async () =>{
    let data = await fetch("./info.json");
    let response = await data.json()
    response.forEach(item => {        
        cards.innerHTML = cards.innerHTML + ` <div class="card m-1 rounded-xl border-b-2 border break-words overflow-hidden w-56 hover:bg-gray-300">
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
        });
}
getData()