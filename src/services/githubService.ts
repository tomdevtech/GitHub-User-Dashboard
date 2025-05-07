import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
  company: string;
  blog: string;
  email: string;
  created_at: string;
}

export interface GitHubOrg {
  login: string;
  avatar_url: string;
  description: string;
  url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  license: { name: string } | null;
  topics?: string[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
}

export interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubPullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  user: { login: string; avatar_url: string };
  created_at: string;
}

export interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  state: string;
  user: { login: string; avatar_url: string };
  created_at: string;
}

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  },

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
    return response.data;
  },

  async getUserOrgs(username: string): Promise<GitHubOrg[]> {
    const response = await axios.get(`${BASE_URL}/users/${username}/orgs`);
    return response.data;
  },

  async getUserEvents(username: string): Promise<GitHubEvent[]> {
    const response = await axios.get(`${BASE_URL}/users/${username}/events/public`);
    return response.data;
  },

  async getRepoTopics(owner: string, repo: string): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/topics`, {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' }
    });
    return response.data.names;
  },

  async getRepoContributors(owner: string, repo: string): Promise<GitHubContributor[]> {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/contributors`);
    return response.data;
  },

  async getRepoPulls(owner: string, repo: string): Promise<GitHubPullRequest[]> {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/pulls`);
    return response.data;
  },

  async getRepoIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/issues`);
    return response.data;
  },

  async getRepoReadme(owner: string, repo: string): Promise<string> {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' }
    });
    return response.data;
  }
}; 