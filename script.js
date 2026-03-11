function selector(id) {
    return document.getElementById(id);
}
console
let hoursText = selector("hours");
let minutesText = selector("minutes");
let secondsText = selector("seconds");

function updateTimer() {
    let now = new Date();
    let currentHours = now.getHours() % 12;
    let currentMinutes = now.getMinutes();
    let currentSeconds = now.getSeconds();

    hoursText.textContent = `${currentHours}`.padStart(2, '0');
    minutesText.textContent = `${currentMinutes}`.padStart(2, '0');
    secondsText.textContent = `${currentSeconds}`.padStart(2, '0');
}
updateTimer();
setInterval(updateTimer, 1000);


let plusButton = selector("increase");
let minusButton = selector("decrease");
let quantityText = selector("quantity");

let quantity = 1;
quantityText.textContent = quantity;

plusButton.addEventListener("click", () => {
    quantity++;
    quantityText.textContent = quantity;
});

minusButton.addEventListener("click", () => {
    quantity--;
    if (quantity < 1) {
        quantity = 1;
    }
    quantityText.textContent = quantity;
});

let addToCartButton = selector("add-to-cart");
let cartIcon = selector("cart");
let cartBubble = cartIcon.querySelector(".bubble");
let cartCount = 0;
let cartItems = [];
let cartItemsContainer = document.querySelector(".cart-items");
let cartTotal = document.querySelector("#cart-total");

addToCartButton.addEventListener("click", () => {
    cartCount += quantity;
    cartBubble.style.display = "flex";
    cartBubble.textContent = cartCount;
    cartIcon.classList.add("shake");
    setTimeout(() => {
        cartIcon.classList.remove("shake");
    }, 500);

    // selected variant, quantity, price and image ------ get 
    let activeOption = document.querySelector(".option.active");
    let selectedOptionName = activeOption.querySelector('.variant-name').textContent;
    let selectedOptionImage = activeOption.querySelector('img').src;
    let selectedOptionPrice = Number(activeOption.querySelector('.variant-price').textContent);
    let quantitySelected = Number(quantityText.textContent);

    console.log(activeOption, selectedOptionName, selectedOptionImage, selectedOptionPrice, quantitySelected);

    let itemDetails = {
        name: selectedOptionName,
        image: selectedOptionImage,
        price: selectedOptionPrice,
        quantity: quantitySelected
    }
    console.log(itemDetails);

    // cartItems.push(itemDetails);
    console.log(cartItems);

    cartItems.push(itemDetails);
    updateCartUI();
});

let productImage = document.querySelector('.prodImg');
// let variantImages = document.querySelectorAll('.prodVarImg');
let options = document.querySelectorAll('.option');
// console.log(productImage, variantImages)
function onVariantClick() {
    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach((elem) => {
                elem.classList.remove("active")
            })
            option.classList.add("active")
            let varImg = option.querySelector('img').src;
            productImage.src = varImg;
        })
    })

}

onVariantClick();

function setDefaultVariant() {
    let firstOption = options[0];
    firstOption.classList.add("active");
    productImage.src = firstOption.querySelector('img').src;
}

setDefaultVariant();

let header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


let cart = selector("cart");
let updateCart = selector("updateCart");
let closeCartButton = selector("close-cart");
updateCart.style.display = "none";
cart.addEventListener("click", () => {
    updateCart.style.display = "block";
});

closeCartButton.addEventListener("click", () => {
    updateCart.style.display = "none";
});


function updateCartUI() {

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let cartItemHTML = `
        <div class="cart-item">
            <img src="${item.image}" alt="Cart Item Image">
            <div class="item-details">
                <div class="item-name">Elegant Necklace</div>
                <div class="variant-name">${item.name}</div>

                <div class="quantity-selector">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>

                <div class="item-price">Price: $${itemTotal.toFixed(2)}</div>
            </div>
        </div>
        `;

        cartItemsContainer.innerHTML += cartItemHTML;

    });

    cartTotal.textContent = total.toFixed(2);
}

updateCartUI();
