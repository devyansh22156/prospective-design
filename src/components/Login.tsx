import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface LoginProps {
  onLogin: (userData: { username: string; role: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('EMPLOYEE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, role });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
          Prospective Design
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="EMPLOYEE">Employee</MenuItem>
              <MenuItem value="HR">HR Department</MenuItem>
              <MenuItem value="ADMIN">Management</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}