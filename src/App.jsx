import { useEffect, useState } from "react";

const API_URL = "https://restaurant-fullstack-8nlb.onrender.com/api";

const galleryImages = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1612392061787-2d078b3b0f3b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
];

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.log("Error loading menu:", err));
  }, []);

  const addToCart = (item) => {
    const exist = cart.find((x) => x._id === item._id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    const item = cart.find((x) => x._id === id);

    if (item.quantity > 1) {
      setCart(
        cart.map((x) =>
          x._id === id ? { ...x, quantity: x.quantity - 1 } : x
        )
      );
    } else {
      setCart(cart.filter((x) => x._id !== id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setMessage("Cart is empty.");
      return;
    }

    const orderData = {
      customerName: customerName || "Guest",
      items: cart.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: "Pending",
    };

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Order failed");
      }

      setCart([]);
      setCustomerName("");
      setMessage("Order placed and saved to MongoDB.");
    } catch (error) {
      setMessage("Order could not be placed.");
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="#home">
            86th Street Hotdog & Grill
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
              <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="home" className="hero text-white text-center d-flex align-items-center">
        <div className="container">
          <h1 className="display-3 fw-bold">Fresh Hotdogs, Burgers & Fries</h1>
          <p className="lead">Fast food made fresh on 86th Street in Manhattan.</p>
          <a href="#menu" className="btn btn-warning btn-lg popped-btn">
            Order Now
          </a>
        </div>
      </section>

      <section id="menu" className="container py-5">
        <h2 className="text-center fw-bold mb-4">Our Menu</h2>

        <div className="row">
          <div className="col-lg-8">
            <div className="row g-4">
              {menuItems.map((item) => (
                <div className="col-md-6 col-lg-4" key={item._id}>
                  <div className="card h-100 shadow menu-card">
                    <img src={item.image} className="card-img-top food-img" alt={item.name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="text-muted small">{item.category}</p>
                      <p className="card-text">{item.description}</p>
                      <p className="fw-bold text-success">${item.price.toFixed(2)}</p>
                      <button
                        className="btn btn-warning w-100 popped-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="cart-box shadow">
              <h3 className="fw-bold">Shopping Cart</h3>

              <input
                className="form-control mb-3"
                type="text"
                placeholder="Customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p className="mb-0">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove One
                    </button>
                  </div>
                ))
              )}

              <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>

              <button className="btn btn-dark w-100 mt-2 popped-btn" onClick={clearCart}>
                Clear Cart
              </button>

              <button className="btn btn-success w-100 mt-2 popped-btn" onClick={placeOrder}>
                Place Order
              </button>

              {message && <p className="mt-3 fw-bold">{message}</p>}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Gallery</h2>
          <div className="row g-4">
            {galleryImages.map((img, index) => (
              <div className="col-md-4" key={index}>
                <img src={img} alt="Restaurant food" className="gallery-img shadow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="container py-5 text-center">
        <h2 className="fw-bold">About Us</h2>
        <p className="lead">
          86th Street Hotdog & Grill is a small restaurant that serves fresh,
          simple, and tasty food. We focus on fast service, fair prices, and
          food that feels homemade.
        </p>
      </section>

      <section id="contact" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Contact Us</h2>

          <div className="row g-4">
            <div className="col-md-6">
              <form className="p-4 shadow rounded bg-white">
                <input className="form-control mb-3" type="text" placeholder="Name" />
                <input className="form-control mb-3" type="email" placeholder="Email" />
                <textarea className="form-control mb-3" rows="5" placeholder="Message"></textarea>
                <button className="btn btn-warning w-100 popped-btn" type="button">
                  Send Message
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <iframe
                title="map"
                className="map"
                src="https://www.google.com/maps?q=86th%20St%20%26%202nd%20Ave%2C%20New%20York%2C%20NY&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">Facebook | Instagram | TikTok</p>
        <p className="mb-0">Business Hours: Mon-Sun 10:00 AM - 10:00 PM</p>
      </footer>
    </>
  );
}