import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface UserSearchProps {
  onSearch: (username: string) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        GitHub User Dashboard
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="GitHub Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          size="large"
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}; 