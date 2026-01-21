import { useEffect, useState } from "react";
import { API } from "../api";
import { useToast } from "../context/ToastContext";
import Skeleton from "../components/Skeleton";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFood();
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
      .catch(() => addToast("Failed to load menu", "error"))
      .finally(() => setLoading(false));
  };

  const addToCart = async (foodId) => {
    try {
      await API.post("/cart/add", { foodId, quantity: 1 });
      addToast("Added to cart!", "success");
    } catch {
      addToast("Failed to add to cart", "error");
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Today's <span style={{ color: 'var(--color-primary)' }}>Menu</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
          Freshly prepared, just for you.
        </p>
      </div>

      <div className="glass-card" style={{
        padding: '1.5rem',
        marginBottom: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        background: 'rgba(24, 24, 27, 0.4)'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <input
            type="text"
            placeholder="Search snacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--color-bg-body)',
              border: 'var(--border-subtle)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)'
            }}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ flex: '0 0 auto', width: 'auto', minWidth: '150px' }}
        >
          <option value="">All Categories</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Meals">Meals</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: '0 0 auto', width: 'auto', minWidth: '120px' }}
        >
          <option value="id">Latest</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>

        <button
          onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
          className="btn btn-secondary"
          style={{ padding: '0.75rem 1rem' }}
        >
          {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>

      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', height: '300px' }}>
              <Skeleton width="60%" height="24px" className="mb-4" />
              <Skeleton width="40%" height="20px" className="mb-8" />
              <div style={{ marginTop: 'auto' }}>
                <Skeleton width="100%" height="40px" style={{ borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {items.map((item) => (
              <div key={item.id} className="glass-card" style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-primary)',
                    fontWeight: 700
                  }}>
                    {item.category}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingTop: '1rem',
                    borderTop: 'var(--border-subtle)'
                  }}>
                    <span>₹{item.price}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '4rem',
            borderTop: 'var(--border-subtle)',
            paddingTop: '2rem'
          }}>
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="btn btn-secondary"
              style={{ opacity: page <= 1 ? 0.5 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ color: 'var(--color-text-muted)' }}>Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="btn btn-secondary"
              style={{ opacity: page >= totalPages ? 0.5 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}