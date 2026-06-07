
// ─── PRICE ───────────────────────────────────────────────
function fmt(n) {
  return '₱' + Number(n).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ─── CART (localStorage) ─────────────────────────────────
function getCart() {
    try { return JSON.parse(localStorage.getItem('uw_cart') || '[]'); }
    catch (e) { return []; }
}

function saveCart(items) {
    localStorage.setItem('uw_cart', JSON.stringify(items));
updateCartBadge();
}

    function addToCart(product, size, qty) {
    const cart = getCart();
    const key = `${product.id}__${size}`;
    const existing = cart.find(i => i.key === key);
if (existing) {
    existing.qty += qty;
} else {
cart.push({
    key,
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size,
    qty
});
}
saveCart(cart);
showToast(`${product.name} added to cart`);
}

function removeFromCart(key) {
const cart = getCart().filter(i => i.key !== key);
saveCart(cart);
}

function getCartTotal() {
return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
return getCart().reduce((s, i) => s + i.qty, 0);
}

// ─── NAVBAR CART BADGE ────────────────────────────────────
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
const n = getCartCount();
    badge.textContent = n;
    badge.classList.toggle('show', n > 0);
}

// ─── TOAST ───────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
let t = document.getElementById('toast');
if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
}
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── NAVBAR RENDER ────────────────────────────────────────
function renderNavbar(activePage) {
const pages = [
    { label:'Shop All', href:'shop.html', slug:'shop' },
    { label:'Sale', href:'shop.html?sale=1', slug:'sale' },
];
const links = pages.map(p =>
    `<li><a href="${p.href}">${p.label}</a></li>`
).join('');

const nav = document.getElementById('navbar');
if (!nav) return;
nav.innerHTML = `
    <a class="nav-logo" href="index.html">UNDRWRLD</a>
    <ul class="nav-links">${links}</ul>
    <button class="nav-cart" onclick="location.href='cart.html'" aria-label="Cart">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
    <span class="cart-badge" id="cart-badge">0</span>
    </button>
`;
updateCartBadge();
}

// ─── FOOTER RENDER ────────────────────────────────────────
function renderFooter() {
const el = document.getElementById('footer');
if (!el) return;

el.innerHTML = `
<div class="container">

  <div class="footer-grid">

    <div class="footer-col">
      <h4>SHOP</h4>
      <ul>
        <li><a href="shop.html">All Products</a></li>
        <li><a href="shop.html?cat=T-shirts">T-Shirts</a></li>
        <li><a href="shop.html?cat=shorts">Shorts</a></li>
        <li><a href="shop.html?cat=hoodies">Hoodies & Jackets</a></li>
        <li><a href="shop.html?cat=sweats">Sweats</a></li>
        <li><a href="shop.html?cat=footwear">Footwear</a></li>
        <li><a href="shop.html?cat=headwear">Headwear</a></li>
        <li><a href="shop.html?cat=accessories">Accessories</a></li>
        <li><a href="shop.html?sale=1">Sale</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>COMPANY</h4>

      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>SUPPORT</h4>

      <ul>
        <li><button class="footer-support-btn" type="button" onclick="toggleInfo('cs')">Customer Service</button></li>
        <li><button class="footer-support-btn" type="button" onclick="toggleInfo('shipping')">Shipping & Returns</button></li>
        <li><button class="footer-support-btn" type="button" onclick="toggleInfo('faq')">FAQ</button></li>
      </ul>
    </div>

  </div>

  <div id="info-box" class="info-box" aria-hidden="true">
      <button class="close-btn" type="button" onclick="closeInfo()" aria-label="Close">&times;</button>
      <div id="info-content"></div>
  </div>

  <div class="footer-bottom">
      <p>&copy; 2026 UNDRWRLD. All rights reserved.</p>
  </div>

</div>
`;
}

