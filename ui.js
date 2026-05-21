// UI rendering functions (V2)

export function renderMenu(menuItems, currentCategory, menuGrid, createCardHTML) {
  const filtered = currentCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === currentCategory);
  const html = filtered.map(createCardHTML).join('');
  menuGrid.innerHTML = html;
  const addButtons = document.querySelectorAll('.card__add');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      window.addToCart(id);
    });
  });
}

export function renderCart(cart, menuItems, cartItemsContainer, cartTotal, cartBadge) {
  const items = Object.keys(cart);
  let totalCount = 0;
  let totalPrice = 0;

  if (cartItemsContainer) cartItemsContainer.innerHTML = '';

  items.forEach(id => {
    const item = menuItems.find(d => d.id === Number(id));
    if (!item) return;
    const count = cart[id];
    totalCount += count;
    totalPrice += item.price * count;

    if (cartItemsContainer) {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="left">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <div class="quantity-controls" data-id="${id}">
              <button class="cart-item__btn" onclick="window.removeOneFromCart(${id})">−</button>
              <span class="cart-item__count">${count}</span>
              <button class="cart-item__btn" onclick="window.addToCart(${id})">+</button>
            </div>
          </div>
        </div>
        <span class="cart-item-price">₽${item.price * count}</span>
      `;
      cartItemsContainer.appendChild(div);
    }
  });

if (cartBadge) cartBadge.textContent = totalCount;
if (cartTotal) cartTotal.textContent = items.length === 0 ? '' : totalPrice;
const cartTotalContainer = cartTotal ? cartTotal.parentElement : null;
if (cartTotalContainer) {
  cartTotalContainer.style.display = items.length === 0 ? 'none' : 'block';
}
const cartEmptySticker = document.getElementById('cartEmptySticker');
if (cartEmptySticker) {
  cartEmptySticker.style.display = items.length === 0 ? 'block' : 'none';
}
const cartSumEl = document.getElementById('cartSum');
if (cartSumEl) {
  cartSumEl.textContent = totalPrice + ' ₽';
  cartSumEl.style.display = items.length === 0 ? 'none' : 'inline';
}
if (cartEmptySticker) {
  if (items.length === 0) {
    cartEmptySticker.style.display = 'block';
    if (cartTotal) cartTotal.textContent = '';
  } else {
    cartEmptySticker.style.display = 'none';
  }
}
}