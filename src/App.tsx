import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import NoticeBoard from './components/NoticeBoard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <NoticeBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;