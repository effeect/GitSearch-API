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

  try {
    const data = await GetRepoDetails(searchParams);
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error processing search request:", error);
    // Check if it's a known Octokit/HTTP error with a status code
    const statusCode = error.status || 500;
    const message =
      error.message || "Failed to fetch repositories from GitHub.";

    // You can customize the response based on the status code
    if (statusCode === 404) {
      res.status(404).json({ error: "Repository not found." });
    } else {
      res.status(statusCode).json({ error: message });
    }
  }
});

async function GetRepoDetails(searchParams) {
  try {
    const result = await octokitHandle.rest.repos.get({
      owner: searchParams.owner,
      repo: searchParams.repo,
    });
    // console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error in searchRepos:", error.message || error);
    throw error;
  }
}

module.exports = router;
