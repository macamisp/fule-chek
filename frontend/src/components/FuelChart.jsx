import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const FuelChart = ({ records }) => {
    // Process data for charts
    // 1. Sort by date ascending (oldest to newest)
    const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Calculate mileage for the chart because the API might not always calculate it for the last/first entry correctly
    //    Actually, assuming we rely on the calculateMileage logic or just use what we can compute.
    //    Let's compute it strictly here to be safe and graph it.

    const data = sortedRecords.map((record, index) => {
        let mileage = null;
        if (index > 0) {
            const prev = sortedRecords[index - 1]; // Previous in time
            const dist = record.odometer - prev.odometer;
            if (dist > 0 && record.liters > 0) {
                mileage = parseFloat((dist / record.liters).toFixed(2));
            }
        }

        return {
            date: new Date(record.date).toLocaleDateString(),
            cost: record.cost,
            mileage: mileage,
            liters: record.liters
        };
    }).filter(item => item !== null); // Remove any nulls if logic allows, but map returns objects

    return (
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            {/* Mileage Trend */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-lg font-bold text-gray-700">Mileage Trend (km/L)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="mileage" stroke="#16a34a" strokeWidth={2} name="Mileage (km/L)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cost History */}
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-lg font-bold text-gray-700">Cost History (LKR)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cost" fill="#2563eb" name="Cost (LKR)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FuelChart;
