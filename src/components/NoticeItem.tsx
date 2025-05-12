import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import type { Notice } from '../types';
import { format } from 'date-fns';

interface NoticeItemProps {
  notice: Notice;
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
  return (
    <Card 
      sx={{ 
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 1,
          borderColor: 'primary.light',
        },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              mr: 2
            }}
          >
            {notice.author[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
              {notice.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted by {notice.author} • {format(new Date(notice.date), 'PPP')}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {notice.content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label="Company Notice" 
            size="small" 
            sx={{ 
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            }} 
          />
          <Chip 
            label={notice.author} 
            size="small"
            variant="outlined"
            sx={{ borderColor: 'primary.light' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoticeItem;