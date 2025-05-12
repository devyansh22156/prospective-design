import { Card, CardContent, Typography, Box } from '@mui/material';
import type { Notice } from '../types';
import { format } from 'date-fns';

interface NoticeItemProps {
  notice: Notice;
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {notice.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Posted by {notice.author} on {format(new Date(notice.date), 'PPP')}
        </Typography>
        <Typography variant="body2">
          {notice.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoticeItem;