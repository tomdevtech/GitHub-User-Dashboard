import { useState } from 'react'
import { Container, Alert, CircularProgress, Box } from '@mui/material'
import { UserSearch } from './components/UserSearch'
import { UserProfile } from './components/UserProfile'
import { RepositoryList } from './components/RepositoryList'
import { githubService } from './services/githubService'
import type { GitHubUser, GitHubRepo, GitHubOrg, GitHubEvent } from './services/githubService'

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [orgs, setOrgs] = useState<GitHubOrg[]>([])
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (username: string) => {
    setLoading(true)
    setError(null)
    try {
      const [userData, reposData, orgsData, eventsData] = await Promise.all([
        githubService.getUser(username),
        githubService.getUserRepos(username),
        githubService.getUserOrgs(username),
        githubService.getUserEvents(username)
      ])
      setUser(userData)
      setRepos(reposData)
      setOrgs(orgsData)
      setEvents(eventsData)
    } catch (err) {
      setError('Failed to fetch user data. Please check the username and try again.')
      setUser(null)
      setRepos([])
      setOrgs([])
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserSearch onSearch={handleSearch} />
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {user && <UserProfile user={user} orgs={orgs} events={events} />}
      {repos.length > 0 && <RepositoryList repos={repos} username={user?.login || ''} />}
    </Container>
  )
}

export default App
