const wishlist = document.querySelector(".wishlist-container__wishlisted-products");
const productList = document.querySelector(".product-list-container__products");

function addToWishlist(event) {
    const button = event.target;
    const parentElement = button.parentElement;

    button.setAttribute("class", "hidden");

    wishlist.innerHTML += "<li class='wishlist-container__item'> <p class='wishlist-container__product-name'>" + parentElement.querySelector("p").textContent + "</p> <button class='wishlist-container__remove-from-wishlist' onclick='removeFromWishlist(event)'>Remove from wishlist</button></li>";

}

function removeFromWishlist(event){
    const button = event.target;
    const parentElement = button.parentElement;

    const products = productList.querySelectorAll("li");

    products.forEach(element => {
        if(element.querySelector("p").textContent === parentElement.querySelector("p").textContent){
            element.querySelector("button").setAttribute("class","product-list-container__add-to-wishlist-button")
        }
    });

    parentElement.remove();

}

