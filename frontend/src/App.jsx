import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Home } from "./pages/Home";
import { AppointmentsPage } from './pages/AppointmentsPage';
import { AppointmentsTypesPage } from './pages/AppointmentsTypesPage';
import { Layout } from './components/layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/citas"
                        element={<AppointmentsPage />}
                    />
                    <Route
                        path="/calendario"
                        element={""}
                    />
                    <Route
                        path="/tipos-citas"
                        element={<AppointmentsTypesPage />}
                    />
                </Route>
            </Routes>
    </ThemeProvider>
  );
}  

export default App
