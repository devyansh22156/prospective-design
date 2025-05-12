import { Box, Typography, Container } from '@mui/material';
import NoticeItem from './NoticeItem';
import type { Notice } from '../types';

const SAMPLE_NOTICES: Notice[] = [
  {
    id: 1,
    title: "Welcome to Prospective Design",
    content: "Welcome to our new employee dashboard. Here you'll find important company announcements and updates.",
    date: new Date().toISOString(),
    author: "Management"
  },
  {
    id: 2,
    title: "Office Hours Update",
    content: "Starting next week, office hours will be 9 AM to 6 PM.",
    date: new Date().toISOString(),
    author: "HR Department"
  }
];

const NoticeBoard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Notice Board
      </Typography>
      <Box>
        {SAMPLE_NOTICES.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </Box>
    </Container>
  );
};

export default NoticeBoard;