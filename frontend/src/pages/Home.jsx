import { useEffect, useState } from "react";
import { MonthCalendar } from "../components/MonthCalendar";
import { getAppointments } from "../services/api";
import { AppointmentsList } from "../components/AppointmentsList";
import { AppointmentSearch } from '../components/AppointmentSearch';

export const Home = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getAppointments().then(setAppointments).catch(console.error);
    }, []);

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Bienvenido al Calendario</h1>
            <p>Listado de citas programadas</p>
            <hr style={{ margin: '20px 0' }}/>
            <AppointmentSearch 
                appointments={appointments} 
                onSelectAppointment={(cita) => alert(`Seleccionaste: ${cita.description}`)}
            />
            <AppointmentsList/>
            <p>Vista de calendario</p>
            <hr style={{ margin: '20px 0' }}/>
            <MonthCalendar appointments={appointments}/>
        </main>
    )
}