import { useEffect, useState } from "react";
import { API } from "../api";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sortBy, sortOrder, page]);

  const fetchFood = () => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit: 8,
      search,
      category,
      sortBy,
      sortOrder
    });

    API.get(`/foods?${params.toString()}`)
      .then((res) => {
        setItems(res.data.data || []);
        setTotalPages(res.data.meta?.totalPages || 1);
      })
      .catch(() => alert("Failed to load menu"))
      .finally(() => setLoading(false));
  };

  const addToCart = async (foodId) => {
    try {
      await API.post("/cart/add", { foodId, quantity: 1 });
      alert("Added to cart!");
    } catch { alert("Failed to add to cart"); }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">
        Today's <span>Menu</span> 🍔
      </h2>


      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Meals">Meals</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="id">Default</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>

        <button
          onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
          className="sort-order-btn"
        >
          {sortOrder === "asc" ? "⬆️ Low-High" : "⬇️ High-Low"}
        </button>
      </div>

      {loading ? (
        <div className="loading-screen">Loading snacks...</div>
      ) : (
        <>
          <div className="menu-grid">
            {items.map((item) => (
              <div key={item.id} className="menu-card">
                <div>
                  <h3 className="menu-item-name">{item.name}</h3>
                  <span className="menu-item-category">{item.category}</span>
                </div>
                <div>
                  <div className="menu-item-price">₹{item.price}</div>
                  <button onClick={() => addToCart(item.id)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>


          <div className="pagination-controls">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="page-btn"
            >
              Previous
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}