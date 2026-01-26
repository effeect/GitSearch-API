// Handle the Repo Request
const express = require("express");
const router = express.Router();
const { Octokit } = require("octokit");

const octokitHandle = new Octokit({
  // auth: "hello",
});

router.post("/", async (req, res) => {
  const searchParams = req.body;

  console.log(searchParams);

  try {
    const data = await searchGithubPullRequests(searchParams);
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error processing search request:", error);
    res.status(500).json({ error: "Failed to fetch commits from GitHub." });
  }
});

async function searchGithubPullRequests(searchParams) {
  try {
    const result = await octokitHandle.rest.search.issuesAndPullRequests({
      q: searchParams.combinedQuery + ` is:pr`, // Filtering by only pull requests
      sort: "author-date", // Sorting by Author Date by default for now
      per_page: searchParams.per_page || 30,
      page: searchParams.page || 1,
    });
    return result.data;
  } catch (error) {
    console.error("Error in searchCommits:", error.message || error);
  }
}

module.exports = router;
