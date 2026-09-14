import { AppointmentsList } from "../components/AppointmentsList";

export const Home = () => {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Bienvenido al Calendario</h1>
            <p>Listado de citas programadas</p>
            <hr style={{ margin: '20px 0' }}/>
            <AppointmentsList/>
        </main>
    )
}