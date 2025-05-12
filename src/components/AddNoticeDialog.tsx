import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import type { Notice } from '../types';

interface AddNoticeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (notice: Omit<Notice, 'id' | 'date'>) => void;
  currentUser: { name: string; role: string; } | null;
}

export default function AddNoticeDialog({ 
  open, 
  onClose, 
  onSubmit,
  currentUser 
}: AddNoticeDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: `${currentUser?.name} (${currentUser?.role})`
    });

    // Reset form
    setTitle('');
    setContent('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Post New Notice</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Notice Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Post Notice
        </Button>
      </DialogActions>
    </Dialog>
  );
}