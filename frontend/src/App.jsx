import { Home } from "./pages/Home";
import { Routes, Route, Link } from 'react-router-dom';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { AppointmentsTypesPage } from './pages/AppointmentsTypesPage';

function App() {
  return (
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
  );
}  

export default App
