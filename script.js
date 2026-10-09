/* ==========================================================================
   CAMPUS HUB – Storefront Application Logic
   Categories: MBBS Books • Gym Nutrition Bowls
   Static data, dynamic cart, WhatsApp checkout
   ========================================================================== */

// ─── PRODUCT CATALOG DATA ───────────────────────────────────────────────────
const PRODUCTS = [
  // ══ CATEGORY: MBBS BOOKS ══
  {
    id: "book-kdt",
    name: "KD Tripathi – Pharmacology",
    subtitle: "Includes MCQ companion book · Almost untouched",
    category: "books",
    categoryLabel: "MBBS Books",
    price: 1200,
    mrp: 2100,
    image: "images/kdt_pharma.jpg",
    badge: "Like New",
    condition: "Almost Untouched",
    rating: 4.8,
    isBundle: true,
    description: "Standard reference for pharmacology. Includes drug classification, mechanism of action pathways, clinical pharmacology, and a companion MCQ practice book for competitive exam preparation.",
    highlights: [
      "Latest 8th Edition – crisp binding, clean pages",
      "No pen marks, highlights, or torn pages",
      "Companion MCQ book included free",
      "Essential for USMLE, INI-CET & NEET PG",
      "Stored in dust-free study rack"
    ]
  },
  {
    id: "book-micro",
    name: "Apurba Sastry – Microbiology",
    subtitle: "Full microbiology coverage · Pristine condition",
    category: "books",
    categoryLabel: "MBBS Books",
    price: 1200,
    mrp: 1850,
    image: "images/sastry_micro.jpg",
    badge: "Like New",
    condition: "Well Maintained",
    rating: 4.7,
    isBundle: true,
    description: "Comprehensive microbiology textbook covering bacteriology, virology, mycology, parasitology and immunology with clear flowcharts, diagrams, and chapter-wise MCQs.",
    highlights: [
      "Complete coverage – bacteria, viruses, fungi, parasites",
      "Clean pages with zero underlining",
      "Color diagrams and flowcharts intact",
      "Standard book for all medical PG exams",
      "Spine and binding in perfect condition"
    ]
  },
  {
    id: "book-robbins",
    name: "Robbins – Pathology",
    subtitle: "Includes Free 'Pathology at a Glance' companion",
    category: "books",
    categoryLabel: "MBBS Books",
    price: 1200,
    mrp: 2850,
    image: "images/robbins_pathology.jpg",
    badge: "Like New",
    condition: "Almost Untouched",
    rating: 4.9,
    isBundle: true,
    description: "The gold standard pathology reference. Robbins Basic Pathology covers general and systemic pathology with histopathology images. Comes with Pathology at a Glance companion for quick revision.",
    highlights: [
      "Includes 'Pathology at a Glance' – FREE bonus",
      "All histopathology images in pristine color",
      "No dog-eared pages or water damage",
      "Most recommended pathology book worldwide",
      "Essential for NEET PG, USMLE Step 1"
    ]
  },

  // ══ CATEGORY: GYM & FITNESS BOWLS ══
  {
    id: "gym-protein-eggs",
    name: "Protein Power Bowl",
    subtitle: "Boiled eggs, sprouts, cherry tomatoes & quinoa",
    category: "gym",
    categoryLabel: "Gym Nutrition",
    price: 199,
    mrp: 299,
    image: "images/boiled_eggs_box.jpg",
    badge: "Fresh Daily",
    condition: "Fresh Daily",
    rating: 4.9,
    isBundle: false,
    isNew: true,
    description: "High-protein meal prep bowl with perfectly boiled eggs (3 halves), fresh sprouts, cherry tomatoes, cucumbers, and microgreens on a quinoa base. 35g+ protein per serving.",
    highlights: [
      "35g+ protein per serving",
      "Fresh eggs boiled to golden perfection",
      "Quinoa + sprout base for sustained energy",
      "No preservatives, made fresh daily",
      "Perfect post-workout meal"
    ]
  },
  {
    id: "gym-green-salad",
    name: "Green Fitness Salad",
    subtitle: "Grilled paneer, avocado, chickpeas & spinach",
    category: "gym",
    categoryLabel: "Gym Nutrition",
    price: 249,
    mrp: 379,
    image: "images/green_salad_box.jpg",
    badge: "Fresh Daily",
    condition: "Fresh Daily",
    rating: 4.8,
    isBundle: false,
    isNew: true,
    description: "Gourmet fitness salad with grilled paneer cubes, creamy avocado slices, chickpeas, baby spinach, cucumber, cherry tomatoes, and house olive oil dressing. 28g protein, high fiber.",
    highlights: [
      "28g protein from paneer + chickpeas",
      "Healthy fats from fresh avocado",
      "Baby spinach base rich in iron",
      "Light olive oil dressing (no mayo)",
      "Great for cutting / weight management"
    ]
  },
  {
    id: "gym-fruit-bowl",
    name: "Fruit & Nut Energy Bowl",
    subtitle: "Strawberry, kiwi, blueberry, walnuts & yogurt",
    category: "gym",
    categoryLabel: "Gym Nutrition",
    price: 149,
    mrp: 229,
    image: "images/fruit_nut_box.jpg",
    badge: "Fresh Daily",
    condition: "Fresh Daily",
    rating: 4.7,
    isBundle: false,
    isNew: true,
    description: "Vibrant energy bowl loaded with fresh strawberries, kiwi slices, blueberries, pomegranate seeds, walnuts, chia seeds, and creamy Greek yogurt base. Perfect pre-workout or healthy snack.",
    highlights: [
      "Rich in antioxidants & vitamins",
      "Greek yogurt base – 12g protein",
      "Walnuts & chia for omega-3",
      "Natural sugars for quick energy",
      "No added sugar, 100% fresh"
    ]
  },
];

