import { getCookie } from "./modules/cookie.js";
import { getData } from "./modules/httpReq.js";
import { shoretnText } from "./modules/stringFunc.js";

let allProducts = null;
let search = "";
let category = "all";
const LoginBtn = document.getElementById("login");
const dashboardBtn = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchBtn = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

const renderProducts = (products) => {
    mainContent.innerHTML = "";
    products.forEach(product => {
        const jsx = `
            <div>
                <img alt=${product.title} 
                src=${product.image} />
                <h4>${shoretnText(product.title)}</h4>
                <div id="price"> 
                    <p>${product.price} $</p>
                    <button>
                        Buy
                        <i class="fa-solid fa-cart-shopping"></i> 
                    </button>
                </div>
                <div id="rate">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating.rate}</span>
                </div>
                <div id="count">
                    <i class="fa-solid fa-user"></i>
                    <span>${product.rating.count}</span>
                </div>
            </div>
        `
        mainContent.innerHTML += jsx;
    });
}

const init = async () => {
    const cookie = getCookie();
    if (cookie) {
        LoginBtn.style.display = "none";
    } else {
        dashboardBtn.style.display = "none";
    }
    allProducts = await getData("products");
    renderProducts (allProducts);
}
const filterProducts = () => {
    let filteredProducts = null;
    filteredProducts = allProducts.filter(product => {
        if (category === "all"){
            return product.title.toLowerCase().includes(search);
        } else {
            return (product.title.toLowerCase().includes(search) &&
            product.category.toLowerCase() === category
            );
        }
    });
    if (filteredProducts.length === 0) {
        mainContent.innerHTML = `<p id="search-result">No results found.</p>`;
    } else {
        renderProducts(filteredProducts);
    }
};

const searchHandler = () => {
    search = inputBox.value.trim().toLowerCase();
    filterProducts();
 }
const filterHandler = (event) => {
    category = event.target.innerText.toLowerCase();
    listItems.forEach ((li) => {
        if (li.innerText.toLowerCase() === category) {
            li.className = "selected";
        } else {
            li.className = "";
        }
    })
    filterProducts();
};
const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        searchHandler();
    }
};
const handleInputClick = () => {
    inputBox.value = ""; 
};

document.addEventListener("DOMContentLoaded", init);
searchBtn.addEventListener("click", searchHandler);
listItems.forEach (li => li.addEventListener("click" , filterHandler));
inputBox.addEventListener("keypress", handleKeyPress);
inputBox.addEventListener("click", handleInputClick);