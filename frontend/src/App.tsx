import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import SearchPage from './pages/search/components/SearchPage';
import theme from './theme';
import DetailsPage from './pages/details/components/DetailsPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            padding: 6,
            margin: 0,
            maxWidth: '100%',
            maxHeight: '100dvh',
            width: '100%',
            height: '100dvh',
            boxSizing: 'border-box',
          }}
        >
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
