document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 10.97 },
    { id: 2, name: "Product 2", price: 20.74 },
    { id: 3, name: "Product 3", price: 30.55 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || []; // ✅ Load from storage

  const productList = document.getElementById("productList");
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartTotal = document.getElementById("cartTotal");
  const totalPrice = document.getElementById("totalPrice");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Render products
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "bg-white", "p-4", "rounded-xl", "shadow-md",
      "flex", "flex-col", "items-center", "text-center",
      "hover:shadow-lg", "transition"
    );
    productDiv.innerHTML = `
      <span class="text-lg font-semibold text-gray-800">${product.name}</span>
      <span class="text-green-600 font-bold mb-3">$${product.price.toFixed(2)}</span>
      <button data-id="${product.id}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2">
        <i class="fa-solid fa-cart-plus"></i> Add to Cart
      </button>
    `;
    productList.appendChild(productDiv);
  });

  // Add to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      const button = e.target.closest("button");
      const productID = parseInt(button.getAttribute("data-id"));
      const product = products.find(p => p.id === productID);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  // Remove from cart
  function removeFromCart(index) {
    cart.splice(index, 1); // remove item at index
    saveCart();
    renderCart();
  }

  // Save to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render cart
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "flex", "justify-between", "items-center", 
          "bg-gray-50", "p-3", "rounded-lg", "shadow-sm",
          "hover:shadow-md", "transition"
        );
        cartItem.innerHTML = `
          <div>
            <p class="font-semibold text-gray-800">${item.name}</p>
            <p class="text-green-600 font-bold">$${item.price.toFixed(2)}</p>
          </div>
          <button data-index="${index}" class="removeBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow flex items-center gap-2 transition">
            <i class="fa-solid fa-trash"></i> Remove
          </button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPrice.textContent = `$${total.toFixed(2)}`;
    } else {
      emptyCart.classList.remove("hidden");
      cartTotal.classList.add("hidden");
    }
  }

  // Handle remove button click
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeBtn") || e.target.closest(".removeBtn")) {
      const index = parseInt(e.target.closest("button").getAttribute("data-index"));
      removeFromCart(index);
    }
  });

  // Checkout
  checkoutBtn.classList.add(
    "w-full", "bg-green-600", "hover:bg-green-700",
    "text-white", "py-3", "rounded-xl", "shadow-md",
    "transition", "font-semibold", "mt-4", "flex", "items-center", "justify-center", "gap-2"
  );
  checkoutBtn.innerHTML = `<i class="fa-solid fa-credit-card"></i> Checkout`;

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("✅ Checkout successful! Thank you for your purchase.");
    renderCart();
  });

  // Initial render
  renderCart();
});
