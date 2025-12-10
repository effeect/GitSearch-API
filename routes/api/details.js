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
    res
      .status(500)
      .json({ error: "Failed to fetch repositories from GitHub." });
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
  }
}

module.exports = router;
