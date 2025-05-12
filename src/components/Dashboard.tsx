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
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import NoticeBoard from './NoticeBoard';
import type { User, Notice } from '../types/user';
import { format } from 'date-fns';

const drawerWidth = 240;

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  user: User;
}

export default function Dashboard({ mobileOpen, handleDrawerToggle, user }: Props) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "Welcome to Prospective Design",
      content: "Welcome to our new employee dashboard. Here you'll find important company announcements and updates.",
      date: new Date().toISOString(),
      author: "Management",
      priority: "normal",
    },
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddNotice = (newNotice: Omit<Notice, 'id' | 'date'>) => {
    const notice: Notice = {
      ...newNotice,
      id: notices.length + 1,
      date: new Date().toISOString(),
    };
    setNotices([notice, ...notices]);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Notices', icon: <NotificationsIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const formatUTCDateTime = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div" gutterBottom>
          Welcome, {user.name}
        </Typography>
        <Stack spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: 'monospace',
            }}
          >
            <AccessTimeIcon fontSize="small" />
            UTC: {formatUTCDateTime(currentTime)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'monospace' }}
          >
            Login: {user.username}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <ListItemIcon
                sx={{
                  color: selectedIndex === index
                    ? theme.palette.primary.main
                    : 'inherit',
                }}
              >
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>

          {/* UTC Time and User Login display */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontFamily: 'monospace',
              }}
            >
              <AccessTimeIcon fontSize="small" />
              UTC: {formatUTCDateTime(currentTime)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: 'monospace' }}
            >
              Login: {user.username}
            </Typography>
          </Stack>
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