export default function Home() {
  return (
    <div
      style={{
        paddingTop: "120px",
        minHeight: "100vh",
        textAlign: "center",
        background: "linear-gradient(180deg, #f0fff7 0%, #ffffff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "120px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "800",
          color: "#10b981",
          marginBottom: "10px",
          letterSpacing: "-0.5px",
        }}
      >
        Welcome to Foodify 🍔
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#374151",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      >
        Your smart and fast food ordering system.
      </p>

      <a href="/menu" style={{ textDecoration: "none" }}>
        <button
          style={{
            width: "220px",
            padding: "14px",
            background: "linear-gradient(135deg, #10b981, #0f9d76)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 6px 18px rgba(16,185,129,0.25)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 10px 24px rgba(16,185,129,0.35)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px)";
            e.target.style.boxShadow = "0 6px 18px rgba(16,185,129,0.25)";
          }}
        >
          View Menu
        </button>
      </a>
    </div>
  );
}
