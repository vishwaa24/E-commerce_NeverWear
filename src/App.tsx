import { useEffect, useState } from "react";

type IconName =
  | "arrow"
  | "bag"
  | "chevron"
  | "close"
  | "heart"
  | "menu"
  | "search"
  | "user";

function Icon({ name, size = 20, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    >
      {paths[name]}
    </svg>
  );
}

const images = {
  hero: "https://images.unsplash.com/photo-1559697242-a465f2578a95?auto=format&fit=crop&w=2200&q=90",
  woman: "https://images.unsplash.com/photo-1661110546797-d86cc72a2765?auto=format&fit=crop&w=1000&q=85",
  stairs: "https://images.unsplash.com/photo-1535487958887-032fb5767ade?auto=format&fit=crop&w=1000&q=85",
  wall: "https://images.unsplash.com/photo-1518590713842-629f89f09c9f?auto=format&fit=crop&w=1000&q=85",
  white: "https://images.unsplash.com/photo-1595188525947-4ba148279529?auto=format&fit=crop&w=1000&q=85",
  black: "https://images.unsplash.com/photo-1615903040611-e599dfaa6752?auto=format&fit=crop&w=1000&q=85",
  blue: "https://images.unsplash.com/photo-1700585560126-beb156752da1?auto=format&fit=crop&w=1000&q=85",
  graffiti: "https://images.unsplash.com/photo-1654076698795-a9f6c4c691f2?auto=format&fit=crop&w=1000&q=85",
  forest: "https://images.unsplash.com/photo-1564099982275-376c4057d42a?auto=format&fit=crop&w=1000&q=85",
  campaign: "https://images.unsplash.com/photo-1596129050968-24ea0d26f0ce?auto=format&fit=crop&w=2200&q=90",
  green: "https://images.unsplash.com/photo-1759853900057-bd622dd45028?auto=format&fit=crop&w=1200&q=85",
};

type Product = {
  name: string;
  price: string;
  old?: string;
  image: string;
  tag: string;
  color: string;
  category: "oversized" | "hoodies";
};

const initialProducts: Product[] = [
  { name: "No Signal Oversized Tee", price: "₹1,499", old: "₹1,899", image: images.woman, tag: "NEW DROP", color: "#171717", category: "oversized" },
  { name: "Afterdark Graphic Tee", price: "₹1,299", image: images.black, tag: "BESTSELLER", color: "#e6e3da", category: "oversized" },
  { name: "Static Noise Heavy Tee", price: "₹1,599", image: images.blue, tag: "LIMITED", color: "#315d87", category: "oversized" },
  { name: "Off Grid Oversized Tee", price: "₹1,399", old: "₹1,699", image: images.graffiti, tag: "20% OFF", color: "#716b62", category: "oversized" },
  { name: "Void Culture Tee", price: "₹1,299", image: images.white, tag: "RESTOCKED", color: "#eeeeea", category: "oversized" },
  { name: "Midnight Utility Hoodie", price: "₹2,799", image: images.forest, tag: "NEW", color: "#3d4437", category: "hoodies" },
];

const categories = [
  { name: "Oversized", count: "38 styles", image: images.stairs },
  { name: "Graphic Tees", count: "52 styles", image: images.graffiti },
  { name: "Minimal", count: "24 styles", image: images.white },
  { name: "Hoodies", count: "19 styles", image: images.forest },
];

function ProductCard({
  product,
  onAdd,
  onOpen,
  liked,
  onToggleWishlist,
}: {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  liked: boolean;
  onToggleWishlist: (product: Product) => void;
}) {
  return (
    <article
      className="product-card"
      onClick={() => onOpen(product)}
      onKeyDown={(event) => { if (event.key === "Enter") onOpen(product); }}
      role="link"
      tabIndex={0}
    >
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-tag">{product.tag}</span>
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(event) => { event.stopPropagation(); onToggleWishlist(product); }}
        >
          <Icon name="heart" size={18} filled={liked} />
        </button>
        <button className="quick-add" onClick={(event) => { event.stopPropagation(); onAdd(product); }}>QUICK ADD <span>+</span></button>
      </div>
      <div className="product-copy">
        <div>
          <h3>{product.name}</h3>
          <div className="price"><strong>{product.price}</strong>{product.old && <s>{product.old}</s>}</div>
        </div>
        <div className="swatches" aria-label="Available colors">
          <span style={{ background: product.color }} />
          <span className="light-swatch" />
          <small>+2</small>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && <button className="text-link">{link} <Icon name="arrow" size={18} /></button>}
    </div>
  );
}

type CatalogPageName = "oversized" | "hoodies" | "collections";
type ShopPage = "home" | CatalogPageName | "login" | "wishlist" | "cart" | "product" | "admin";

