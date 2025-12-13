import { useState } from "react";

const Restock = ({ sweetId, onRestock }) => {
  const [amount, setAmount] = useState("");

  const handleRestock = () => {
    if (amount > 0) {
      onRestock(sweetId, Number(amount));
      setAmount("");
    }
  };

  return (
    <span className="inline-flex items-center space-x-1">
      <input
        type="number"
        placeholder="+Qty"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border w-16 h-8 px-1 rounded border-green-600 border-2"
      />
      <button
        onClick={handleRestock}
        className="bg-green-600 text-white px-2 py-1 rounded"
      >
        Restock
      </button>
    </span>
  );
};

export default Restock;
