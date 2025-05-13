// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initCartCount();         // Initialize cart icon count from localStorage
  bindAddToCart();         // Enable "Add to Cart" buttons
  bindCheckoutSubmit();    // Enable checkout form submission
  bindFAQToggle();         // Toggle FAQ accordion
  bindCartFunctions();     // Handle cart item quantity and removal
  updateCartTotal();       // Update cart total price
});

// --- Event Binding Functions --- //

function bindAddToCart() {
  // Add click listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      showCartPopup("✓ Item added to cart!"); // Show success popup
      let count = parseInt(localStorage.getItem("cartCount")) || 0;
      count++;
      localStorage.setItem("cartCount", count); // Save new count
      const cartDisplay = document.getElementById("cart-count");
      if (cartDisplay) cartDisplay.textContent = count; // Update UI count
    });
  });
}

function bindCheckoutSubmit() {
  // Intercept form submit and redirect
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent real submission
      window.location.href = "confirmation.html"; // Redirect
    });
  }
}

function bindFAQToggle() {
  // Toggle active class for each FAQ item
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

function bindCartFunctions() {
  // Increase quantity
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const qtyEl = btn.previousElementSibling;
      qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
      updateCartTotal();
    });
  });

  // Decrease quantity
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const qtyEl = btn.nextElementSibling;
      let count = parseInt(qtyEl.textContent);
      if (count > 1) {
        qtyEl.textContent = count - 1;
        updateCartTotal();
      }
    });
  });

  // Remove item and show popup
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".cart-item");
      item.remove();
      updateCartTotal();
      showCartPopup("❌ Item removed!");
    });
  });
}

// --- Logic Functions --- //

function updateCartTotal() {
  // Calculate and display the total price of items in the cart
  let total = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    const price = parseFloat(item.querySelector(".item-price").dataset.price);
    const quantity = parseInt(item.querySelector(".quantity").textContent);
    total += price * quantity;
  });
  const priceEl = document.getElementById("total-price");
  if (priceEl) priceEl.textContent = total.toFixed(2);
}

function initCartCount() {
  // Set the cart count icon from localStorage
  const count = parseInt(localStorage.getItem("cartCount")) || 0;
  const cartDisplay = document.getElementById("cart-count");
  if (cartDisplay) cartDisplay.textContent = count;
}

function showCartPopup(message = "✓ Item added to cart!") {
  // Display a temporary popup message on screen
  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove(); // Remove after delay
  }, 1500);
}

// --- Filter Panel Toggle --- //

function toggleFilter() {
  // Open the filter panel
  const panel = document.getElementById('filterPanel');
  if (panel) panel.classList.add('active');
}

function closeFilter() {
  // Close the filter panel
  const panel = document.getElementById('filterPanel');
  if (panel) panel.classList.remove('active');
}

// --- Image Swapping --- //

function changeImage(thumbnail) {
  // Change main image when a thumbnail is clicked
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = thumbnail.src;
    document.querySelectorAll('.thumb').forEach(img => img.classList.remove('selected'));
    thumbnail.classList.add('selected');
  }
}
