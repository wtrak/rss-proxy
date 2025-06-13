const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const app = express();
const parser = new Parser();

app.use(cors());

app.get("/feed", async (req, res) => {
  const feedUrl = req.query.url;
  if (!feedUrl) {
    return res.status(400).json({ error: "Missing RSS feed URL" });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json(feed.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to parse feed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`RSS proxy running on port ${port}`));
