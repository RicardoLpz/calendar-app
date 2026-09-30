import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AppointmentChip } from "./appointments/AppointmentChip";

export const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
            <Paper
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Próximas citas
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Citas próximas de tu agenda
                        </Typography>
                    </Box>
                    <Button
                        size="small"
                        onClick={() => navigate("/citas")}
                    >
                        Ver todas
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Descripcion
                                </TableCell>
                                <TableCell>
                                    Tipo
                                </TableCell>
                                <TableCell>
                                    Fecha inicio
                                </TableCell>
                                <TableCell>
                                    Fecha fin
                                </TableCell>
                                <TableCell>
                                    Notas
                                </TableCell>
                                <TableCell>
                                    Ubicacion
                                </TableCell>
                                <TableCell>
                                    Interesados
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {appointments.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                    >
                                        <Typography
                                            color="text.secondary"
                                            sx={{ py: 3 }}
                                        >
                                            No hay próximas citas
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.map((appointment) => (
                                    <TableRow
                                        key={appointment.id}
                                        hover
                                    >
                                        <TableCell>
                                            {appointment.description}
                                        </TableCell>
                                        <TableCell>
                                            <AppointmentChip
                                                appointmentType={appointment.appointment_type}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(appointment.starts_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(appointment.ends_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.notes}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.location}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                maxWidth: 200
                                            }}
                                        >
                                            {appointment.atendee?.map((atendee, id) => (
                                                <Chip 
                                                    key={id}
                                                    label={atendee}
                                                    size="small"
                                                />
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    );
};