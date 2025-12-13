import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import SweetCard from "../components/SweetCard";

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSweets = () => {
        fetch(API_ENDPOINTS.SWEETS)
            .then((res) => res.json())
            .then((data) => {
                setSweets(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching sweets:", err);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchSweets();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading sweets...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
                🍬 Sweets Shop
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sweets.map((sweet) => (
                    <SweetCard key={sweet.id} sweet={sweet} refreshSweets={fetchSweets} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