// ─── CATEGORIES DEFINITION ─────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All", icon: "🏪", count: PRODUCTS.length },
  { id: "books", label: "MBBS Books", icon: "📚", count: PRODUCTS.filter(p => p.category === "books").length },
  { id: "gym", label: "Gym Nutrition", icon: "🥗", count: PRODUCTS.filter(p => p.category === "gym").length },
];

// ─── WHATSAPP CONFIG ────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919876543210"; // Change to your actual number
const BOOK_BUNDLE_THRESHOLD = 3;
const BOOK_BUNDLE_PRICE = 3000;
const BOOK_INDIVIDUAL_PRICE = 1200;

// ─── CART STATE ─────────────────────────────────────────────────────────────
let cart = {}; // { productId: quantity }
let activeCategory = "all";
let searchQuery = "";

// ─── DOM REFERENCES ─────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  categoriesTabs: $("#categories-tabs"),
  productsGrid: $("#products-catalog-grid"),
  emptyState: $("#empty-state"),
  cartCounter: $("#cart-counter"),
  cartHeaderTotal: $("#cart-header-total"),
  categoryTitle: $("#current-category-title"),
  itemsCountDisplay: $("#items-count-display"),
  filterResetWrap: $("#filter-reset-wrap"),
  resetFilterBtn: $("#reset-filter-btn"),
  searchInput: $("#catalog-search-input"),
  searchClearBtn: $("#search-clear-btn"),

  // Cart Drawer
  cartDrawerBackdrop: $("#cart-drawer-backdrop"),
  cartDrawer: $("#cart-drawer"),
  openCartBtn: $("#open-cart-btn"),
  closeCartBtn: $("#close-cart-btn"),
  drawerItemsList: $("#drawer-items-list"),
  drawerItemsCount: $("#drawer-items-count"),
  cartEmptyView: $("#cart-empty-view"),
  drawerFooter: $("#drawer-footer"),
  drawerSubtotal: $("#drawer-subtotal"),
  drawerDiscount: $("#drawer-discount"),
  drawerDiscountRow: $("#drawer-discount-row"),
  drawerTotal: $("#drawer-total"),
  cartBundleAlert: $("#cart-bundle-alert"),
  proceedCheckoutBtn: $("#proceed-checkout-btn"),

  // Mobile Cart Bar
  mobileCartBar: $("#mobile-cart-bottombar"),
  mobileCartCount: $("#mobile-cart-count-pill"),
  mobileCartTotal: $("#mobile-cart-total-display"),
  mobileOpenCartBtn: $("#mobile-open-cart-btn"),

  // Checkout Modal
  checkoutModalBackdrop: $("#checkout-modal-backdrop"),
  checkoutModal: $("#checkout-modal"),
  closeCheckoutBtn: $("#close-checkout-modal-btn"),
  checkoutForm: $("#checkout-order-form"),
  modalSummaryTotal: $("#modal-summary-total"),
  modalSummaryItems: $("#modal-summary-items-list"),
  submitWhatsappBtn: $("#submit-whatsapp-order-btn"),
  copyOrderBtn: $("#copy-order-text-btn"),

  // Detail Modal
  detailModalBackdrop: $("#detail-modal-backdrop"),
  detailModal: $("#detail-modal"),
  closeDetailBtn: $("#close-detail-modal-btn"),
  detailImg: $("#detail-img"),
  detailBadge: $("#detail-badge"),
  detailCategory: $("#detail-category"),
  detailTitle: $("#detail-title"),
  detailSubtitle: $("#detail-subtitle"),
  detailPrice: $("#detail-price"),
  detailMrp: $("#detail-mrp"),
  detailSaveBadge: $("#detail-save-badge"),
  detailBundleHint: $("#detail-bundle-hint"),
  detailDesc: $("#detail-desc"),
  detailHighlightsList: $("#detail-highlights-list"),
  detailStepperContainer: $("#detail-stepper-container"),

  // Promo
  promoBundleBtn: $("#promo-add-bundle-btn"),

  // Empty state
  emptyResetBtn: $("#empty-reset-btn"),

  // Toast
  toastContainer: $("#toast-container"),
};

