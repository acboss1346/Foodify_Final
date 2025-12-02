import { Link } from "react-router-dom";
import heroImage from '../images/hero.png';

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Skip the Line,<br />
            <span className="hero-highlight">Taste the Time.</span>
          </h1>

          <p className="hero-subtitle">
            Order your favorites instantly from your phone. Track real-time status and pick up when it's hot.
          </p>

          <Link to="/menu" className="cta-button">
            Explore Menu 🍕
          </Link>
        </div>
      </div>

      {/* INFO CARD */}
      <div className="info-card">
        <div className="info-card-highlight"></div>
        <h2 className="mb-4">Hungry but busy? ⚡</h2>
        <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)" }}>
          Don't waste your break standing in queues. With <strong>Foodify</strong>, you browse the canteen menu, place your order digitally, and get notified exactly when your meal is ready. It's the smart way to snack.
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <h2 className="text-center mb-4" style={{ marginBottom: '3rem' }}>Why Students Love Us</h2>
        <div className="features-grid">
          {[
            { icon: "🚀", title: "Lightning Fast", desc: "Order in seconds, pickup in minutes." },
            { icon: "📱", title: "Live Tracking", desc: "Watch your order status change in real-time." },
            { icon: "🧾", title: "Pay at Counter", desc: "Book your meal online, then pay using UPI at the mess counter." }
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="mb-4" style={{ fontSize: '1.25rem' }}>{f.title}</h3>
              <p style={{ color: "var(--color-text-muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}