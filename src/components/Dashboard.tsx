import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import NoticeBoard from './NoticeBoard';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'HR' | 'Management';
}

const drawerWidth = 240;

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  user: User;
}

export default function Dashboard({ mobileOpen, handleDrawerToggle, user }: Props) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notices, setNotices] = useState<string[]>([]);

  // Fetch notices from the database
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('/api/notices'); // Replace with your API endpoint
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  // Add a new notice and save it to the database
  const handleAddNotice = async (newNotice: string) => {
    try {
      const response = await axios.post('/api/notices', { notice: newNotice }); // Replace with your API endpoint
      setNotices((prevNotices) => [...prevNotices, response.data.notice]);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Notices', icon: <NotificationsIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Welcome, {user.name}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <ListItemIcon sx={{ color: selectedIndex === index ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {selectedIndex === 1 ? (
          <NoticeBoard
            user={user}
            notices={notices}
            onAddNotice={handleAddNotice}
          />
        ) : (
          <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
            {selectedIndex === 0 && "Welcome to Prospective Design Dashboard"}
            {selectedIndex === 2 && "Profile Page Coming Soon"}
            {selectedIndex === 3 && "Settings Page Coming Soon"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}