// ═══════════════════════════════════════════════════════════════════════════════
//   INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
function init() {
  renderCategories();
  renderProducts();
  bindEvents();
  initHeroCarousel();
  updateCartUI();
}

// ─── RENDER CATEGORIES ──────────────────────────────────────────────────────
function renderCategories() {
  dom.categoriesTabs.innerHTML = CATEGORIES.map(cat => `
    <button type="button" class="cat-tab ${cat.id === activeCategory ? 'active' : ''}"
            data-cat="${cat.id}" id="cat-tab-${cat.id}">
      <span class="cat-tab-icon">${cat.icon}</span>
      <span>${cat.label}</span>
      <span class="cat-tab-count">${cat.count}</span>
    </button>
  `).join("");
}

// ─── RENDER PRODUCTS ────────────────────────────────────────────────────────
function renderProducts() {
  let items = PRODUCTS;

  // Category filter
  if (activeCategory !== "all") {
    items = items.filter(p => p.category === activeCategory);
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Update status bar
  const catObj = CATEGORIES.find(c => c.id === activeCategory);
  dom.categoryTitle.textContent = catObj ? catObj.label : "All Products";
  if (activeCategory === "all") dom.categoryTitle.textContent = "All Products";
  dom.itemsCountDisplay.textContent = `${items.length} item${items.length !== 1 ? "s" : ""} available`;

  // Filter reset visibility
  dom.filterResetWrap.style.display = (activeCategory !== "all" || searchQuery.trim()) ? "block" : "none";

  if (items.length === 0) {
    dom.productsGrid.style.display = "none";
    dom.emptyState.style.display = "block";
    return;
  }

  dom.productsGrid.style.display = "";
  dom.emptyState.style.display = "none";

  dom.productsGrid.innerHTML = items.map(p => {
    const inCart = cart[p.id] || 0;

    return `
      <div class="product-card" data-id="${p.id}" id="card-${p.id}">
        <div class="card-img-container" data-action="detail" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" class="card-img" loading="lazy">
         
        </div>

        <div class="card-body">
          <h3 class="card-title" data-action="detail" data-id="${p.id}">${p.name}</h3>
        

          <div class="card-footer-row">
            <div class="card-price-group">
              <span class="card-price">₹${p.price.toLocaleString("en-IN")}</span>
              ${p.mrp > p.price ? `<span class="card-mrp">₹${p.mrp.toLocaleString("en-IN")}</span>` : ""}
            </div>

            <div class="card-btn-wrap">
              ${inCart > 0
                ? `<div class="cart-stepper">
                     <button type="button" class="stepper-btn minus" data-action="decrement" data-id="${p.id}" aria-label="Decrease quantity">−</button>
                     <span class="stepper-qty">${inCart}</span>
                     <button type="button" class="stepper-btn plus" data-action="increment" data-id="${p.id}" aria-label="Increase quantity">+</button>
                   </div>`
                : `<button type="button" class="btn-add-to-cart" data-action="add" data-id="${p.id}">
                     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                       <line x1="12" y1="5" x2="12" y2="19"></line>
                       <line x1="5" y1="12" x2="19" y2="12"></line>
                     </svg>
                     <span>Add</span>
                   </button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
//   CART LOGIC
// ═══════════════════════════════════════════════════════════════════════════════
function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  updateCartUI();
  renderProducts();
  const product = PRODUCTS.find(p => p.id === productId);
  showToast(`✓ ${product.name} added to cart`);
  bumpCartBadge();
}

function incrementCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
    updateCartUI();
    renderProducts();
  }
}

function decrementCart(productId) {
  if (cart[productId]) {
    cart[productId]--;
    if (cart[productId] <= 0) delete cart[productId];
    updateCartUI();
    renderProducts();
  }
}

function removeFromCart(productId) {
  delete cart[productId];
  updateCartUI();
  renderProducts();
  renderDrawerItems();
}

function getCartTotals() {
  let subtotal = 0;
  let totalItems = 0;
  let bookCount = 0;

  Object.entries(cart).forEach(([id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (p) {
      subtotal += p.price * qty;
      totalItems += qty;
      if (p.isBundle) bookCount += qty;
    }
  });

  // Book bundle discount: if 3 or more books, charge ₹3000 instead of ₹1200*3
  let discount = 0;
  let bundleApplied = false;
  if (bookCount >= BOOK_BUNDLE_THRESHOLD) {
    const fullSets = Math.floor(bookCount / BOOK_BUNDLE_THRESHOLD);
    const remainder = bookCount % BOOK_BUNDLE_THRESHOLD;
    const bundleCost = fullSets * BOOK_BUNDLE_PRICE + remainder * BOOK_INDIVIDUAL_PRICE;
    const regularCost = bookCount * BOOK_INDIVIDUAL_PRICE;
    discount = regularCost - bundleCost;
    bundleApplied = true;
  }

  const total = subtotal - discount;
  return { subtotal, discount, total, totalItems, bookCount, bundleApplied };
}

function updateCartUI() {
  const { subtotal, discount, total, totalItems, bundleApplied } = getCartTotals();

  // Header badge
  dom.cartCounter.textContent = totalItems;
  dom.cartHeaderTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  // Mobile bar
  if (totalItems > 0) {
    dom.mobileCartBar.style.display = "";
    requestAnimationFrame(() => dom.mobileCartBar.classList.add("visible"));
  } else {
    dom.mobileCartBar.classList.remove("visible");
    setTimeout(() => { dom.mobileCartBar.style.display = "none"; }, 350);
  }
  dom.mobileCartCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;
  dom.mobileCartTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  // Drawer counts
  dom.drawerItemsCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

  // Drawer footer
  if (totalItems > 0) {
    dom.cartEmptyView.style.display = "none";
    dom.drawerItemsList.style.display = "";
    dom.drawerFooter.style.display = "";
  } else {
    dom.cartEmptyView.style.display = "";
    dom.drawerItemsList.style.display = "none";
    dom.drawerFooter.style.display = "none";
  }

  // Pricing
  dom.drawerSubtotal.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (bundleApplied && discount > 0) {
    dom.drawerDiscountRow.style.display = "";
    dom.drawerDiscount.textContent = `-₹${discount.toLocaleString("en-IN")}`;
    dom.cartBundleAlert.style.display = "";
  } else {
    dom.drawerDiscountRow.style.display = "none";
    dom.cartBundleAlert.style.display = "none";
  }
  dom.drawerTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  // Update the detail modal stepper if open
  updateDetailStepper();
}

function bumpCartBadge() {
  dom.cartCounter.classList.add("bump");
  setTimeout(() => dom.cartCounter.classList.remove("bump"), 300);
}

// ─── DRAWER ITEMS RENDER ────────────────────────────────────────────────────
function renderDrawerItems() {
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    dom.drawerItemsList.innerHTML = "";
    return;
  }

  dom.drawerItemsList.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(pr => pr.id === id);
    const qty = cart[id];
    if (!p) return "";
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-variant">${p.categoryLabel}</div>
          <div class="cart-item-price">₹${(p.price * qty).toLocaleString("en-IN")}</div>
        </div>
        <div class="cart-item-controls">
          <div class="mini-stepper">
            <button type="button" class="mini-stepper-btn" data-action="drawer-dec" data-id="${p.id}">−</button>
            <span class="mini-stepper-qty">${qty}</span>
            <button type="button" class="mini-stepper-btn" data-action="drawer-inc" data-id="${p.id}">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
//   DETAIL MODAL
// ═══════════════════════════════════════════════════════════════════════════════
let currentDetailId = null;

function openDetailModal(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;
  currentDetailId = productId;

  dom.detailImg.src = p.image;
  dom.detailImg.alt = p.name;
  dom.detailBadge.textContent = p.condition;
  dom.detailCategory.textContent = p.categoryLabel;
  dom.detailTitle.textContent = p.name;
  dom.detailSubtitle.textContent = p.subtitle;
  dom.detailPrice.textContent = `₹${p.price.toLocaleString("en-IN")}`;
  dom.detailMrp.textContent = `MRP ₹${p.mrp.toLocaleString("en-IN")}`;

  const savePercent = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  dom.detailSaveBadge.textContent = `${savePercent}% OFF`;
  dom.detailSaveBadge.style.display = savePercent > 0 ? "" : "none";
  dom.detailBundleHint.style.display = p.isBundle ? "" : "none";
  dom.detailDesc.textContent = p.description;

  dom.detailHighlightsList.innerHTML = p.highlights
    .map(h => `<li>${h}</li>`)
    .join("");

  updateDetailStepper();

  dom.detailModalBackdrop.classList.add("open");
  dom.detailModal.classList.add("open");
}

function updateDetailStepper() {
  if (!currentDetailId) return;
  const inCart = cart[currentDetailId] || 0;

  if (inCart > 0) {
    dom.detailStepperContainer.innerHTML = `
      <div class="cart-stepper">
        <button type="button" class="stepper-btn minus" data-action="decrement" data-id="${currentDetailId}">−</button>
        <span class="stepper-qty">${inCart}</span>
        <button type="button" class="stepper-btn plus" data-action="increment" data-id="${currentDetailId}">+</button>
      </div>
    `;
  } else {
    dom.detailStepperContainer.innerHTML = `
      <button type="button" class="btn-add-to-cart" data-action="add" data-id="${currentDetailId}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add to Cart</span>
      </button>
    `;
  }
}

function closeDetailModal() {
  dom.detailModalBackdrop.classList.remove("open");
  dom.detailModal.classList.remove("open");
  currentDetailId = null;
}

// ═══════════════════════════════════════════════════════════════════════════════
//   CART DRAWER
// ═══════════════════════════════════════════════════════════════════════════════
function openCartDrawer() {
  renderDrawerItems();
  dom.cartDrawerBackdrop.classList.add("open");
  dom.cartDrawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  dom.cartDrawerBackdrop.classList.remove("open");
  dom.cartDrawer.classList.remove("open");
  document.body.style.overflow = "";
}

// ═══════════════════════════════════════════════════════════════════════════════
//   CHECKOUT MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function openCheckoutModal() {
  closeCartDrawer();

  const { total } = getCartTotals();
  dom.modalSummaryTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  // Summary items
  dom.modalSummaryItems.innerHTML = Object.entries(cart).map(([id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (!p) return "";
    return `
      <span class="summary-item-chip">
        <img src="${p.image}" alt="${p.name}">
        ${p.name.split("–")[0].trim()} × ${qty}
      </span>
    `;
  }).join("");

  setTimeout(() => {
    dom.checkoutModalBackdrop.classList.add("open");
    dom.checkoutModal.classList.add("open");
    document.body.classList.add("modal-open-mobile");
  }, 200);
}

function closeCheckoutModal() {
  dom.checkoutModalBackdrop.classList.remove("open");
  dom.checkoutModal.classList.remove("open");
  document.body.classList.remove("modal-open-mobile");
}

// ─── BUILD ORDER TEXT ───────────────────────────────────────────────────────
function buildOrderText(name) {
  const { subtotal, discount, total, bundleApplied } = getCartTotals();
  let lines = [];

  lines.push("🛒 *NEW ORDER – ALLINONE*");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("");

  Object.entries(cart).forEach(([id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (p) {
      lines.push(`📦 *${p.name}*`);
      lines.push(`   ${p.subtitle}`);
      lines.push(`   Qty: ${qty} × ₹${p.price.toLocaleString("en-IN")} = ₹${(p.price * qty).toLocaleString("en-IN")}`);
      lines.push("");
    }
  });

  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push(`Subtotal: ₹${subtotal.toLocaleString("en-IN")}`);

  if (bundleApplied && discount > 0) {
    lines.push(`🎉 *3-Book Combo Discount: -₹${discount.toLocaleString("en-IN")}*`);
  }

  lines.push(`*💰 Total: ₹${total.toLocaleString("en-IN")}*`);
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push(`👤 Customer Name: *${name}*`);
  lines.push("");
  lines.push("_Sent from ALLINONE Student Store_");

  return lines.join("\n");
}

// ─── SUBMIT TO WHATSAPP ─────────────────────────────────────────────────────
function submitToWhatsApp(e) {
  e.preventDefault();

  const nameInput = $("#customer-name");
  const name = nameInput ? nameInput.value.trim() : "";

  if (!name) {
    showToast("⚠️ Please enter your name");
    if (nameInput) nameInput.focus();
    return;
  }

  const orderText = buildOrderText(name);
  const encoded = encodeURIComponent(orderText);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  window.open(waUrl, "_blank");
  showToast("🎉 Order sent to WhatsApp!");

  // Clear cart and close
  cart = {};
  updateCartUI();
  renderProducts();
  closeCheckoutModal();
  dom.checkoutForm.reset();
}

// ─── COPY ORDER TEXT ────────────────────────────────────────────────────────
function copyOrderText() {
  const nameInput = $("#customer-name");
  const name = (nameInput ? nameInput.value.trim() : "") || "Customer";

  const orderText = buildOrderText(name);

  navigator.clipboard.writeText(orderText).then(() => {
    showToast("📋 Order details copied!");
  }).catch(() => {
    showToast("⚠️ Failed to copy. Try again.");
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//   PROMO BUNDLE (Add all 3 books at once)
// ═══════════════════════════════════════════════════════════════════════════════
function addBookBundle() {
  const bookProducts = PRODUCTS.filter(p => p.isBundle);
  bookProducts.forEach(p => {
    if (!cart[p.id]) cart[p.id] = 1;
  });
  updateCartUI();
  renderProducts();
  showToast("📚 All 3 MBBS books added – ₹3,000 combo deal!");
  bumpCartBadge();
}

// ═══════════════════════════════════════════════════════════════════════════════
//   HERO BANNER CAROUSEL (Auto-scroll & Controls)
// ═══════════════════════════════════════════════════════════════════════════════
let currentHeroSlide = 0;
let heroAutoTimer = null;

function initHeroCarousel() {
  const carousel = $("#hero-carousel");
  if (!carousel) return;

  const slides = $$(".hero-slide");
  const dots = $$(".carousel-dot");
  const prevBtn = $("#carousel-prev-btn");
  const nextBtn = $("#carousel-next-btn");
  const bundleBtn = $("#hero-btn-bundle");
  const gymBtn = $("#hero-btn-gym");

  if (slides.length === 0) return;

  function goToSlide(idx) {
    currentHeroSlide = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === currentHeroSlide);
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === currentHeroSlide);
    });
  }

  function startAutoScroll() {
    stopAutoScroll();
    heroAutoTimer = setInterval(() => {
      goToSlide(currentHeroSlide + 1);
    }, 4500);
  }

  function stopAutoScroll() {
    if (heroAutoTimer) {
      clearInterval(heroAutoTimer);
      heroAutoTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentHeroSlide - 1);
      startAutoScroll();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentHeroSlide + 1);
      startAutoScroll();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index, 10);
      goToSlide(idx);
      startAutoScroll();
    });
  });

  if (bundleBtn) {
    bundleBtn.addEventListener("click", addBookBundle);
  }

  if (gymBtn) {
    gymBtn.addEventListener("click", () => {
      activeCategory = "gym";
      renderCategories();
      renderProducts();
      const catalog = $("#products-catalog-grid");
      if (catalog) {
        catalog.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  // Touch swipe support for mobile
  let touchStartX = 0;
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoScroll();
  }, { passive: true });

  carousel.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide(currentHeroSlide - 1);
      else goToSlide(currentHeroSlide + 1);
    }
    startAutoScroll();
  }, { passive: true });

  startAutoScroll();
}