function CatalogPage({
  page,
  onAdd,
  onOpen,
  wishlist,
  onToggleWishlist,
  products,
}: {
  page: CatalogPageName;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  products: Product[];
}) {
  const catalogProducts = page === "collections" ? products : products.filter((product) => product.category === page);
  const titles = {
    oversized: {
      eyebrow: "THE SIGNATURE FIT",
      title: "OVERSIZED",
      copy: "Relaxed silhouettes. Heavyweight cotton. Built to take up space.",
    },
    hoodies: {
      eyebrow: "LAYER UP / STAY OUT",
      title: "HOODIES",
      copy: "Premium layers engineered for late nights and colder streets.",
    },
    collections: {
      eyebrow: "THE COMPLETE ARCHIVE",
      title: "ALL COLLECTION",
      copy: "Every NEVER WEAR piece, together in one unfiltered collection.",
    },
  };
  const content = titles[page];

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.copy}</p>
        <div className="catalog-count">{String(catalogProducts.length).padStart(2, "0")} PRODUCTS</div>
      </section>
      <section className="catalog-products">
        <div className="catalog-toolbar">
          <span>SHOWING {catalogProducts.length} OF {catalogProducts.length}</span>
          <button>FILTER +</button>
          <button>SORT BY <Icon name="chevron" size={15} /></button>
        </div>
        <div className={`product-grid ${catalogProducts.length === 1 ? "single-product" : ""}`}>
          {catalogProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onAdd={onAdd}
              onOpen={onOpen}
              liked={wishlist.includes(product.name)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function LoginPage({ onAdminLogin, onCustomerLogin }: { onAdminLogin: () => void; onCustomerLogin: () => void }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [adminStep, setAdminStep] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (createAccount) {
      onCustomerLogin();
      return;
    }
    if (email.toLowerCase() === "admin@neverwear.in" && password === "NeverWear@2025") {
      setAdminStep(true);
      return;
    }
    onCustomerLogin();
  };

  const verifyAdmin = (event: React.FormEvent) => {
    event.preventDefault();
    if (authCode === "123456") onAdminLogin();
    else setError("That authenticator code is not valid. Try 123456 for this demo.");
  };

  return (
    <div className="account-page">
      <div className="account-visual">
        <img src={images.campaign} alt="NEVER WEAR streetwear campaign" />
        <div>
          <span>NEVER WEAR / MEMBERS</span>
          <h1>YOUR WORLD.<br />YOUR WARDROBE.</h1>
        </div>
      </div>
      <section className="account-form">
        <span className="eyebrow">{adminStep ? "SECURE ADMIN ACCESS" : createAccount ? "JOIN THE MOVEMENT" : "WELCOME BACK"}</span>
        <h2>{adminStep ? "VERIFY IT'S YOU" : createAccount ? "CREATE ACCOUNT" : "SIGN IN"}</h2>
        <p>{adminStep ? "Enter the 6-digit code from your Google Authenticator app to continue to the admin dashboard." : createAccount ? "Get early access to drops, faster checkout, and a wishlist that stays yours." : "One sign-in for customers and the NEVER WEAR admin team."}</p>
        {adminStep ? (
          <form onSubmit={verifyAdmin}>
            <label>AUTHENTICATOR CODE<input className="otp-input" inputMode="numeric" maxLength={6} value={authCode} onChange={(event) => setAuthCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" autoFocus required /></label>
            {error && <p className="form-error">{error}</p>}
            <button className="account-submit" type="submit">VERIFY &amp; CONTINUE <Icon name="arrow" /></button>
            <button className="back-login" type="button" onClick={() => { setAdminStep(false); setAuthCode(""); setError(""); }}>BACK TO SIGN IN</button>
            <small className="demo-note">DEMO AUTHENTICATOR CODE: 123456</small>
          </form>
        ) : (
          <>
            <form onSubmit={submitLogin}>
              {createAccount && <label>FULL NAME<input type="text" placeholder="Your name" required /></label>}
              <label>EMAIL ADDRESS<input type="email" placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label>PASSWORD<input type="password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
              {!createAccount && <button className="forgot-link" type="button">FORGOT PASSWORD?</button>}
              <button className="account-submit" type="submit">{createAccount ? "CREATE MY ACCOUNT" : "SIGN IN"} <Icon name="arrow" /></button>
            </form>
            {!createAccount && <div className="admin-demo"><strong>ADMIN DEMO</strong><span>admin@neverwear.in</span><span>NeverWear@2025</span></div>}
            <div className="account-switch">
              <span>{createAccount ? "ALREADY A MEMBER?" : "NEW TO NEVER WEAR?"}</span>
              <button onClick={() => setCreateAccount(!createAccount)}>{createAccount ? "SIGN IN" : "CREATE ACCOUNT"}</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function WishlistPage({
  wishlist,
  onAdd,
  onOpen,
  onToggleWishlist,
  onShop,
  products,
}: {
  wishlist: string[];
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onShop: () => void;
  products: Product[];
}) {
  const savedProducts = products.filter((product) => wishlist.includes(product.name));
  return (
    <div className="utility-page">
      <div className="utility-heading">
        <span className="eyebrow">SAVED FOR LATER</span>
        <h1>YOUR WISHLIST</h1>
        <p>{savedProducts.length} {savedProducts.length === 1 ? "PIECE" : "PIECES"}</p>
      </div>
      {savedProducts.length ? (
        <div className="product-grid">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onAdd={onAdd}
              onOpen={onOpen}
              liked
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="heart" size={42} />
          <h2>NOTHING SAVED YET</h2>
          <p>Tap the heart on anything you want to come back to.</p>
          <button onClick={onShop}>EXPLORE COLLECTION <Icon name="arrow" /></button>
        </div>
      )}
    </div>
  );
}

function CartPage({
  cartItems,
  onRemove,
  onShop,
  products,
}: {
  cartItems: string[];
  onRemove: (name: string) => void;
  onShop: () => void;
  products: Product[];
}) {
  const grouped = products
    .map((product) => ({ product, quantity: cartItems.filter((name) => name === product.name).length }))
    .filter((item) => item.quantity > 0);
  const subtotal = grouped.reduce((sum, item) => sum + Number(item.product.price.replace(/[₹,]/g, "")) * item.quantity, 0);
  return (
    <div className="utility-page cart-page">
      <div className="utility-heading">
        <span className="eyebrow">READY WHEN YOU ARE</span>
        <h1>YOUR BAG</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? "ITEM" : "ITEMS"}</p>
      </div>
      {grouped.length ? (
        <div className="full-cart-layout">
          <div className="full-cart-items">
            {grouped.map(({ product, quantity }) => (
              <article className="full-cart-item" key={product.name}>
                <img src={product.image} alt={product.name} />
                <div className="full-cart-copy">
                  <span>{product.tag}</span>
                  <h2>{product.name}</h2>
                  <p>BLACK / M</p>
                  <strong>{product.price}</strong>
                  <div className="full-cart-actions">
                    <div className="quantity"><button>−</button><span>{quantity}</span><button>+</button></div>
                    <button onClick={() => onRemove(product.name)}>REMOVE</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <span className="eyebrow">ORDER SUMMARY</span>
            <div><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
            <div><span>Shipping</span><strong className="free-shipping">FREE</strong></div>
            <div className="summary-total"><span>TOTAL</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
            <label>DISCOUNT CODE<div><input placeholder="Enter code" /><button>APPLY</button></div></label>
            <button className="checkout-button">PROCEED TO CHECKOUT <Icon name="arrow" /></button>
            <small>SECURE CHECKOUT · EASY 30-DAY RETURNS</small>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="bag" size={42} />
          <h2>YOUR BAG IS EMPTY</h2>
          <p>Your next favourite piece is waiting.</p>
          <button onClick={onShop}>SHOP THE COLLECTION <Icon name="arrow" /></button>
        </div>
      )}
    </div>
  );
}

function ProductPage({
  product,
  onAdd,
  wishlist,
  onToggleWishlist,
  onOpen,
  products,
}: {
  product: Product;
  onAdd: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onOpen: (product: Product) => void;
  products: Product[];
}) {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const related = products.filter((item) => item.name !== product.name).slice(0, 3);
  const liked = wishlist.includes(product.name);
  return (
    <div className="pdp">
      <section className="pdp-main">
        <div className="pdp-gallery">
          <div className="pdp-image-main"><img src={product.image} alt={`${product.name} front view`} /><span>FRONT VIEW</span></div>
          <div><img src={product.image} alt={`${product.name} detail view`} /><span>DETAIL VIEW</span></div>
        </div>
        <div className="pdp-info">
          <span className="eyebrow">{product.tag} / NEVER WEAR</span>
          <div className="pdp-title-row">
            <h1>{product.name}</h1>
            <button className={`pdp-heart ${liked ? "liked" : ""}`} onClick={() => onToggleWishlist(product)} aria-label="Toggle wishlist"><Icon name="heart" filled={liked} /></button>
          </div>
          <div className="pdp-price"><strong>{product.price}</strong>{product.old && <s>{product.old}</s>}<span>INCL. OF ALL TAXES</span></div>
          <div className="pdp-divider" />
          <div className="selector-head"><strong>COLOUR</strong><span>BLACK</span></div>
          <div className="pdp-colors"><button style={{ background: product.color }} aria-label="Selected color" /><button aria-label="Off-white color" /></div>
          <div className="selector-head"><strong>SELECT SIZE</strong><button>SIZE GUIDE</button></div>
          <div className="size-grid">{["XS", "S", "M", "L", "XL", "XXL"].map((item) => <button className={size === item ? "selected" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div>
          <div className="purchase-row">
            <div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div>
            <button className="add-to-bag" onClick={() => { for (let index = 0; index < quantity; index += 1) onAdd(product); }}>ADD TO BAG <Icon name="bag" /></button>
          </div>
          <div className="delivery-check"><label htmlFor="pincode">DELIVERY CHECK</label><div><input id="pincode" inputMode="numeric" placeholder="Enter PIN code" /><button>CHECK</button></div></div>
          <div className="product-details">
            <details open><summary>DESCRIPTION <span>+</span></summary><p>An oversized everyday essential with a dropped shoulder, roomy body, and signature NEVER WEAR attitude. Designed for structure without sacrificing comfort.</p></details>
            <details><summary>FIT &amp; FABRIC <span>+</span></summary><p>Relaxed unisex fit. Premium 240 GSM combed cotton with a soft, substantial hand feel. Model is 6' and wears size M.</p></details>
            <details><summary>SHIPPING &amp; RETURNS <span>+</span></summary><p>Free shipping above ₹1,499. Easy returns and exchanges within 30 days of delivery.</p></details>
          </div>
        </div>
      </section>
      <section className="pdp-related">
        <SectionHeading eyebrow="COMPLETE YOUR LOOK" title="YOU MAY ALSO LIKE" />
        <div className="product-grid">
          {related.map((item) => <ProductCard key={item.name} product={item} onAdd={onAdd} onOpen={onOpen} liked={wishlist.includes(item.name)} onToggleWishlist={onToggleWishlist} />)}
        </div>
      </section>
      <div className="mobile-purchase"><div><span>{product.name}</span><strong>{product.price}</strong></div><button onClick={() => onAdd(product)}>ADD TO BAG</button></div>
    </div>
  );
}

const customers = [
  { name: "Aarav Mehta", email: "aarav.m@gmail.com", orders: 8, spent: "₹14,292", lastOrder: "18 Jun 2025" },
  { name: "Diya Kapoor", email: "diya.kapoor@gmail.com", orders: 5, spent: "₹9,495", lastOrder: "16 Jun 2025" },
  { name: "Rohan Iyer", email: "rohan.iyer@gmail.com", orders: 3, spent: "₹5,197", lastOrder: "12 Jun 2025" },
  { name: "Ananya Singh", email: "ananya.s@gmail.com", orders: 2, spent: "₹4,098", lastOrder: "08 Jun 2025" },
  { name: "Kabir Shah", email: "kabir.shah@gmail.com", orders: 1, spent: "₹1,499", lastOrder: "02 Jun 2025" },
];

const emptyProduct: Product = {
  name: "",
  price: "",
  image: "",
  tag: "NEW",
  color: "#171717",
  category: "oversized",
};

function AdminDashboard({
  products,
  onSave,
  onDelete,
  onLogout,
}: {
  products: Product[];
  onSave: (product: Product, originalName?: string) => void;
  onDelete: (name: string) => void;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "products" | "customers">("overview");
  const [editingName, setEditingName] = useState<string | undefined>();
  const [draft, setDraft] = useState<Product>(emptyProduct);
  const [formOpen, setFormOpen] = useState(false);

  const openEditor = (product?: Product) => {
    setEditingName(product?.name);
    setDraft(product ? { ...product } : { ...emptyProduct });
    setFormOpen(true);
  };

  const saveProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized: Product = {
      ...draft,
      price: draft.price.startsWith("₹") ? draft.price : `₹${draft.price}`,
      old: draft.old ? (draft.old.startsWith("₹") ? draft.old : `₹${draft.old}`) : undefined,
      image: draft.image || images.black,
    };
    onSave(normalized, editingName);
    setFormOpen(false);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div><span className="logo">NEVER WEAR</span><small>CONTROL ROOM / 01</small></div>
        <nav aria-label="Admin navigation">
          {(["overview", "products", "customers"] as const).map((item, index) => (
            <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
              <span>0{index + 1}</span>{item.toUpperCase()}
            </button>
          ))}
        </nav>
        <div className="admin-profile">
          <i>AD</i>
          <div><strong>ADMIN</strong><span>admin@neverwear.in</span></div>
          <button onClick={onLogout}>LOG OUT</button>
        </div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <div><span className="eyebrow">NEVER WEAR / ADMIN</span><h1>{tab}</h1></div>
          <div className="admin-live"><i /> STORE LIVE</div>
        </header>

        {tab === "overview" && (
          <>
            <div className="metric-grid">
              <article><span>TOTAL REVENUE</span><strong>₹34,581</strong><small>+18.4% THIS MONTH</small></article>
              <article><span>ORDERS</span><strong>19</strong><small>+6 SINCE LAST WEEK</small></article>
              <article><span>CUSTOMERS</span><strong>{customers.length}</strong><small>4 RETURNING</small></article>
              <article><span>LIVE PRODUCTS</span><strong>{products.length}</strong><small>ALL CHANNELS</small></article>
            </div>
            <div className="admin-panel overview-split">
              <div>
                <div className="panel-heading"><div><span>SALES SIGNAL</span><h2>LAST 7 DAYS</h2></div><strong>₹12.8K</strong></div>
                <div className="sales-chart" aria-label="Sales chart for the last seven days">
                  {[38, 57, 44, 78, 63, 92, 72].map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><span>{["M", "T", "W", "T", "F", "S", "S"][index]}</span></div>)}
                </div>
              </div>
              <div className="top-product">
                <span>TOP PERFORMER</span>
                <img src={products[1]?.image || images.black} alt={products[1]?.name || "Top product"} />
                <h3>{products[1]?.name || "No products yet"}</h3>
                <p>12 units sold · ₹15,588 revenue</p>
              </div>
            </div>
          </>
        )}

        {tab === "products" && (
          <div className="admin-panel">
            <div className="panel-heading">
              <div><span>CATALOG CONTROL</span><h2>ALL PRODUCTS</h2></div>
              <button className="admin-primary" onClick={() => openEditor()}>+ ADD PRODUCT</button>
            </div>
            <div className="admin-table product-table">
              <div className="table-row table-head"><span>PRODUCT</span><span>CATEGORY</span><span>PRICE</span><span>STATUS</span><span>ACTIONS</span></div>
              {products.map((product) => (
                <div className="table-row" key={product.name}>
                  <span className="product-cell"><img src={product.image} alt="" /><strong>{product.name}</strong></span>
                  <span>{product.category}</span><span>{product.price}</span><span><i className="status-dot" /> LIVE</span>
                  <span className="table-actions"><button onClick={() => openEditor(product)}>EDIT</button><button onClick={() => onDelete(product.name)}>REMOVE</button></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "customers" && (
          <div className="admin-panel">
            <div className="panel-heading"><div><span>MEMBER DIRECTORY</span><h2>CUSTOMERS</h2></div><strong>{customers.length} MEMBERS</strong></div>
            <div className="admin-table customer-table">
              <div className="table-row table-head"><span>CUSTOMER</span><span>EMAIL</span><span>SHOPPED</span><span>TOTAL SPENT</span><span>LAST ORDER</span></div>
              {customers.map((customer) => (
                <div className="table-row" key={customer.email}>
                  <span className="customer-name"><i>{customer.name.split(" ").map((part) => part[0]).join("")}</i><strong>{customer.name}</strong></span>
                  <span>{customer.email}</span><span><b>{customer.orders}</b> times</span><span>{customer.spent}</span><span>{customer.lastOrder}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {formOpen && (
        <div className="admin-modal-backdrop" onMouseDown={() => setFormOpen(false)}>
          <div className="admin-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="panel-heading"><div><span>CATALOG EDITOR</span><h2>{editingName ? "EDIT PRODUCT" : "NEW PRODUCT"}</h2></div><button className="modal-close" onClick={() => setFormOpen(false)}><Icon name="close" /></button></div>
            <form onSubmit={saveProduct}>
              <label>PRODUCT NAME<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required /></label>
              <div className="form-pair">
                <label>PRICE<input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="1499" required /></label>
                <label>OLD PRICE<input value={draft.old || ""} onChange={(event) => setDraft({ ...draft, old: event.target.value })} placeholder="Optional" /></label>
              </div>
              <div className="form-pair">
                <label>CATEGORY<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as Product["category"] })}><option value="oversized">Oversized</option><option value="hoodies">Hoodies</option></select></label>
                <label>TAG<input value={draft.tag} onChange={(event) => setDraft({ ...draft, tag: event.target.value })} required /></label>
              </div>
              <label>IMAGE URL<input type="url" value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="https://images.unsplash.com/..." /></label>
              <label>SWATCH COLOUR<input type="color" value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })} /></label>
              <button className="admin-primary save-product" type="submit">{editingName ? "SAVE CHANGES" : "ADD TO STORE"} <Icon name="arrow" /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = window.localStorage.getItem("never-wear-products");
      const parsed = saved ? JSON.parse(saved) : initialProducts;
      return Array.isArray(parsed) && parsed.length ? parsed : initialProducts;
    } catch {
      return initialProducts;
    }
  });
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => window.sessionStorage.getItem("never-wear-admin") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>(["Afterdark Graphic Tee"]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [page, setPage] = useState<ShopPage>(() => {
    const route = window.location.pathname.replace("/", "");
    if (route.startsWith("product/")) return "product";
    if (route === "admin") return window.sessionStorage.getItem("never-wear-admin") === "true" ? "admin" : "login";
    return route === "oversized" || route === "hoodies" || route === "collections" || route === "login" || route === "wishlist" || route === "cart" ? route : "home";
  });
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const slug = window.location.pathname.split("/product/")[1];
    return products.find((product) => product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug) ?? products[0];
  });
  const cartCount = cartItems.length;
  const cartPreview = products.find((product) => product.name === cartItems[cartItems.length - 1]) ?? products[1];
  const cartSubtotal = cartItems.reduce((sum, name) => {
    const product = products.find((item) => item.name === name);
    return sum + (product ? Number(product.price.replace(/[₹,]/g, "")) : 0);
  }, 0);

  useEffect(() => {
    window.localStorage.setItem("never-wear-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen, cartOpen]);

  useEffect(() => {
    const handleBack = () => {
      const route = window.location.pathname.replace("/", "");
      if (route.startsWith("product/")) {
        const slug = route.split("product/")[1];
        setSelectedProduct(products.find((product) => product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug) ?? products[0]);
        setPage("product");
      } else {
        if (route === "admin") setPage(window.sessionStorage.getItem("never-wear-admin") === "true" ? "admin" : "login");
        else setPage(route === "oversized" || route === "hoodies" || route === "collections" || route === "login" || route === "wishlist" || route === "cart" ? route : "home");
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const navigate = (destination: ShopPage) => {
    const path = destination === "home" ? "/" : `/${destination}`;
    window.history.pushState({}, "", path);
    setPage(destination);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProduct = (product: Product) => {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    window.history.pushState({}, "", `/product/${slug}`);
    setSelectedProduct(product);
    setPage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCartItems((items) => [...items, product.name]);
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((items) => items.includes(product.name) ? items.filter((name) => name !== product.name) : [...items, product.name]);
  };

  const removeFromCart = (name: string) => {
    setCartItems((items) => items.filter((item) => item !== name));
  };

  const adminLogin = () => {
    window.sessionStorage.setItem("never-wear-admin", "true");
    setAdminAuthenticated(true);
    navigate("admin");
  };

  const adminLogout = () => {
    window.sessionStorage.removeItem("never-wear-admin");
    setAdminAuthenticated(false);
    navigate("login");
  };

  const saveProduct = (product: Product, originalName?: string) => {
    setProducts((items) => originalName ? items.map((item) => item.name === originalName ? product : item) : [product, ...items]);
    if (originalName && selectedProduct.name === originalName) setSelectedProduct(product);
    if (originalName && originalName !== product.name) {
      setCartItems((items) => items.map((name) => name === originalName ? product.name : name));
      setWishlist((items) => items.map((name) => name === originalName ? product.name : name));
    }
  };

  const deleteProduct = (name: string) => {
    setProducts((items) => items.length > 1 ? items.filter((item) => item.name !== name) : items);
    if (products.length <= 1) return;
    setCartItems((items) => items.filter((item) => item !== name));
    setWishlist((items) => items.filter((item) => item !== name));
  };

  if (page === "admin" && adminAuthenticated) {
    return <AdminDashboard products={products} onSave={saveProduct} onDelete={deleteProduct} onLogout={adminLogout} />;
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>FREE SHIPPING ABOVE ₹1,499</span>
        <span className="announcement-center">NEW DROP: AFTERDARK_01 IS LIVE</span>
        <span>10% OFF ON YOUR FIRST ORDER <b>NW10</b></span>
      </div>

      <header className="header">
        <button className="mobile-icon" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        <a className="logo" href="/" aria-label="Never Wear home" onClick={(event) => { event.preventDefault(); navigate("home"); }}>NEVER WEAR</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="/oversized" onClick={(event) => { event.preventDefault(); navigate("oversized"); }}>Oversized</a>
          <a href="/hoodies" onClick={(event) => { event.preventDefault(); navigate("hoodies"); }}>Hoodies</a>
          <a href="/collections" onClick={(event) => { event.preventDefault(); navigate("collections"); }}>Collections</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
          <button className="desktop-action" aria-label="Account" onClick={() => navigate("login")}><Icon name="user" /></button>
          <button className="desktop-action wishlist-nav" aria-label={`Wishlist with ${wishlist.length} items`} onClick={() => navigate("wishlist")}><Icon name="heart" filled={wishlist.length > 0} />{wishlist.length > 0 && <span>{wishlist.length}</span>}</button>
          <button className="bag-button" aria-label={`Shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}>
            <Icon name="bag" /><span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        {page === "home" ? (
        <>
        <section className="hero">
          <img className="hero-image" src={images.hero} alt="Streetwear models in oversized monochrome outfits" />
          <div className="hero-shade" />
          <div className="hero-index">DROP / 001</div>
          <div className="hero-content">
            <h1>WEAR YOUR<br /><em>UNFILTERED</em> SELF.</h1>
            <p>Not made to fit in. Made to stand out.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">EXPLORE THE DROP <Icon name="arrow" /></a>
            </div>
          </div>
          <div className="hero-meta">
            <span>CHENNAI / INDIA</span>
            <span>STREET-BORN SINCE 2024</span>
          </div>
          <a className="scroll-cue" href="#shop"><span /> SCROLL TO DISCOVER</a>
        </section>

        <section className="ticker" aria-label="Brand values">
          <div>NO RULES <b>✦</b> OWN YOUR CHAOS <b>✦</b> NEVER BLEND IN <b>✦</b> MADE FOR THE BOLD <b>✦</b> NO RULES <b>✦</b></div>
        </section>

        <section className="section category-section" id="shop">
          <SectionHeading eyebrow="01 / FIND YOUR FIT" title="SHOP BY CATEGORY" link="VIEW ALL" />
          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className={`category-card category-${index + 1}`}
                href={category.name === "Oversized" ? "/oversized" : category.name === "Hoodies" ? "/hoodies" : "/collections"}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(category.name === "Oversized" ? "oversized" : category.name === "Hoodies" ? "hoodies" : "collections");
                }}
                key={category.name}
              >
                <img src={category.image} alt={`${category.name} streetwear collection`} />
                <div className="category-overlay" />
                <span className="category-number">0{index + 1}</span>
                <div className="category-copy">
                  <small>{category.count}</small>
                  <h3>{category.name}</h3>
                  <span>SHOP NOW <Icon name="arrow" size={16} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="campaign">
          <img src={images.campaign} alt="Streetwear model in a dark cinematic studio" />
          <div className="campaign-overlay" />
          <div className="campaign-copy">
            <span>NEVER WEAR / MANIFESTO 001</span>
            <h2>YOUR STYLE.<br /><em>YOUR RULES.</em></h2>
            <p>Clothes that speak before you do.</p>
            <a className="primary-button light" href="#best">SHOP THE EDIT <Icon name="arrow" /></a>
          </div>
          <div className="campaign-corner">UNAPOLOGETICALLY<br />YOURSELF</div>
        </section>

        <section className="section best-section" id="best">
          <SectionHeading eyebrow="02 / COMMUNITY FAVOURITES" title="TOP COLLECTION" link="VIEW ALL" />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onAdd={addToCart}
                onOpen={openProduct}
                liked={wishlist.includes(product.name)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>

        <section className="limited-section" id="limited">
          <div className="limited-visual">
            <img src={images.green} alt="Model in dramatic green light" />
            <span className="vertical-label">ONLY 150 PIECES / NEVER RESTOCKED</span>
          </div>
          <div className="limited-copy">
            <span className="eyebrow">03 / NEVER AGAIN SERIES</span>
            <div className="limited-label">LIMITED TO 150</div>
            <h2>ONCE IT'S GONE,<br /><em>IT'S NEVER BACK.</em></h2>
            <p>Built for the ones who don't wait for permission. Numbered by hand. Cut in heavyweight 260 GSM cotton. Made once, worn forever.</p>
            <div className="limited-stats">
              <div><strong>150</strong><span>PIECES ONLY</span></div>
              <div><strong>260</strong><span>GSM COTTON</span></div>
              <div><strong>01</strong><span>ONE TIME DROP</span></div>
            </div>
            <a className="primary-button" href="#best">DISCOVER LIMITED DROPS <Icon name="arrow" /></a>
          </div>
        </section>

        <section className="story-section">
          <span className="story-mark">NW™</span>
          <div className="story-copy">
            <span className="eyebrow">BORN IN INDIA / BUILT FOR EVERYWHERE</span>
            <h2>WE DON'T MAKE<br />CLOTHES FOR <em>EVERYONE.</em></h2>
            <p>NEVER WEAR is a rebellion against the ordinary. Rooted in Indian youth culture and made for those who refuse to be put in a box.</p>
            <a href="#community" className="text-link">OUR STORY <Icon name="arrow" /></a>
          </div>
          <div className="story-note">EST. 2024<br />CHENNAI, INDIA</div>
        </section>

        <section className="community section" id="community">
          <SectionHeading eyebrow="04 / SEEN IN THE WILD" title="#NEVERBLENDIN" link="FOLLOW @NEVERWEAR" />
          <div className="social-grid">
            {[images.stairs, images.wall, images.blue, images.forest, images.graffiti].map((image, index) => (
              <a href="#top" className="social-tile" key={image}>
                <img src={image} alt={`Never Wear community look ${index + 1}`} />
                <span>@neverwear</span>
              </a>
            ))}
          </div>
        </section>

        <section className="newsletter">
          <span className="newsletter-index">NW / ACCESS</span>
          <div>
            <span className="eyebrow">NO SPAM. JUST DROPS.</span>
            <h2>GET FIRST ACCESS<br />TO THE <em>NEXT DROP.</em></h2>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <div>
              <input id="email" type="email" placeholder="you@email.com" required />
              <button aria-label="Join newsletter"><Icon name="arrow" /></button>
            </div>
            <small>By subscribing, you agree to our privacy policy.</small>
          </form>
        </section>
        </>
        ) : page === "oversized" || page === "hoodies" || page === "collections" ? (
          <CatalogPage page={page} onAdd={addToCart} onOpen={openProduct} wishlist={wishlist} onToggleWishlist={toggleWishlist} products={products} />
        ) : page === "login" ? (
          <LoginPage onAdminLogin={adminLogin} onCustomerLogin={() => navigate("home")} />
        ) : page === "wishlist" ? (
          <WishlistPage wishlist={wishlist} onAdd={addToCart} onOpen={openProduct} onToggleWishlist={toggleWishlist} onShop={() => navigate("collections")} products={products} />
        ) : page === "cart" ? (
          <CartPage cartItems={cartItems} onRemove={removeFromCart} onShop={() => navigate("collections")} products={products} />
        ) : (
          <ProductPage product={selectedProduct} onAdd={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} onOpen={openProduct} products={products} />
        )}
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
          <a className="logo" href="/" onClick={(event) => { event.preventDefault(); navigate("home"); }}>NEVER WEAR</a>
            <p>INDIAN STREETWEAR FOR<br />THE UNFILTERED GENERATION.</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>NEED HELP</strong>
              <a href="#top">Contact Us</a>
              <a href="#top">Track Order</a>
              <a href="#top">Returns &amp; Refunds</a>
              <a href="#top">FAQs</a>
              <a href="/login" onClick={(event) => { event.preventDefault(); navigate("login"); }}>My Account</a>
              <span className="service-point"><i>₹</i> COD Available</span>
              <span className="service-point"><i>↻</i> 30 Days Easy Returns &amp; Exchanges</span>
            </div>
            <div>
              <strong>COMPANY</strong>
              <a href="#top">About Us</a>
              <a href="#top">Careers</a>
              <a href="#top">Gift Vouchers</a>
              <a href="#community">Community Initiatives</a>
            </div>
            <div>
              <strong>MORE INFO</strong>
              <a href="#top">T&amp;C</a>
              <a href="#top">Privacy Policy</a>
              <a href="#top">Get Notified</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2025 NEVER WEAR</span><span>MADE WITH INTENT IN INDIA</span><span>PRIVACY · TERMS</span></div>
        <div className="footer-wordmark">NEVER WEAR</div>
      </footer>

      <nav className="mobile-bottom" aria-label="Mobile navigation">
        <a href="#top"><Icon name="search" size={19} /><span>Search</span></a>
        <a href="/collections" onClick={(event) => { event.preventDefault(); navigate("collections"); }}><Icon name="menu" size={19} /><span>Shop</span></a>
        <a href="/login" onClick={(event) => { event.preventDefault(); navigate("login"); }}><Icon name="user" size={19} /><span>Account</span></a>
        <button onClick={() => setCartOpen(true)}><Icon name="bag" size={19} /><span>Bag ({cartCount})</span></button>
      </nav>

      {toast && <div className="toast">ADDED TO YOUR BAG <Icon name="bag" size={17} /></div>}

      <div className={`overlay-panel search-panel ${searchOpen ? "open" : ""}`} aria-hidden={!searchOpen}>
        <button className="overlay-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><Icon name="close" /></button>
        <span className="eyebrow">FIND YOUR NEXT FAVOURITE</span>
        <div className="search-field"><Icon name="search" size={30} /><input autoFocus={searchOpen} placeholder="Search tees, drops, collections..." /></div>
        <div className="search-suggestions"><span>POPULAR:</span><button>Oversized</button><button>Graphic tees</button><button>Anime</button><button>Black tees</button></div>
      </div>

      <div className={`drawer-backdrop ${menuOpen || cartOpen ? "open" : ""}`} onClick={() => { setMenuOpen(false); setCartOpen(false); }} />
      <aside className={`side-drawer menu-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-head"><a className="logo" href="/" onClick={(event) => { event.preventDefault(); navigate("home"); }}>NEVER WEAR</a><button onClick={() => setMenuOpen(false)}><Icon name="close" /></button></div>
        <nav>
          {[
            ["Oversized", "oversized"],
            ["Hoodies", "hoodies"],
            ["Collections", "collections"],
          ].map(([item, destination], i) => (
            <a href={`/${destination}`} onClick={(event) => { event.preventDefault(); navigate(destination as ShopPage); }} key={item}>
              <span>0{i + 1}</span>{item}<Icon name="arrow" />
            </a>
          ))}
        </nav>
        <p>NEW DROP / AFTERDARK_01<br />AVAILABLE NOW</p>
      </aside>

      <aside className={`side-drawer cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="drawer-head"><div><span className="eyebrow">YOUR BAG</span><strong>{cartCount} ITEMS</strong></div><button onClick={() => setCartOpen(false)}><Icon name="close" /></button></div>
        {cartCount > 0 ? (
          <>
            <div className="cart-item">
              <img src={cartPreview.image} alt={cartPreview.name} />
              <div><h3>{cartPreview.name}</h3><p>Black / M</p><strong>{cartPreview.price}</strong><div className="quantity"><button>−</button><span>1</span><button>+</button></div></div>
            </div>
            {cartCount > 1 && <p className="cart-added">+ {cartCount - 1} more {cartCount - 1 === 1 ? "item" : "items"} in your bag</p>}
            <div className="shipping-progress"><div><span>{cartSubtotal >= 1499 ? "FREE SHIPPING UNLOCKED" : `₹${(1499 - cartSubtotal).toLocaleString("en-IN")} TO FREE SHIPPING`}</span><b>{Math.min(100, Math.round(cartSubtotal / 1499 * 100))}%</b></div><i style={{ width: `${Math.min(100, cartSubtotal / 1499 * 100)}%` }} /></div>
            <div className="cart-summary"><div><span>SUBTOTAL</span><strong>₹{cartSubtotal.toLocaleString("en-IN")}</strong></div><small>Taxes included. Shipping calculated at checkout.</small><button>CHECKOUT SECURELY <Icon name="arrow" /></button><a href="/cart" onClick={(event) => { event.preventDefault(); setCartOpen(false); navigate("cart"); }}>VIEW BAG</a></div>
          </>
        ) : (
          <div className="drawer-empty"><Icon name="bag" size={38} /><h3>YOUR BAG IS EMPTY</h3><button onClick={() => { setCartOpen(false); navigate("collections"); }}>START SHOPPING</button></div>
        )}
      </aside>
    </div>
  );
}
