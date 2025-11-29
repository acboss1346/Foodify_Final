import heroImage from '../images/hero.png'; // Your hero image

export default function Home() {
  const primaryGreen = "#10B981"; // Fresh Green
  const darkGreen = "#0D9F6E";    // Deep Green
  const lightGreenBg = "#F0FFF7"; // Soft Background
  const accentYellow = "#FBBF24"; // Fun Accent Color

  const primaryTextColor = "#1F2937";
  const lightTextColor = "#6B7280";

  const buttonBaseStyle = {
    width: "240px",
    padding: "16px 25px",
    background: `linear-gradient(135deg, ${primaryGreen}, ${darkGreen})`,
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "19px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: `0 8px 25px rgba(16, 185, 129, 0.3)`,
  };

  const cardStyle = {
    maxWidth: "800px",
    margin: "50px auto 60px auto",
    padding: "40px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: `0 12px 40px rgba(0, 0, 0, 0.09)`,
    borderLeft: `5px solid ${primaryGreen}`,
    textAlign: "left",
    transition: "all 0.3s ease-in-out",
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "18px",
  };

  const featureIconStyle = {
    fontSize: "30px",
    color: primaryGreen,
    flexShrink: 0,
  };

  const headingFont = "Roboto, sans-serif";
  const bodyFont = "Inter, sans-serif";

  const headingStyle = {
    fontFamily: headingFont,
    fontSize: "48px",
    fontWeight: "800",
    color: 'white',
    marginBottom: "15px",
    letterSpacing: "-1.5px",
    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
  };

  const subheadingStyle = {
    fontFamily: bodyFont,
    fontSize: "22px",
    color: 'white',
    maxWidth: "700px",
    margin: "0 auto 50px auto",
    lineHeight: "1.5",
    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
  };

  const sectionTitleStyle = {
    fontFamily: headingFont,
    fontSize: "32px",
    color: darkGreen,
    marginBottom: "30px",
  };
  
  const emphasisStyle = {
      color: darkGreen,
      fontWeight: '600',
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        minHeight: "100vh",
        textAlign: "center",
        background: `linear-gradient(180deg, ${lightGreenBg} 0%, #ffffff 100%)`,
        padding: "120px 20px 60px 20px",
        fontFamily: bodyFont,
        color: primaryTextColor,
      }}
    >
      {/* 1. HERO SECTION WRAPPER WITH BACKGROUND IMAGE */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 75%', // Final alignment adjustment for the image
          padding: '80px 20px 60px 20px',
          borderRadius: '20px',
          marginBottom: '50px',
        }}
      >
        <h1 style={headingStyle}>
          Skip the Food FOMO, Order Now! 😋
        </h1>

        <p style={subheadingStyle}>
          <strong style={{color: 'white', fontWeight: '600'}}>FOODIFY</strong> is your secret weapon against long queues. Place your orders instantly,
          pay securely, and track when your food is <em>actually</em> ready for pickup. Seriously fast.
        </p>

        <a href="/menu" style={{ textDecoration: "none" }}>
          <button
            style={buttonBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 15px 35px rgba(16, 185, 129, 0.45)`;
              e.currentTarget.style.background = `linear-gradient(135deg, ${darkGreen}, ${primaryGreen})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px) scale(1)";
              e.currentTarget.style.boxShadow = `0 8px 25px rgba(16, 185, 129, 0.3)`;
              e.currentTarget.style.background = `linear-gradient(135deg, ${primaryGreen}, ${darkGreen})`;
            }}
          >
            See Today's Menu
          </button>
        </a>
      </div>
      {/* END HERO SECTION WRAPPER */}

      {/* --- Section 2: The Pain Point & Solution - Revised for Snacks/All-Day --- */}
      <div 
        style={cardStyle}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 15px 50px rgba(0, 0, 0, 0.12)` }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.09)` }}
      >
        <h2 style={sectionTitleStyle}>
          No More Waiting for a Quick Fix! ⚡
        </h2>
        <p style={{ fontSize: "18px", color: primaryTextColor, lineHeight: "1.7", marginBottom: "25px" }}>
          Need chips, a cold drink, or a quick snack? Avoid the queue at the counter. <strong style={emphasisStyle}>Foodify</strong> lets you browse the full snack shop menu, click, and pay on your phone, day or night.
        </p>
        <p style={{ fontSize: "18px", color: lightTextColor, lineHeight: "1.7" }}>
          We handle the order so you can skip the wait. Get notified the second your quick order is <strong style={{color: '#1F2937'}}>Ready for Pickup</strong>—satisfaction, instantly.
        </p>
      </div>

      {/* --- Section 3: Why Choose Us? - Focus on user benefits (Minimal Tech Talk) --- */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 15px 50px rgba(0, 0, 0, 0.12)` }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.09)` }}
      >
        <h2 style={sectionTitleStyle}>
          Your New Favorite Way to Order 💯
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <div style={featureItemStyle}>
            <span style={{...featureIconStyle, color: accentYellow}}>✨</span>
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "20px", color: primaryTextColor, fontFamily: headingFont }}>Order in 30 Seconds</h3>
              <p style={{ margin: 0, fontSize: "16px", color: lightTextColor }}>Super-fast menu browsing and checkout.</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <span style={featureIconStyle}>📍</span>
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "20px", color: primaryTextColor, fontFamily: headingFont }}>Track Your Food’s Status</h3>
              <p style={{ margin: 0, fontSize: "16px", color: lightTextColor }}>Real-time updates, from "Pending" to "Pickup Time!"</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <span style={featureIconStyle}>🔒</span>
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "20px", color: primaryTextColor, fontFamily: headingFont }}>Secure Payments</h3>
              <p style={{ margin: 0, fontSize: "16px", color: lightTextColor }}>Pay safely ahead of time—less fumbling for cash.</p>
            </div>
          </div>
          <div style={featureItemStyle}>
            <span style={{...featureIconStyle, color: accentYellow}}>🚀</span>
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "20px", color: primaryTextColor, fontFamily: headingFont }}>Reliable Performance</h3>
              <p style={{ margin: 0, fontSize: "16px", color: lightTextColor }}>Enjoy a smooth, fast, and stable ordering experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <p style={{ fontSize: "20px", color: primaryTextColor, marginTop: "60px", marginBottom: "40px" }}>
        Ready for the fastest lunch ever?
      </p>
      <a href="/menu" style={{ textDecoration: "none" }}>
        <button
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
            e.currentTarget.style.boxShadow = `0 15px 35px rgba(16, 185, 129, 0.45)`;
            e.currentTarget.style.background = `linear-gradient(135deg, ${darkGreen}, ${primaryGreen})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px) scale(1)";
            e.currentTarget.style.boxShadow = `0 8px 25px rgba(16, 185, 129, 0.3)`;
            e.currentTarget.style.background = `linear-gradient(135deg, ${primaryGreen}, ${darkGreen})`;
          }}
        >
          Order Food Now
        </button>
      </a>
    </div>
  );
}