// ═══════════════════════════════════════════════════════════════════════════════
//   SEARCH
// ═══════════════════════════════════════════════════════════════════════════════
let searchDebounce = null;

function handleSearch(val) {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = val;
    dom.searchClearBtn.style.display = val ? "" : "none";
    renderProducts();
  }, 200);
}

function clearSearch() {
  searchQuery = "";
  dom.searchInput.value = "";
  dom.searchClearBtn.style.display = "none";
  renderProducts();
}

function resetFilters() {
  activeCategory = "all";
  searchQuery = "";
  dom.searchInput.value = "";
  dom.searchClearBtn.style.display = "none";
  renderCategories();
  renderProducts();
}

// ═══════════════════════════════════════════════════════════════════════════════
//   TOAST
// ═══════════════════════════════════════════════════════════════════════════════
function showToast(message) {
  const t = document.createElement("div");
  t.className = "toast-msg";
  t.innerHTML = `<span>${message}</span>`;
  dom.toastContainer.appendChild(t);

  setTimeout(() => {
    t.classList.add("out");
    setTimeout(() => t.remove(), 300);
  }, 2200);
}

// ═══════════════════════════════════════════════════════════════════════════════
//   EVENT BINDINGS (Delegation)
// ═══════════════════════════════════════════════════════════════════════════════
function bindEvents() {
  // ─── Category Tab Clicks ───
  dom.categoriesTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".cat-tab");
    if (!tab) return;
    activeCategory = tab.dataset.cat;
    renderCategories();
    renderProducts();
  });

  // ─── Product Grid Delegated Clicks ───
  dom.productsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "add") addToCart(id);
    else if (action === "increment") incrementCart(id);
    else if (action === "decrement") decrementCart(id);
    else if (action === "detail") openDetailModal(id);
  });

  // ─── Detail Modal Delegated Clicks ───
  dom.detailStepperContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "add") addToCart(id);
    else if (action === "increment") incrementCart(id);
    else if (action === "decrement") decrementCart(id);
  });

  // ─── Cart Drawer Open/Close ───
  dom.openCartBtn.addEventListener("click", openCartDrawer);
  dom.mobileOpenCartBtn.addEventListener("click", openCartDrawer);
  dom.closeCartBtn.addEventListener("click", closeCartDrawer);
  dom.cartDrawerBackdrop.addEventListener("click", closeCartDrawer);

  // ─── Drawer Item Clicks ───
  dom.drawerItemsList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === "drawer-inc") {
      incrementCart(id);
      renderDrawerItems();
    } else if (btn.dataset.action === "drawer-dec") {
      decrementCart(id);
      renderDrawerItems();
    }
  });

  // ─── Checkout Flow ───
  dom.proceedCheckoutBtn.addEventListener("click", openCheckoutModal);
  dom.closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
  dom.checkoutModalBackdrop.addEventListener("click", closeCheckoutModal);
  dom.checkoutForm.addEventListener("submit", submitToWhatsApp);
  dom.copyOrderBtn.addEventListener("click", copyOrderText);

  // ─── Detail Modal ───
  dom.closeDetailBtn.addEventListener("click", closeDetailModal);
  dom.detailModalBackdrop.addEventListener("click", closeDetailModal);

  // ─── Search ───
  dom.searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  dom.searchClearBtn.addEventListener("click", clearSearch);

  // ─── Filter Reset ───
  dom.resetFilterBtn.addEventListener("click", resetFilters);
  if (dom.emptyResetBtn) {
    dom.emptyResetBtn.addEventListener("click", resetFilters);
  }

  // ─── Promo Bundle Button (if present) ───
  if (dom.promoBundleBtn) {
    dom.promoBundleBtn.addEventListener("click", addBookBundle);
  }

  // ─── Keyboard Escape to close modals ───
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailModal();
      closeCartDrawer();
      closeCheckoutModal();
    }
  });
}

// ─── BOOT ───────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
