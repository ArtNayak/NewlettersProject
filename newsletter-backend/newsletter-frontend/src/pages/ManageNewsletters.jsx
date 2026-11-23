import { useState, useEffect } from "react";
import API from "../api/axios";

const ManageNewsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const fetchNewsletters = async (query = "") => {
    const res = await API.get(`/newsletters/latest?search=${query}`);
    setNewsletters(res.data);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/newsletters", { title, description });
    setTitle("");
    setDescription("");
    fetchNewsletters();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchNewsletters(query);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Newsletters</h2>

      {/* Add newsletter */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input className="border p-2 rounded flex-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border p-2 rounded flex-1" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 rounded">Create</button>
      </form>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search newsletters..."
        value={search}
        onChange={handleSearch}
        className="border p-2 w-full mb-4 rounded"
      />

      {/* List */}
      <ul>
        {newsletters.map((n) => (
          <li key={n._id} className="border-b py-2">
            <strong>{n.title}</strong> - {n.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNewsletters;
