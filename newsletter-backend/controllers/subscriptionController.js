import Subscription from "../models/Subscription.js";

export const addSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    let existing = await Subscription.findOne({ email });
    if (existing) return res.json({ message: "Already subscribed" });

    const newSub = new Subscription({ email });
    await newSub.save();
    res.json({ message: "Subscription successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
