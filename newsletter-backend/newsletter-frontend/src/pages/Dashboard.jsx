import { useEffect, useState } from "react";
import API from "../api/axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    newsletterCount: 0,
    subscriberCount: 0,
    subscribers: [],
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/newsletters/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const { newsletterCount, subscriberCount, subscribers } = stats;
  const visibleSubscribers = showAll ? subscribers : subscribers.slice(0, 3);

  const chartData = [
    { name: "Newsletters", count: newsletterCount },
    { name: "Subscribers", count: subscriberCount },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Faculty Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Newsletters</h3>
          <p className="text-3xl font-bold mt-2">{newsletterCount}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Subscribers</h3>
          <p className="text-3xl font-bold mt-2">{subscriberCount}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Newsletter & Subscriber Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subscriber List */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Subscriber Emails ({subscriberCount})
        </h3>
        {subscribers.length > 0 ? (
          <>
            <ul className="max-h-64 overflow-y-auto border rounded p-2 bg-white">
              {visibleSubscribers.map((s, i) => (
                <li
                  key={i}
                  className="border-b last:border-none py-2 text-gray-700"
                >
                  {s.email}
                </li>
              ))}
            </ul>
            {!showAll && subscribers.length > 3 && (
              <div className="text-center mt-3">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Show All
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
