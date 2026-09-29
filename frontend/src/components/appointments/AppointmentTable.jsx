import {
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export const AppointmentTable = ({
    appointments,
    loading,
    onEdit,
    onDelete
}) => {

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider"
            }}
        >
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
                            FEcha inicio
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
                        <TableCell align="right">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {appointments.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                align="center"
                            >
                                <Typography
                                    color="text.secondary"
                                    sx={{ py: 4 }}
                                >
                                    No hay citas disponibles
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
                                    {appointment.appointment_type?.name || ""}
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
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            onEdit(appointment)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            onDelete(appointment.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}