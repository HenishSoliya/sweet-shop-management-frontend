import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const SweetForm = ({ selectedSweet, onSuccess }) => {
  const [sweet, setSweet] = useState({
    id: 0,
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedSweet) {
      setSweet(selectedSweet);
    }
  }, [selectedSweet]);

  const handleChange = (e) => {
    setSweet({ ...sweet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = selectedSweet ? "PUT" : "POST";

    await fetch(API_ENDPOINTS.SWEETS, {
      method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      body: JSON.stringify(sweet),
    });

    setSweet({ id: 0, name: "", category: "", price: "", quantity: "" });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-3">
        {selectedSweet ? "Update Sweet" : "Add New Sweet"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={sweet.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={sweet.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={sweet.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={sweet.quantity}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded">
        {selectedSweet ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default SweetForm;
