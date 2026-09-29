import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import { AppointmentsList } from "../components/AppointmentsList";

export const Home = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getAppointments().then(setAppointments).catch(console.error);
    }, []);

    return (
        <main>
            <h1>Bienvenido a la Agenda</h1>
            <hr style={{ margin: '20px 0' }}/>
            <AppointmentsList/>
        </main>
    )
}