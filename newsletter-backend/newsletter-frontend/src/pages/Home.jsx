import { useState, useEffect } from "react";
import API from "../api/axios";
import NewsletterCard from "../components/NewsletterCard";

const Home = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all newsletters or search
  const fetchNewsletters = async (query = "") => {
    try {
      const res = query
        ? await API.get(`/newsletters/search?q=${query}`)
        : await API.get(`/newsletters`);
      setNewsletters(res.data);
    } catch (err) {
      console.error("Error fetching newsletters:", err);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchNewsletters(query);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/subscriptions", { email });
      setFeedback(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setFeedback("Subscription failed. Try again!");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome to the Newsletter Portal
      </h2>

      {/* Email Subscription */}
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-2 mb-6 justify-center"
      >
        <input
          type="email"
          placeholder="Enter your email..."
          className="border p-2 rounded flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
      {feedback && (
        <p className="text-center text-green-600 font-medium">{feedback}</p>
      )}

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search newsletters..."
          value={search}
          onChange={handleSearch}
          className="border p-2 w-full sm:w-1/2 rounded"
        />
      </div>

      {/* Newsletters List */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-3">Latest Newsletters</h3>
        {newsletters.length > 0 ? (
          <div className="grid gap-4">
            {newsletters.map((nl) => (
              <NewsletterCard key={nl._id} {...nl} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No newsletters available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
