let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price;
  }

  let countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.textContent = cart.length;
    countEl.style.display = cart.length > 0 ? "flex" : "none";
  }

  let totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = total.toFixed(2);

  let list = document.getElementById("cart-items-list");
  if (list) {
    list.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      list.innerHTML += "<li>" + item.name + " — €" + item.price.toFixed(2) + "</li>";
    }
  }
  saveCart();
}

document.querySelectorAll(".add-to-cart").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    let productEl = e.target.closest(".product");
    let name = productEl.querySelector("h3").textContent;
    let price = parseFloat(productEl.querySelector(".price").textContent.replace("€", ""));
    cart.push({ name: name, price: price });
    updateCart();
  });
});

let clearBtn = document.getElementById("clear-cart-btn");
if (clearBtn)
  clearBtn.addEventListener("click", function () {
    cart = [];
    updateCart();
  });

let form = document.querySelector("form");
if (form)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("success-msg").style.display = "block";
  });

updateCart();
