export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Foodify 🍔</h1>
      <p>Your smart food ordering system.</p>
      <a href="/menu">
        <button className="submit-btn" style={{ width: "200px", marginTop: "20px" }}>
          View Menu
        </button>
      </a>
    </div>
  );
}
