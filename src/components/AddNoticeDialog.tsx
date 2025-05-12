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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { Notice } from '../types';
import type { User } from '../types';

interface AddNoticeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (notice: Omit<Notice, 'id' | 'date'>) => void;
  currentUser: User;
}

export default function AddNoticeDialog({ 
  open, 
  onClose, 
  onSubmit,
  currentUser 
}: AddNoticeDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Notice['priority']>('normal');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: `${currentUser.name} (${currentUser.role})`,
      priority
    });

    // Reset form
    setTitle('');
    setContent('');
    setPriority('normal');
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
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as Notice['priority'])}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
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