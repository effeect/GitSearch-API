// Handle the Repo Request
const express = require("express");
const router = express.Router();
const { Octokit } = require("octokit");

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  // auth: "hello",
});

router.post("/", async (req, res) => {
  const searchParams = req.body;

  console.log(searchParams);

  // if (!searchParams || !searchParams.query) {
  //   return res.status(400).json({ error: "Missing search query parameters." });
  // }

  try {
    const data = await searchRepos(searchParams);
    res.json(data);
  } catch (error) {
    console.error("Error processing search request:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch repositories from GitHub." });
  }
});

async function searchRepos(searchParams) {
  try {
    // console.log(createQuery(repo));
    // console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.search.repos({
      q: searchParams.q,
      per_page: 30,
      page: 1,
    });
    console.log(result);
    return result.data.items;
  } catch (error) {
    console.error("Error in searchRepos:", error.message || error);
  }
}

module.exports = router;
