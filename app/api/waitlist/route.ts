import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "waitlist.json");

async function ensureLocalDataFile() {
  const directory = path.dirname(dataFilePath);

  await fs.mkdir(directory, { recursive: true });

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
  }
}

async function readLocalEntries() {
  await ensureLocalDataFile();
  const raw = await fs.readFile(dataFilePath, "utf-8");
  const parsed = JSON.parse(raw || "[]");

  if (!Array.isArray(parsed)) {
    throw new Error("Stored waitlist data is invalid.");
  }

  return parsed;
}

async function appendToGitHub(email: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const filePath = "data/waitlist.json";

  if (!token || !repo) {
    throw new Error("GitHub env vars are not configured.");
  }

  const repoUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "antika-waitlist",
  };

  const currentFileResponse = await fetch(repoUrl, { headers });

  if (!currentFileResponse.ok) {
    const text = await currentFileResponse.text();
    throw new Error(`GitHub file fetch failed: ${currentFileResponse.status} ${text}`);
  }

  const currentFile = await currentFileResponse.json();
  const currentContent = Buffer.from(currentFile.content || "", "base64").toString("utf-8");

  let entries: Array<{ email: string; createdAt: string }> = [];

  try {
    const parsed = JSON.parse(currentContent || "[]");
    if (Array.isArray(parsed)) {
      entries = parsed;
    }
  } catch {
    entries = [];
  }

  const alreadyExists = entries.some((entry) => entry.email === email);
  if (!alreadyExists) {
    entries.push({
      email,
      createdAt: new Date().toISOString(),
    });
  }

  const nextContent = JSON.stringify(entries, null, 2);

  const commitResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add waitlist email ${email}`,
      content: Buffer.from(nextContent, "utf-8").toString("base64"),
      sha: currentFile.sha,
      branch,
    }),
  });

  if (!commitResponse.ok) {
    const text = await commitResponse.text();
    throw new Error(`GitHub write failed: ${commitResponse.status} ${text}`);
  }

  return;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    try {
      await appendToGitHub(email);
    } catch (githubError) {
      if (process.env.NODE_ENV === "development") {
        const entries = await readLocalEntries();
        const exists = entries.some((entry: { email?: string }) => entry.email === email);

        if (!exists) {
          entries.push({
            email,
            createdAt: new Date().toISOString(),
          });

          await fs.writeFile(dataFilePath, JSON.stringify(entries, null, 2));
        }
      } else {
        throw githubError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist save failed:", error);

    return NextResponse.json(
      { success: false, error: "Unable to save email right now." },
      { status: 500 }
    );
  }
}
