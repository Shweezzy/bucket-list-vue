const { Router } = require("express");
const BucketListItem = require("../../schemas/BudgetListItem");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const bucketListItem = await BucketListItem.find();

    if (!bucketListItem) throw new Error("emptry bucketListItem");

    const sort = bucketListItem.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    res.status(200).json(sort);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newBucketListItem = new BucketListItem(req.body);

  try {
    const bucketListItem = await newBucketListItem.save();

    if (!bucketListItem)
      throw new Error("Something went wrong saving a bucket list");

    res.status(200).json(bucketListItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BucketListItem.findByIdAndUpdate(id, req.body);

    if (!response) throw Error("Something went wrong");

    const updated = { ...response._doc, ...req.body };

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await BucketListItem.findByIdAndDelete(id);

    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
