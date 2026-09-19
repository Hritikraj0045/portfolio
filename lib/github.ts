import "server-only";
import type { GithubStats } from "@/types";

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      followers { totalCount }
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) {
        totalCount
      }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function getGithubStats(): Promise<GithubStats> {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

  const to = new Date("2023-12-31T23:59:59Z");
  const from = new Date("2023-01-01T00:00:00Z");
  // from.setDate(to.getDate() - 364);

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub GraphQL request failed: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    const user = json.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;

    const days = calendar.weeks.flatMap(
      (w: { contributionDays: { contributionCount: number }[] }) =>
        w.contributionDays
    );

    // Separately fetch total stars
    const starsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { next: { revalidate: 3600 } }
    );

    const repos = starsRes.ok ? await starsRes.json() : [];

    const stars = Array.isArray(repos)
      ? repos.reduce(
          (
            sum: number,
            r: { stargazers_count?: number }
          ) => sum + (r.stargazers_count ?? 0),
          0
        )
      : 0;

    return {
      username: GITHUB_USERNAME,
      contributions: calendar.totalContributions,
      repositories: user.repositories.totalCount,
      stars,
      followers: user.followers.totalCount,
      heatmap: days.map(
        (d: { contributionCount: number }) =>
          bucketize(d.contributionCount)
      ),
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);

    return {
      username: GITHUB_USERNAME,
      contributions: 0,
      repositories: 0,
      stars: 0,
      followers: 0,
      heatmap: Array(371).fill(0),
    };
  }
}

// GitHub's own UI buckets raw counts into 5 intensity levels
function bucketize(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}