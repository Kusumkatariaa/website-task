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
addToCartButton.addEventListener("click", () => {
    cartIcon.classList.add("shake");
    cartBubble.style.display = "flex";
    cartBubble.textContent = quantity;
    setTimeout(() => {
        cartIcon.classList.remove("shake");
    }, 500);
});

let productImage = document.querySelector('.prodImg');
let variantImages = document.querySelectorAll('.prodVarImg');
// console.log(productImage, variantImages)
function onVariantClick() {
    variantImages.forEach((variant) => {
        variant.addEventListener('click', () => {
            variantImages.forEach((elem) => {
                elem.classList.remove("active")
            })
            variant.classList.add("active")
            let variantImgSrc = variant.src;
            productImage.src = variantImgSrc;
        })
    })

}
onVariantClick();


let header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});