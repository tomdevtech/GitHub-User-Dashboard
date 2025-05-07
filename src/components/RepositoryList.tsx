import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Link, Chip, Box, Divider, Avatar, Tooltip, Collapse, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LicenseIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { GitHubRepo } from '../services/githubService';
import { githubService } from '../services/githubService';

interface RepositoryListProps {
  repos: GitHubRepo[];
  username: string;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({ repos, username }) => {
  const [expandedRepo, setExpandedRepo] = useState<number | null>(null);
  const [repoDetails, setRepoDetails] = useState<Record<number, any>>({});

  const handleExpand = async (repo: GitHubRepo) => {
    if (expandedRepo === repo.id) {
      setExpandedRepo(null);
      return;
    }
    setExpandedRepo(repo.id);
    if (!repoDetails[repo.id]) {
      const [topics, contributors, pulls, issues, readme] = await Promise.all([
        githubService.getRepoTopics(username, repo.name),
        githubService.getRepoContributors(username, repo.name),
        githubService.getRepoPulls(username, repo.name),
        githubService.getRepoIssues(username, repo.name),
        githubService.getRepoReadme(username, repo.name)
      ]);
      setRepoDetails((prev) => ({
        ...prev,
        [repo.id]: { topics, contributors, pulls, issues, readme }
      }));
    }
  };

  return (
    <Grid container spacing={2}>
      {repos.map((repo) => (
        <Grid item xs={12} md={6} key={repo.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  <Typography variant="h6" gutterBottom>
                    {repo.name}
                  </Typography>
                </Link>
                <Button onClick={() => handleExpand(repo)} endIcon={expandedRepo === repo.id ? <ExpandLessIcon /> : <ExpandMoreIcon />} size="small">
                  Details
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {repo.description || 'No description available'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                {repo.language && (
                  <Chip label={repo.language} size="small" variant="outlined" />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {repo.stargazers_count}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ForkRightIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {repo.forks_count}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ErrorOutlineIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {repo.open_issues_count}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <RemoveRedEyeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {repo.watchers_count}
                  </Typography>
                </Box>
                {repo.license && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LicenseIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {repo.license.name}
                    </Typography>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </Typography>
              </Box>
              <Collapse in={expandedRepo === repo.id} timeout="auto" unmountOnExit>
                <Divider sx={{ my: 2 }}>Topics</Divider>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {repoDetails[repo.id]?.topics?.length > 0 ? repoDetails[repo.id].topics.map((topic: string) => (
                    <Chip key={topic} label={topic} size="small" color="primary" />
                  )) : <Typography variant="body2">No topics</Typography>}
                </Box>
                <Divider sx={{ my: 2 }}>Contributors</Divider>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {repoDetails[repo.id]?.contributors?.length > 0 ? repoDetails[repo.id].contributors.slice(0, 10).map((contributor: any) => (
                    <Tooltip title={contributor.login} key={contributor.login}>
                      <Avatar src={contributor.avatar_url} alt={contributor.login} sx={{ width: 32, height: 32 }} />
                    </Tooltip>
                  )) : <Typography variant="body2">No contributors</Typography>}
                </Box>
                <Divider sx={{ my: 2 }}>Pull Requests</Divider>
                <Box sx={{ mb: 2 }}>
                  {repoDetails[repo.id]?.pulls?.length > 0 ? repoDetails[repo.id].pulls.slice(0, 5).map((pr: any) => (
                    <Typography key={pr.id} variant="body2">
                      <Link href={pr.html_url} target="_blank" rel="noopener noreferrer">{pr.title}</Link> by {pr.user.login}
                    </Typography>
                  )) : <Typography variant="body2">No pull requests</Typography>}
                </Box>
                <Divider sx={{ my: 2 }}>Issues</Divider>
                <Box sx={{ mb: 2 }}>
                  {repoDetails[repo.id]?.issues?.length > 0 ? repoDetails[repo.id].issues.slice(0, 5).map((issue: any) => (
                    <Typography key={issue.id} variant="body2">
                      <Link href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</Link> by {issue.user.login}
                    </Typography>
                  )) : <Typography variant="body2">No issues</Typography>}
                </Box>
                <Divider sx={{ my: 2 }}>README</Divider>
                <Box sx={{ mb: 2, maxHeight: 200, overflow: 'auto', background: '#f5f5f5', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    {repoDetails[repo.id]?.readme ? repoDetails[repo.id].readme.slice(0, 2000) : 'No README found.'}
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 