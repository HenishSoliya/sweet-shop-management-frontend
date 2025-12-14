import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const SweetCard = ({ sweet, refreshSweets }) => {

  const [purchaseQty, setPurchaseQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_ENDPOINTS.PURCHASE}/${sweet.id}/${purchaseQty}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`
          }
        }
      );
      alert(await response.text());
      if (!response.ok) {
        throw new Error("Purchase failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      refreshSweets();
      setPurchaseQty(1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5">

      {/* Placeholder instead of image */}
      <div className="h-32 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 text-xl font-bold">
        {sweet.name.charAt(0)}
      </div>

      <h3 className="text-xl font-semibold mt-4">{sweet.name}</h3>

      <p className="text-gray-600">Category: {sweet.category}</p>
      <p className="text-gray-600">Price: ₹{sweet.price}</p>
      <p className="text-gray-600">Available: {sweet.quantity}</p>

      <input
        type="number"
        min="1"
        max={sweet.quantity}
        value={purchaseQty}
        onChange={(e) => setPurchaseQty(Number(e.target.value))}
        className="mt-3 w-full border rounded-lg px-3 py-2"
        disabled={sweet.quantity === 0}
      />

      <button
        onClick={handlePurchase}
        disabled={
          sweet.quantity === 0 ||
          purchaseQty <= 0 ||
          purchaseQty > sweet.quantity ||
          loading
        }
        className={`mt-4 w-full py-2 rounded-lg text-white font-semibold
          ${sweet.quantity === 0 ||
            purchaseQty <= 0 ||
            purchaseQty > sweet.quantity
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
          }`}
      >
        {loading ? "Processing..." : "Purchase"}
      </button>
    </div>
  );
};

export default SweetCard;
