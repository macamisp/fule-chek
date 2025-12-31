import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Fuel, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FuelChart from '../components/FuelChart';

const VehicleDetails = () => {
    const { id } = useParams();
    const [records, setRecords] = useState([]);
    const [vehicle, setVehicle] = useState(null);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [serviceFormData, setServiceFormData] = useState({
        nextServiceDate: '',
        nextServiceOdometer: ''
    });

    // Restore missing state
    const [vehicleName, setVehicleName] = useState('Vehicle');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        odometer: '',
        liters: '',
        cost: ''
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (userInfo) {
            fetchRecords();
            fetchVehicle();
        }
    }, [id]);

    const fetchVehicle = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`/api/vehicles/${id}`, config);
            setVehicle(data);
            setServiceFormData({
                nextServiceDate: data.nextServiceDate || '',
                nextServiceOdometer: data.nextServiceOdometer || ''
            });
            setVehicleName(data.name);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/vehicles/${id}`, serviceFormData, config);
            setShowServiceModal(false);
            fetchVehicle();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRecords = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await axios.get(`/api/fuel/${id}`, config);
            setRecords(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddRecord = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            await axios.post('/api/fuel', { ...formData, vehicleId: id }, config);
            setShowAddModal(false);
            fetchRecords();
            setFormData({
                date: new Date().toISOString().split('T')[0],
                odometer: '',
                liters: '',
                cost: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate Mileage
    const calculateMileage = (index) => {
        // Current record: records[index]
        // Previous record: records[index + 1] (since sorted desc date/created)
        // Wait, records usually come newest first?
        // My backend sorts { date: -1 }. So index 0 is newest.
        // Previous record in time is index + 1.

        if (index >= records.length - 1) return '-';

        const current = records[index];
        const previous = records[index + 1];

        const dist = current.odometer - previous.odometer;
        const fuel = current.liters;

        if (dist <= 0 || fuel <= 0) return '-';

        return (dist / fuel).toFixed(2);
    };

    return (
        <Layout>
            <div className="flex items-center mb-6">
                <Link to="/" className="mr-4 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Fuel History</h1>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Records</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 text-white transition-colors rounded shadow-md bg-secondary hover:bg-orange-600"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Fuel
                </button>
            </div>

            {/* Service Status Card */}
            {vehicle && (
                <div className="p-4 mb-6 bg-white border-l-4 rounded shadow border-primary">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Service Status</h3>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Next Service Date: <span className="font-medium text-gray-900">{vehicle.nextServiceDate || 'Not Set'}</span></p>
                                <p>Next Service Odometer: <span className="font-medium text-gray-900">{vehicle.nextServiceOdometer ? `${vehicle.nextServiceOdometer} km` : 'Not Set'}</span></p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowServiceModal(true)}
                            className="px-3 py-1 text-sm border rounded text-primary border-primary hover:bg-teal-50"
                        >
                            Update Service Info
                        </button>
                    </div>
                </div>
            )}

            {/* Service Edit Modal */}
            {showServiceModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-bold">Update Service Info</h2>
                        <form onSubmit={handleUpdateService}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Next Service Date</label>
                                <input
                                    type="date"
                                    value={serviceFormData.nextServiceDate}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, nextServiceDate: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Next Service Odometer (km)</label>
                                <input
                                    type="number"
                                    value={serviceFormData.nextServiceOdometer}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, nextServiceOdometer: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowServiceModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {records.length > 0 && <FuelChart records={records} />}

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 font-medium text-gray-500 uppercase text-xs/4">Date</th>
                            <th className="px-6 py-3 font-medium text-gray-500 uppercase text-xs/4">Odometer</th>
                            <th className="px-6 py-3 font-medium text-gray-500 uppercase text-xs/4">Liters</th>
                            <th className="px-6 py-3 font-medium text-gray-500 uppercase text-xs/4">Cost (LKR)</th>
                            <th className="px-6 py-3 font-medium uppercase text-secondary text-xs/4">Mileage (km/L)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {records.map((record, index) => (
                            <tr key={record._id}>
                                <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{record.odometer} km</td>
                                <td className="px-6 py-4">{record.liters} L</td>
                                <td className="px-6 py-4">Rs. {record.cost}</td>
                                <td className="px-6 py-4 font-bold text-secondary">
                                    {calculateMileage(index)}
                                </td>
                            </tr>
                        ))}
                        {records.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No fuel records yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Fuel Modal */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-bold">Add Fuel Record</h2>
                        <form onSubmit={handleAddRecord}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Odometer (km)</label>
                                <input
                                    type="number"
                                    value={formData.odometer}
                                    onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="e.g. 12500"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">Liters</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.liters}
                                        onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
                                        className="w-full px-3 py-2 border rounded"
                                        placeholder="e.g. 3.5"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">Cost (LKR)</label>
                                    <input
                                        type="number"
                                        value={formData.cost}
                                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                        className="w-full px-3 py-2 border rounded"
                                        placeholder="e.g. 1500"
                                        required
                                    />
                                </div>
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
                                    className="px-4 py-2 text-white transition-colors rounded bg-secondary hover:bg-orange-600"
                                >
                                    Save Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default VehicleDetails;
