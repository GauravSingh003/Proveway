document.addEventListener("DOMContentLoaded", () => {
    const units = document.querySelectorAll(".unit");
    const addToCartBtn = document.querySelector(".cart-btn");
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".footer .total span");
    const cartItemsCount = document.querySelector(".cart p");
    const cartToggleBtn = document.querySelector(".cart");
    const showCart = document.querySelector(".showCart");
  
    let cart = [];
  
    function updateCart() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartItemsCount.textContent = `🛒 Items (${totalItems})`;
      totalElement.textContent = `$${totalPrice.toFixed(2)} USD`;
      cartItems();
    } 
  
    function cartItems() {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item) => {
        const cartItem = document.createElement("li");
        const details = item.details ? ` (${item.details})` : "";
        cartItem.textContent = `Unit: ${item.unit}, Qty: ${item.quantity}, $${(item.price * item.quantity).toFixed(2)}${details}`;
        cartItemsContainer.appendChild(cartItem);
      });
    }
  
    function addItemToCart(unit, price, details = null) {
      const existingItem = cart.find((item) => item.unit === unit && item.details === details);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ unit, price, quantity: 1, details });
      }
  
      updateCart();
    }
  
    units.forEach((unit) => {
      unit.addEventListener("click", () => {
        const radio = unit.querySelector("input[type='radio']");
        radio.checked = true;
      });
    });
  
    addToCartBtn.addEventListener("click", () => {
      const selectedUnit = document.querySelector(".unit input:checked");
      if (!selectedUnit) {
        alert("Please select a unit before adding to the cart.");
        return;
      }
    
      const unitElement = selectedUnit.closest(".unit");
      const unitNumber = unitElement.dataset.unit;
      const unitPrice = parseFloat(unitElement.dataset.price);
    
      let details = null;
      if (unitNumber === "2") {
        const size1 = document.getElementById("size1").value;
        const color1 = document.getElementById("color1").value;
        const size2 = document.getElementById("size2").value;
        const color2 = document.getElementById("color2").value;
        details = `Item 1: Size ${size1}, Color ${color1}; Item 2: Size ${size2}, Color ${color2}`;
      }
    
      addItemToCart(unitNumber, unitPrice, details);
    });
    
  
    cartToggleBtn.addEventListener("click", () => {
      showCart.classList.toggle("hideCart");
    });
    updateCart();
  });
  