import { useEffect, useState, useMemo } from "react";
import { fetchProducts, getCart, addToCart, updateQty, removeFromCart, checkout, getRecs, listOrders } from "./api/client";
import ProductsGrid from "./components/ProductsGrid";
import CartPanel from "./components/CartPanel";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import OrdersList from "./components/OrdersList";
import "./styles.css";

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M14 2l8 8-6 2-4 8-4-4 8-4 2-6z"></path>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
);
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
  </svg>
);

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);
  const [recs, setRecs] = useState([]);
  const [orders, setOrders] = useState([]);

  // UI state
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [cartPinned, setCartPinned] = useState(true); // pinned by default
  const [showCartFloating, setShowCartFloating] = useState(false); // when unpinned

  // Form reset control
  const [resetKey, setResetKey] = useState(0);

  const productMap = useMemo(() => {
    const m = new Map();
    products.forEach(p => m.set(p.id, p));
    return m;
  }, [products]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    getCart().then(setCart);
    listOrders().then(setOrders);
  }, []);

  const handleAdd = async (productId, qty = 1) => {
    const updated = await addToCart({ productId, qty });
    setCart(updated);
    const data = await getRecs(productId);
    setRecs(data);
    if (!cartPinned) setShowCartFloating(true);
  };

  const handleSetQty = async (productId, nextQty) => {
    const updated = await updateQty({ productId, qty: nextQty });
    setCart(updated);
  };

  const handleRemove = async (productId) => {
    const updated = await removeFromCart(productId);
    setCart(updated);
  };

  const handleCheckout = async ({ name, email }) => {
    const payload = { name, email, cartItems: cart.items, total: cart.total };
    const { receipt } = await checkout(payload);

    // Show receipt
    setReceipt(receipt);

    // Clear UI state
    setCart({ items: [], total: 0 });
    setRecs([]);

    // Reset form fields
    setResetKey(k => k + 1);

    // Sync with server to ensure cart really empty (memory/SQLite)
    const freshCart = await getCart();
    setCart(freshCart);

    // Refresh orders list
    const latest = await listOrders();
    setOrders(latest);
  };

  const cartCount = cart.items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="page light zara">
      <header className="siteHeader light sleek">
        <div className="brand">VIBE <span>SHOP</span></div>
        <nav className="nav">
          <button className={`linkBtn ${ordersOpen ? "active" : ""}`} onClick={() => setOrdersOpen(v => !v)}>Past Orders</button>
        </nav>
        <div className="spacer" />
        <div className="controls">
          {cartPinned ? (
            <button className="chipBtn" onClick={() => setCartPinned(false)} title="Unpin cart">
              <CloseIcon /> <span>Unpin</span>
            </button>
          ) : (
            <button className="chipBtn" onClick={() => { setCartPinned(true); setShowCartFloating(false); }} title="Pin cart">
              <PinIcon /> <span>Pin</span>
            </button>
          )}
        </div>
      </header>

      <div className={`layout3 ${ordersOpen ? "withSidebar" : ""} ${!cartPinned ? "noCart" : ""}`}>
        {/* Left Sidebar: Orders */}
        <aside className={`sidebar ${ordersOpen ? "open" : ""}`}>
          <div className="sidebarHeader">
            <h3>Past Orders</h3>
            <button className="iconBtn" onClick={() => setOrdersOpen(false)} title="Close sidebar"><CloseIcon /></button>
          </div>
          <div className="sidebarBody">
            <OrdersList orders={orders} showHeader={false} />
          </div>
        </aside>

        {/* Main content: Products */}
        <main className="mainArea">

          <section id="products">
            <ProductsGrid products={products} onAdd={handleAdd} />
          </section>
        </main>

        {/* Right: Cart panel (pinned) */}
        {cartPinned && (
          <aside className="cartArea">
            <CartPanel
              cart={cart}
              productMap={productMap}
              onAdd={handleAdd}
              onSetQty={handleSetQty}
              onRemove={handleRemove}
              recs={recs}
            />
            <CheckoutForm onSubmit={handleCheckout} resetKey={resetKey} />
          </aside>
        )}
      </div>

      {/* Floating Cart when unpinned */}
      {!cartPinned && (
        <>
          <button
            className="fabCart pill"
            onClick={() => setShowCartFloating(v => !v)}
            aria-label="Open cart"
            title="Open cart"
          >
            <CartIcon /> <span>Cart ({cartCount})</span>
          </button>
          <div className={`drawerCart ${showCartFloating ? "open" : ""}`} role="dialog" aria-modal="true">
            <div className="drawerHeader">
              <h3>Your Cart</h3>
              <button className="iconBtn" onClick={() => setShowCartFloating(false)} title="Close"><CloseIcon /></button>
            </div>
            <div className="drawerBody">
              <CartPanel
                cart={cart}
                productMap={productMap}
                onAdd={handleAdd}
                onSetQty={handleSetQty}
                onRemove={handleRemove}
                recs={recs}
              />
              <CheckoutForm onSubmit={handleCheckout} resetKey={resetKey} />
            </div>
          </div>
        </>
      )}

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}
