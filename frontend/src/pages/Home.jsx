import { useEffect, useState } from "react";
import { getAppointments, getAppointmentTypes } from "../services/api";
import { AppointmentsList } from "../components/AppointmentsList";
import { TypesIndex } from "../components/appointmentTypes/TypesIndex";

export const Home = () => {
    const [appointments, setAppointments] = useState([]);
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    useEffect(() => {
        getAppointments().then(setAppointments).catch(console.error);
        getAppointmentTypes().then(setAppointmentTypes).catch(console.error);
    }, []);

    return (
        <main>
            <h1>Bienvenido a la Agenda</h1>
            <hr style={{ margin: '20px 0' }}/>
            <TypesIndex
                appointments={appointments}
                appointmentTypes={appointmentTypes}
            />
            <AppointmentsList/>
        </main>
    )
}