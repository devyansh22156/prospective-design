import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem } from '@mui/material';

export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'HR' | 'Management';
}

interface NoticeBoardProps {
  user: User;
  notices: string[];
  onAddNotice: (notice: string) => void;
}

export default function NoticeBoard({ user, notices, onAddNotice }: NoticeBoardProps) {
  const [newNotice, setNewNotice] = useState('');

  const canPostNotices = user.role === 'HR' || user.role === 'Management';

  const handlePostNotice = () => {
    if (newNotice.trim()) {
      onAddNotice(newNotice);
      setNewNotice('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notice Board
      </Typography>
      <List>
        {notices.map((notice, index) => (
          <ListItem key={index}>
            <Typography>{notice}</Typography>
          </ListItem>
        ))}
      </List>
      {canPostNotices && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="New Notice"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostNotice}
            sx={{ mt: 1 }}
          >
            Post Notice
          </Button>
        </Box>
      )}
    </Box>
  );
}