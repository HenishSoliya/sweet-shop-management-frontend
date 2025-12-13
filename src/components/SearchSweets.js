import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const SearchSweets = ({ fetchSweets }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    var api = API_ENDPOINTS.SEARCH
    api = (name === '') ? `${api}/*` : `${api}/${name}`
    api = (category === '') ? `${api}/*` : `${api}/${category}`
    api = (minPrice === '') ? `${api}/0to` : `${api}/${minPrice}to`
    api = (maxPrice === '') ? `${api}0` : `${api}${maxPrice}`
    fetchSweets({ API: api })
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4 text-pink-600">
        Search Sweets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Sweet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />

        <input
          type="number"
          placeholder="Min Price"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />

        <input
          type="number"
          placeholder="Max Price"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchSweets;