// ─── PRODUCT CARD HTML ────────────────────────────────────
function toggleInfo(type) {
  const box = document.getElementById("info-box");
  const content = document.getElementById("info-content");
  if (!box || !content) return;

  let html = "";

  switch(type) {
    case "cs":
      html = `
        <div class="info-content-wrap">
          <h2>Customer Service</h2>
          <p>Email: <strong>info@undrwrld.com</strong></p>
          <p>Phone: <strong>+63 947 758 1640</strong></p>
          <p>
            For questions about your order, sizing, returns, exchanges,
            or product availability, contact our support team.
          </p>
        </div>
      `;
      break;

    case "shipping":
      html = `
        <div class="info-content-wrap">
          <h2>Shipping & Returns</h2>

          <p>
            Thanks for shopping at <strong>UNDRWRLD</strong>. We appreciate the fact that you like our clothing design.
            We realize there are times when an item may become damaged during shipment
            or may not be exactly what you were expecting. We are here to help you resolve these issues
            as quickly and easily as possible.
          </p>

          <p>
            Should you need to return or exchange an item, please thoroughly review this policy,
            then contact us for assistance with your claim.
          </p>

          <h3>How do I return my order?</h3>
          <p>
            To make sure that you are satisfied with the product you receive,
            please inspect the contents as soon as your order arrives.
          </p>

          <p>Only the following items are eligible for a refund or exchange:</p>
          <ul>
            <li>Products received in a damaged state</li>
            <li>Products not in satisfactory quality</li>
            <li>Incorrect products supplied to you</li>
          </ul>

          <p>Gift cards and premium cards cannot be returned.</p>

          <p>
            Claims for a refund or exchange must be made within <strong>three (3) days</strong>
            of receipt by emailing: <strong>info@undrwrld.com</strong>
          </p>

          <p>
            A copy of the receipt or proof of purchase must be presented together
            with an uncut video of opening the package.
          </p>

          <h3>Return Options</h3>
          <ul>
            <li>Return via courier service</li>
            <li>Return at one of our retail stores</li>
          </ul>

          <h3>A. Postal Return</h3>
          <ol>
            <li>Email our Customer Service team.</li>
            <li>Provide your order details and reason for return.</li>
            <li>Print the return form provided by Customer Service.</li>
            <li>Pack the item and insert the return form.</li>
            <li>Proceed to your preferred courier service.</li>
            <li>Keep the tracking number as proof of shipment.</li>
          </ol>

          <h3>B. In-Store Return</h3>
          <p>Visit our store at:</p>
          <p><strong>Kamias 1, Mambugan, Antipolo City</strong></p>

          <p>
            Within 30 days of receiving your parcel, our in-store team
            will assist you with the return process.
          </p>

          <p>
            If we approve the return, you will be notified of the next steps
            for receiving your replacement, store credit, or refund.
          </p>

          <p>
            Approved refunds will be processed as soon as possible,
            and in any event within 30 days.
          </p>

          <h3>Shipping</h3>
          <p>
            UNDRWRLD is not responsible for any damage or loss resulting from shipments returned
            to the freight location, incorrect delivery information supplied by the customer,
            or the inability of the recipient to receive the package on the specified delivery date.
          </p>

          <p>
            Once the package has been successfully delivered to the correct address
            by the third-party carrier, handling and delivery conditions are beyond our control.
          </p>

          <p>
            For more information:<br>
            Email: <strong>info@undrwrld.com</strong><br>
            Phone: <strong>+63 947 758 1640</strong>
          </p>
        </div>
      `;
      break;

    case "faq":
      html = `
        <div class="info-content-wrap">
          <h2>Frequently Asked Questions</h2>

          <div class="faq-item">
            <h3>1. How do I order?</h3>
            <p>Just browse, select your item, choose your size, and click <strong>Add to Cart</strong> then <strong>Checkout</strong>.</p>
          </div>

          <div class="faq-item">
            <h3>2. What payment methods do you accept?</h3>
            <ul>
              <li>GCash</li>
              <li>COD (Cash on Delivery)</li>
              <li>Bank Transfer</li>
            </ul>
          </div>

          <div class="faq-item">
            <h3>3. How can I track my order?</h3>
            <p>You'll receive a tracking link via email once your order has been shipped.</p>
          </div>

          <div class="faq-item">
            <h3>4. Can I cancel my order?</h3>
            <p>Yes, but only before your order has been shipped.</p>
          </div>

          <div class="faq-item">
            <h3>5. What if I got the wrong size?</h3>
            <p>We offer exchanges within 7 days. Customers are responsible for the shipping fee.</p>
          </div>

          <div class="faq-item">
            <h3>6. Do you restock items?</h3>
            <p>Limited drops only. Once an item is sold out, it may not return.</p>
          </div>

          <div class="faq-item">
            <h3>7. How long does shipping take?</h3>
            <ul>
              <li><strong>Metro Manila:</strong> 2-5 business days</li>
              <li><strong>Provincial Areas:</strong> 5-10 business days</li>
            </ul>
            <p>Shipping times may vary during holidays, sales, and high-volume periods.</p>
          </div>

          <div class="faq-item">
            <h3>8. Do you ship nationwide?</h3>
            <p>Yes, we ship nationwide within the Philippines through our trusted courier partners.</p>
          </div>

          <div class="faq-item">
            <h3>9. Can I change my shipping address after placing an order?</h3>
            <p>Address changes are only allowed before the order has been packed or shipped. Please contact customer support immediately.</p>
          </div>

          <div class="faq-item">
            <h3>10. What happens if my package is returned to sender?</h3>
            <p>Packages returned due to incorrect address information or failed delivery attempts may require additional shipping fees for redelivery.</p>
          </div>

          <div class="faq-item">
            <h3>11. Are all items authentic UNDRWRLD products?</h3>
            <p>Yes. All products sold through our official store are 100% authentic UNDRWRLD merchandise.</p>
          </div>

          <div class="faq-item">
            <h3>12. What should I do if I receive a damaged item?</h3>
            <p>Please provide the following:</p>
            <ul>
              <li>Proof of purchase</li>
              <li>Photos or videos of the item</li>
              <li>Uncut unboxing video</li>
            </ul>
            <p>Our team will review your claim and assist you accordingly.</p>
          </div>

          <div class="faq-item">
            <h3>13. How do I know which size to choose?</h3>
            <p>Please refer to the Size Guide available on each product page. If you're unsure, contact our customer support.</p>
          </div>

          <div class="faq-item">
            <h3>14. Can I order multiple items in one checkout?</h3>
            <p>Yes. You may add multiple products to your cart and complete them in a single checkout transaction.</p>
          </div>

          <div class="faq-item">
            <h3>15. Do you offer refunds?</h3>
            <p>Refunds are only available for approved claims involving:</p>
            <ul>
              <li>Damaged products</li>
              <li>Incorrect items received</li>
              <li>Quality issues</li>
            </ul>
            <p>Refund requests are subject to review and approval.</p>
          </div>

          <div class="faq-item">
            <h3>16. How can I contact UNDRWRLD?</h3>
            <p>Email: <strong>info@undrwrld.com</strong></p>
            <p>Phone: <strong>+63 947 758 1640</strong></p>
          </div>
        </div>
      `;
      break;
  }

  content.innerHTML = html;
  box.style.display = "block";
  box.setAttribute("aria-hidden", "false");
}

function closeInfo() {
  const box = document.getElementById("info-box");
  if (!box) return;

  box.style.display = "none";
  box.setAttribute("aria-hidden", "true");
}

function productCardHTML(p) {
const badgeHTML = p.badge
? `<span class="product-badge ${p.badge.toLowerCase()}">${p.badge}</span>`
: (!p.inStock ? `<span class="product-badge out">Sold Out</span>` : '');

const priceHTML = p.badge === 'SALE'
? `<span class="price-current sale">${fmt(p.price)}</span><span class="price-original">${fmt(p.original)}</span>`
: `<span class="price-current">${fmt(p.price)}</span>`;
return `

<div class="product-card" onclick="location.href='product.html?id=${p.id}'">
<div class="product-img-wrap">
<img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy">
${badgeHTML}

</div>
<div class="product-info">
<div class="product-name">${p.name}</div>
<div class="product-price">${priceHTML}</div>
</div>
</div>`;
}
