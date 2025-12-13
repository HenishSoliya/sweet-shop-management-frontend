const SweetCard = ({ sweet }) => {
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

      <button
        disabled={sweet.quantity === 0}
        className={`mt-4 w-full py-2 rounded-lg font-semibold text-white
          ${
            sweet.quantity === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
      >
        Purchase
      </button>
    </div>
  );
};

export default SweetCard;
