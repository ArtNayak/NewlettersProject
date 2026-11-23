import Newsletter from "../models/Newsletter.js";
import Subscription from "../models/Subscription.js";

// Create newsletter (faculty)
export const createNewsletter = async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all newsletters (student view + faculty view)
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search newsletters by title or description (for students)
export const searchNewsletters = async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i"); // case-insensitive search
    const results = await Newsletter.find({
      $or: [{ title: regex }, { description: regex }, { content: regex }],
    }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stats (faculty dashboard)
export const getStats = async (req, res) => {
  try {
    const newsletterCount = await Newsletter.countDocuments();
    const subscriberCount = await Subscription.countDocuments();
    
    // Get all subscriber emails sorted by latest first
    const subscribers = await Subscription.find({}, "email -_id").sort({ createdAt: -1 });

    // Debug: Log the count
    console.log(`Subscribers found: ${subscribers.length}`);

    res.json({
      newsletterCount,
      subscriberCount,
      subscribers,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: err.message });
  }
};

