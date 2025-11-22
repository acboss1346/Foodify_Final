import { useEffect, useState } from "react";
import { API } from "../api";

export default function AdminPanel() {
  const [foods, setFoods] = useState([]);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");


  const loadFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.log("Error loading foods:", err);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  // Add food handler
  const addFood = async () => {
    if (!name || !price || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/foods", {
        name,
        price: Number(price),
        category
      });

      alert("Food added!");
      setName("");
      setPrice("");
      setCategory("");
      loadFoods(); 

    } catch (err) {
      alert("Error adding food. Are you logged in as admin?");
    }
  };


  const deleteFood = async (id) => {
    try {
      await API.delete(`/foods/${id}`);
      alert("Food deleted!");
      loadFoods(); 

    } catch (err) {
      alert("Delete failed. Only admin can delete.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      <p>Manage Menu Items</p>


      <div className="menu-card" style={{ marginBottom: "20px" }}>
        <h3>Add New Food Item</h3>

        <input
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button className="submit-btn" onClick={addFood}>
          Add Food
        </button>
      </div>


      <h3>Existing Items</h3>
      {foods.map((f) => (
        <div key={f.id} className="menu-card" style={{ marginBottom: "12px" }}>
          <h3>{f.name}</h3>
          <p>₹{f.price}</p>
          <p>Category: {f.category}</p>

          <button
            style={{ background: "#dc2626", color: "white", marginTop: "10px" }}
            onClick={() => deleteFood(f.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}



