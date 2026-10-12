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

const products = [
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
}: {
  product: (typeof products)[number];
  onAdd: () => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-tag">{product.tag}</span>
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked(!liked)}
        >
          <Icon name="heart" size={18} filled={liked} />
        </button>
        <button className="quick-add" onClick={onAdd}>QUICK ADD <span>+</span></button>
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

type ShopPage = "home" | "oversized" | "hoodies" | "collections";

function CatalogPage({ page, onAdd }: { page: Exclude<ShopPage, "home">; onAdd: () => void }) {
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
      title: "ALL PRODUCTS",
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
          {catalogProducts.map((product) => <ProductCard key={product.name} product={product} onAdd={onAdd} />)}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toast, setToast] = useState(false);
  const [page, setPage] = useState<ShopPage>(() => {
    const route = window.location.pathname.replace("/", "");
    return route === "oversized" || route === "hoodies" || route === "collections" ? route : "home";
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen, cartOpen]);

  useEffect(() => {
    const handleBack = () => {
      const route = window.location.pathname.replace("/", "");
      setPage(route === "oversized" || route === "hoodies" || route === "collections" ? route : "home");
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

  const addToCart = () => {
    setCartCount((count) => count + 1);
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  };

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
          <button className="desktop-action" aria-label="Account"><Icon name="user" /></button>
          <button className="desktop-action" aria-label="Wishlist"><Icon name="heart" /></button>
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
              <a className={`category-card category-${index + 1}`} href="#best" key={category.name}>
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
          <SectionHeading eyebrow="02 / COMMUNITY FAVOURITES" title="BEST SELLERS" link="VIEW ALL" />
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}
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
        ) : (
          <CatalogPage page={page} onAdd={addToCart} />
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
              <a href="#top">My Account</a>
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
        <a href="#top"><Icon name="user" size={19} /><span>Account</span></a>
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
        <div className="cart-item">
          <img src={images.black} alt="Afterdark Graphic Tee" />
          <div><h3>Afterdark Graphic Tee</h3><p>Black / M</p><strong>₹1,299</strong><div className="quantity"><button>−</button><span>1</span><button>+</button></div></div>
        </div>
        {cartCount > 1 && <p className="cart-added">+ {cartCount - 1} recently added {cartCount - 1 === 1 ? "item" : "items"}</p>}
        <div className="shipping-progress"><div><span>FREE SHIPPING UNLOCKED</span><b>100%</b></div><i /></div>
        <div className="cart-summary"><div><span>SUBTOTAL</span><strong>₹{(1299 * cartCount).toLocaleString("en-IN")}</strong></div><small>Taxes included. Shipping calculated at checkout.</small><button>CHECKOUT SECURELY <Icon name="arrow" /></button><a href="#top">VIEW BAG</a></div>
      </aside>
    </div>
  );
}
