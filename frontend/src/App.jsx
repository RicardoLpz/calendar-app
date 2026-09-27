import { Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Home } from "./pages/Home";
import { AppointmentsPage } from './pages/AppointmentsPage';
import { AppointmentsTypesPage } from './pages/AppointmentsTypesPage';

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
      <div>
        <nav style={{ background: '#2c3e50', padding: '15px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/citas" style={{ color: 'white', textDecoration: 'none' }}>Gestionar Citas</Link>
          <Link to="/tipos-cita" style={{ color: 'white', textDecoration: 'none' }}>Gestionar Tipos de Cita</Link>
        </nav>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<AppointmentsPage />} />
            <Route path="/tipos-cita" element={<AppointmentsTypesPage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}  

export default App
