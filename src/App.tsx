import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import type { User } from './types/user';

// Removed local declaration of User to avoid conflict with imported type

const theme = createTheme({
  // ... (previous theme configuration)
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = (userData: { username: string; role: string }) => {
    setUser({
      id: '1',
      username: userData.username,
      name: userData.username,
      role: userData.role as User['role'],
      email: `${userData.username}@prospectivedesign.com`,
    });
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
        user={user}
      />
    </ThemeProvider>
  );
}

export default App;