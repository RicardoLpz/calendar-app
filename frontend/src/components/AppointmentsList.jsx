import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

export const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNearAppointments = async()=>{
            try{
                const data = await getAppointments();
                const now = new Date();

                const nearApps = data
                    .filter((app) => new Date(app.starts_at) >= now)
                    .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));

                setAppointments(nearApps);
            } catch (err) {
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };
        fetchNearAppointments();
    }, []);

    if(loading) return <p>Cargando proximas citas</p>;
    if(error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return(
        <div className="appointments-container">
            <h2>Próximas Citas</h2>
            {appointments.length === 0 ? (
                <p>No hay citas programadas</p>
            ) : (
                <ul className="appointments-list" style={{ listStyle: 'none', padding: 0 }}>
                    {appointments.map((app) => (
                        <li
                            key={app.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '10px',
                            }}
                        >
                            <h3>{app.description}</h3>
                            <p><strong>Fecha y Hora:</strong> {new Date(app.starts_at).toLocaleString()}</p>
                            {app.notes && <p><strong>Notas:</strong> {app.notes}</p>}
                            {app.location && <p><strong>Ubicacion:</strong> {app.location}</p>}
                        </li>
                    ))}
                </ul>
            )}            
        </div>
    );
};