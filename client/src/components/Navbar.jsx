export default function Navbar({ user }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 20px",
      background: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2>Foodify</h2>

      <div style={{ display: "flex", gap: "16px" }}>
        <a href="/home">Home</a>
        <a href="/menu">Menu</a>
        {user && <a href="/cart">Cart</a>}
        {user && <a href="/orders">Orders</a>}
        {user?.role === "admin" && <a href="/admin">Admin</a>}
      </div>
    </nav>
  );
}
