import { useState } from "react";

const stores = [
  { id: 1, name: "New Día Cannabis Co.", location: "Fenway", distance: "0.3 mi", rating: 4.9, reviews: 1847, tag: "Flagship", color: "#c8102e" },
  { id: 2, name: "Garden Remedies", location: "Newton", distance: "4.1 mi", rating: 4.7, reviews: 932, tag: "Medical+Rec", color: "#2d6a4f" },
  { id: 3, name: "NETA", location: "Brookline", distance: "2.8 mi", rating: 4.6, reviews: 1204, tag: "Popular", color: "#1a1a2e" },
];

const products = [
  { id: 1, storeId: 1, storeName: "New Día", category: "Flower", name: "Blue Dream", brand: "Berkshire Roots", thc: "22%", cbd: "0.1%", weight: "3.5g", price: 42, img: "🌸", inStock: true },
  { id: 2, storeId: 1, storeName: "New Día", category: "Pre-Rolls", name: "OG Kush Pre-Roll", brand: "LEVIA", thc: "19%", cbd: "0%", weight: "1g", price: 14, img: "🚬", inStock: true },
  { id: 3, storeId: 2, storeName: "Garden Remedies", category: "Edibles", name: "Midnight Mint Gummies", brand: "Garden Remedies", thc: "5mg", cbd: "5mg", weight: "10pk", price: 28, img: "🍬", inStock: true },
  { id: 4, storeId: 2, storeName: "Garden Remedies", category: "Flower", name: "Purple Punch", brand: "Canna Provisions", thc: "24%", cbd: "0.2%", weight: "3.5g", price: 48, img: "💜", inStock: true },
  { id: 5, storeId: 3, storeName: "NETA", category: "Concentrates", name: "Live Resin Badder", brand: "NETA", thc: "78%", cbd: "1%", weight: "1g", price: 55, img: "🍯", inStock: false },
  { id: 6, storeId: 3, storeName: "NETA", category: "Edibles", name: "Sour Watermelon Gummies", brand: "Kiva", thc: "10mg", cbd: "0%", weight: "20pk", price: 32, img: "🍉", inStock: true },
  { id: 7, storeId: 1, storeName: "New Día", category: "Concentrates", name: "Wedding Cake Wax", brand: "Berkshire Roots", thc: "81%", cbd: "0%", weight: "1g", price: 58, img: "🍰", inStock: true },
  { id: 8, storeId: 2, storeName: "Garden Remedies", category: "Pre-Rolls", name: "Sativa Variety Pack", brand: "Garden Remedies", thc: "18%", cbd: "0%", weight: "5x0.5g", price: 38, img: "🌿", inStock: true },
];

const categories = ["All", "Flower", "Pre-Rolls", "Edibles", "Concentrates"];

