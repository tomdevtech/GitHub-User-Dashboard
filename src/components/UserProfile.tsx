import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Link, Divider, Tooltip } from '@mui/material';
import type { GitHubUser, GitHubOrg, GitHubEvent } from '../services/githubService';

interface UserProfileProps {
  user: GitHubUser;
  orgs: GitHubOrg[];
  events: GitHubEvent[];
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, orgs, events }) => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={user.avatar_url}
                alt={user.login}
                sx={{ width: 200, height: 200, mb: 2 }}
              />
              <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
                <Typography variant="h6">@{user.login}</Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {user.location}
              </Typography>
              {user.company && (
                <Typography variant="body2" color="text.secondary">
                  {user.company}
                </Typography>
              )}
              {user.blog && (
                <Link href={user.blog} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body2">Website</Typography>
                </Link>
              )}
              {user.email && (
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            {orgs.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 1 }}>Organizations</Divider>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {orgs.map((org) => (
                    <Tooltip title={org.login} key={org.login}>
                      <Avatar src={org.avatar_url} alt={org.login} sx={{ width: 40, height: 40 }} />
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {user.bio || 'No bio available'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h6">{user.public_repos}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Repositories
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{user.public_gists}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Gists
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{user.followers}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{user.following}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Grid>
            </Grid>
            {events.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Divider sx={{ mb: 1 }}>Recent Activity</Divider>
                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {events.slice(0, 10).map((event) => (
                    <Typography key={event.id} variant="body2" color="text.secondary">
                      [{new Date(event.created_at).toLocaleDateString()}] {event.type} in {event.repo.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 