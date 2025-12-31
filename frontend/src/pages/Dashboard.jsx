import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ name: '', type: 'Bike' });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/vehicles', config);
            setVehicles(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post('/api/vehicles', newVehicle, config);
            setShowAddModal(false);
            fetchVehicles();
            setNewVehicle({ name: '', type: 'Bike' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 text-white transition-colors rounded shadow-lg bg-primary hover:bg-teal-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Vehicle
                </button>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((vehicle) => (
                    <Link key={vehicle._id} to={`/vehicle/${vehicle._id}`}>
                        <div className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Car className="w-24 h-24 text-primary" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${vehicle.type === 'Bike' ? 'bg-orange-100 text-orange-600' :
                                        vehicle.type === 'Car' ? 'bg-primaryLight text-primary' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                        <Car className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 text-xs font-bold tracking-wide uppercase bg-gray-100 rounded-full text-dark">
                                        {vehicle.type}
                                    </span>
                                </div>

                                <h3 className="mb-1 text-xl font-bold text-gray-900">{vehicle.name}</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <div className="w-2 h-2 mr-2 rounded-full bg-secondary animate-pulse"></div>
                                    Active for tracking
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                                <span className="text-sm font-medium transition-colors text-primary group-hover:text-secondary group-hover:underline">View Details &rarr;</span>
                            </div>
                        </div>
                    </Link>
                ))}
                {vehicles.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500">No vehicles found. Add one to get started!</p>
                    </div>
                )}
            </div>

            {/* Add Vehicle Modal */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-bold">Add New Vehicle</h2>
                        <form onSubmit={handleAddVehicle}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Vehicle Name</label>
                                <input
                                    type="text"
                                    value={newVehicle.name}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="e.g., My Hero Xtreme"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Type</label>
                                <select
                                    value={newVehicle.type}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="Bike">Bike</option>
                                    <option value="Car">Car</option>
                                    <option value="TukTuk">TukTuk</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white transition-colors rounded bg-primary hover:bg-teal-700"
                                >
                                    Add Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
