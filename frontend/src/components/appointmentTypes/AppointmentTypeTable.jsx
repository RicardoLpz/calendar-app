import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export const AppointmentTypeTable = ({
    appointmentTypes,
    loading,
    onEdit,
    onDelete
}) => {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Nombre
                        </TableCell>
                        <TableCell align="right">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                align="center"
                            >
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : appointmentTypes.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                align="center"
                            >
                                <Box sx={{ py: 3 }}>
                                    <Typography
                                        color="text.secondary"
                                    >
                                        No hay tipos de citas
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        appointmentTypes.map((type) => (
                            <TableRow
                                key={type.id}
                                hover
                            >
                                <TableCell>
                                    {type.id}
                                </TableCell>
                                <TableCell>
                                    {type.name}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            onEdit(type)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            onDelete(type.id)
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
