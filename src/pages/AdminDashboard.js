import { useEffect, useState } from "react";
import SweetForm from "../components/SweetForm";
import SweetTable from "../components/SweetTable";
import { API_ENDPOINTS } from "../config/api";

const AdminDashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [selectedSweet, setSelectedSweet] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const handleEdit = (sweet) => {
        setSelectedSweet(sweet);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this sweet?")) {
            await fetch(`${API_ENDPOINTS.SWEETS}/${id}`, {
                method: "DELETE",
            });
            fetchSweets();
        }
    };

    const handleRestock = async (id, amount) => {
        try {
            const response = await fetch(
                `${API_ENDPOINTS.RESTOCK}/${id}/${amount}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            alert(await response.text());
            if (!response.ok) {
                throw new Error("Restock failed");
            }
        } catch (error) {
            console.error(error);
        } finally {
            fetchSweets();
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            <SweetForm
                selectedSweet={selectedSweet}
                onSuccess={() => {
                    fetchSweets();
                    setSelectedSweet(null);
                }}
            />

            <SweetTable
                sweets={sweets}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestock={handleRestock}
            />
        </div>
    );
};

export default AdminDashboard;
