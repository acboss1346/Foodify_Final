import { Link } from "react-router-dom";
import heroImage from '../images/hero.png';

export default function Home() {
  return (
    <div className="home-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="hero-overlay" style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(10, 10, 12, 0.4), var(--color-bg-body) 90%)',
          backdropFilter: 'blur(2px)',
        }}></div>

        <div className="hero-content animate-slide-up" style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
          <h1 className="hero-title" style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(to bottom right, #ffffff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))'
          }}>
            Good Food, <br />
            <span style={{ color: 'var(--color-primary)', WebkitTextFillColor: 'initial' }}>Zero Wait.</span>
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>
            Skip the line and savor the moment. Order your canteen favorites from anywhere and pick them up hot.
          </p>

          <Link to="/menu" className="btn btn-primary" style={{
            padding: '1rem 3rem',
            fontSize: '1.125rem',
            borderRadius: 'var(--radius-full)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            Order Now
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Info / Features Section */}
      <div style={{ background: 'var(--color-bg-body)', padding: '6rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Reclaim Your Break</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>
            Your time is precious. <strong style={{ color: 'var(--color-primary)' }}>Foodify</strong> connects you directly with the kitchen, so you can spend your break relaxing, not standing in queues.
          </p>
        </div>

        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              title: "Lightning Fast",
              desc: "Optimized for speed. From tap to kitchen in milliseconds.",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              )
            },
            {
              title: "Secure Payment",
              desc: "Pay your way using UPI or cards with bank-grade security.",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              )
            },
            {
              title: "Live Tracking",
              desc: "Know exactly when your food is being prepped and ready.",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              )
            }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card" style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              transition: 'transform 0.3s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 87, 34, 0.2)',
                background: 'rgba(255, 87, 34, 0.05)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}