export default function App() {
  const [selectedStores, setSelectedStores] = useState([1, 2, 3]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(null); // null | 'cart' | 'address' | 'confirm'

  const toggleStore = (id) => {
    setSelectedStores(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = products.filter(p =>
    selectedStores.includes(p.storeId) &&
    (selectedCategory === "All" || p.category === selectedCategory) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0a", minHeight: "100vh", color: "#f0ece4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .store-chip { transition: all 0.15s ease; cursor: pointer; }
        .store-chip:hover { transform: translateY(-1px); }
        .cat-btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .cat-btn:hover { opacity: 0.85; }
        .product-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .add-btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .add-btn:hover { opacity: 0.85; transform: scale(1.04); }
        .cart-btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .cart-btn:hover { opacity: 0.9; }
        input { outline: none; }
        input::placeholder { color: #555; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1c1c1c", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0a0a0a", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "#c8102e", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff", letterSpacing: 1 }}>B</span>
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, color: "#f0ece4" }}>BUDHUB</span>
          <span style={{ fontSize: 11, color: "#555", marginLeft: 4, fontWeight: 300 }}>Massachusetts Delivery</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#141414", border: "1px solid #222", borderRadius: 8, padding: "8px 14px" }}>
            <span style={{ fontSize: 13, color: "#888" }}>📍</span>
            <span style={{ fontSize: 13, color: "#aaa" }}>Boston, MA 02215</span>
          </div>

          <button className="cart-btn" onClick={() => setCheckoutStep('cart')} style={{ background: "#c8102e", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            <span>Cart</span>
            {cartCount > 0 && <span style={{ background: "#fff", color: "#c8102e", borderRadius: 10, fontSize: 11, fontWeight: 700, padding: "1px 7px" }}>{cartCount}</span>}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 4, lineHeight: 1, color: "#f0ece4", marginBottom: 8 }}>
            SHOP EVERY<br />
            <span style={{ color: "#c8102e" }}>BOSTON DISPENSARY</span><br />
            IN ONE PLACE
          </h1>
          <p style={{ color: "#666", fontSize: 14, fontWeight: 300, marginTop: 12 }}>Real-time menus from top Massachusetts dispensaries. Delivered to your door.</p>
        </div>

        {/* Store Selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Stores Near You</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {stores.map(store => {
              const active = selectedStores.includes(store.id);
              return (
                <div key={store.id} className="store-chip" onClick={() => toggleStore(store.id)} style={{ background: active ? "#141414" : "#0d0d0d", border: `1px solid ${active ? store.color : "#1e1e1e"}`, borderRadius: 10, padding: "12px 16px", minWidth: 200 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: active ? "#f0ece4" : "#555" }}>{store.name}</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: active ? store.color : "#333", marginTop: 3, flexShrink: 0 }}></span>
                  </div>
                  <div style={{ display: "flex", gap: 10, fontSize: 12, color: "#555" }}>
                    <span>{store.distance}</span>
                    <span>⭐ {store.rating}</span>
                    <span style={{ fontSize: 10, background: "#1a1a1a", color: "#666", padding: "1px 6px", borderRadius: 4 }}>{store.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden" }}>
            {categories.map(cat => (
              <button key={cat} className="cat-btn" onClick={() => setSelectedCategory(cat)} style={{ background: selectedCategory === cat ? "#c8102e" : "transparent", color: selectedCategory === cat ? "#fff" : "#666", padding: "8px 16px", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                {cat}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products or brands..."
            style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, padding: "9px 16px", fontSize: 13, color: "#f0ece4", width: 240, fontFamily: "'DM Sans', sans-serif" }}
          />
          <span style={{ fontSize: 12, color: "#444", marginLeft: "auto" }}>{filtered.length} products across {selectedStores.length} stores</span>
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(product => {
            const store = stores.find(s => s.id === product.storeId);
            const inCart = cart.find(i => i.id === product.id);
            return (
              <div key={product.id} className="product-card" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#161616", height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, borderBottom: "1px solid #1a1a1a", position: "relative" }}>
                  {product.img}
                  {!product.inStock && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>Out of Stock</span>
                    </div>
                  )}
                  <div style={{ position: "absolute", top: 8, left: 8, background: store.color, borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 600, color: "#fff" }}>
                    {product.storeName}
                  </div>
                </div>

                <div style={{ padding: "14px 14px 12px" }}>
                  <div style={{ fontSize: 10, color: "#555", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{product.category}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f0ece4", marginBottom: 2, lineHeight: 1.3 }}>{product.name}</div>
                  <div style={{ fontSize: 12, color: "#555", marginBottom: 10 }}>{product.brand} · {product.weight}</div>

                  <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, background: "#1a1a1a", color: "#888", padding: "3px 8px", borderRadius: 4 }}>THC {product.thc}</span>
                    {product.cbd !== "0%" && product.cbd !== "0mg" && (
                      <span style={{ fontSize: 11, background: "#1a1a1a", color: "#888", padding: "3px 8px", borderRadius: 4 }}>CBD {product.cbd}</span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#f0ece4", letterSpacing: 1 }}>${product.price}</span>
                    <button
                      className="add-btn"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                      style={{
                        background: inCart ? "#1e3a1e" : "#c8102e",
                        color: inCart ? "#4caf50" : "#fff",
                        borderRadius: 7,
                        padding: "7px 14px",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        opacity: product.inStock ? 1 : 0.3,
                        cursor: product.inStock ? "pointer" : "not-allowed"
                      }}>
                      {inCart ? `In Cart (${inCart.qty})` : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14 }}>No products found. Try adjusting your filters.</div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {checkoutStep && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", justifyContent: "flex-end" }} onClick={() => setCheckoutStep(null)}>
          <div style={{ width: 420, background: "#0f0f0f", border: "1px solid #1c1c1c", borderRight: "none", height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }} onClick={e => e.stopPropagation()}>

            {checkoutStep === 'cart' && (
              <>
                <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #1c1c1c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2 }}>YOUR CART</span>
                  <button onClick={() => setCheckoutStep(null)} style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer" }}>✕</button>
                </div>

                {cart.length === 0 ? (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#444", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontSize: 32 }}>🛒</div>
                    <div style={{ fontSize: 14 }}>Your cart is empty</div>
                  </div>
                ) : (
                  <>
                    <div style={{ flex: 1, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {cart.map(item => (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#141414", borderRadius: 10, padding: "12px 14px" }}>
                          <span style={{ fontSize: 24 }}>{item.img}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#f0ece4" }}>{item.name}</div>
                            <div style={{ fontSize: 11, color: "#555" }}>{item.storeName} · {item.weight}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>${item.price * item.qty}</div>
                            <div style={{ fontSize: 11, color: "#555" }}>qty {item.qty}</div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 14 }}>✕</button>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: "16px 24px", borderTop: "1px solid #1c1c1c" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "#666" }}>
                        <span>Subtotal</span><span>${cartTotal}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "#666" }}>
                        <span>Delivery fee</span><span>$5.99</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "#666" }}>
                        <span>MA Cannabis Tax (20%)</span><span>${(cartTotal * 0.2).toFixed(2)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 15, fontWeight: 700, color: "#f0ece4", borderTop: "1px solid #1c1c1c", paddingTop: 12 }}>
                        <span>Total</span><span>${(cartTotal + 5.99 + cartTotal * 0.2).toFixed(2)}</span>
                      </div>
                      <button className="add-btn" onClick={() => setCheckoutStep('address')} style={{ width: "100%", background: "#c8102e", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                        Continue to Delivery
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {checkoutStep === 'address' && (
              <>
                <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #1c1c1c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2 }}>DELIVERY INFO</span>
                  <button onClick={() => setCheckoutStep('cart')} style={{ background: "none", border: "none", color: "#555", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {["Full Name", "Delivery Address", "Apt / Unit (optional)", "City, State, ZIP", "Phone Number"].map(label => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                      <input placeholder={label} style={{ width: "100%", background: "#141414", border: "1px solid #222", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f0ece4", fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                  ))}
                  <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 8, padding: "12px 14px", marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>ID VERIFICATION REQUIRED</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>You must be 21+ with valid government-issued ID. Our courier will verify on delivery.</div>
                  </div>
                  <button className="add-btn" onClick={() => setCheckoutStep('confirm')} style={{ width: "100%", background: "#c8102e", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginTop: 4 }}>
                    Review Order
                  </button>
                </div>
              </>
            )}

            {checkoutStep === 'confirm' && (
              <>
                <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #1c1c1c" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2 }}>ORDER PLACED</span>
                </div>
                <div style={{ padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, marginBottom: 8 }}>YOU'RE ALL SET</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>Your order has been sent to the dispensary. A licensed courier will pick it up and deliver within 45-90 minutes. You'll get a text with live tracking.</div>
                  <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "16px", marginBottom: 24, textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "#555", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Order Status</div>
                    {["Order confirmed", "Dispensary preparing", "Courier assigned", "Out for delivery"].map((step, i) => (
                      <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#4caf50" : "#222" }}></div>
                        <span style={{ fontSize: 13, color: i === 0 ? "#f0ece4" : "#444" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <button className="add-btn" onClick={() => { setCheckoutStep(null); setCart([]); }} style={{ width: "100%", background: "#1a1a1a", color: "#f0ece4", border: "1px solid #2a2a2a", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                    Back to Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
