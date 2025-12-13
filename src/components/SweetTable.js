import Restock from "./Restock";

const SweetTable = ({ sweets, onEdit, onDelete, onRestock }) => {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sweets.map((sweet) => (
          <tr key={sweet.id}>
            <td className="border p-2">{sweet.name}</td>
            <td className="border p-2">{sweet.category}</td>
            <td className="border p-2">₹{sweet.price}</td>
            <td className="border p-2">{sweet.quantity}</td>
            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(sweet)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(sweet.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <Restock sweetId={sweet.id} onRestock={onRestock}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SweetTable;
