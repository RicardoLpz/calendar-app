import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";


export const AppointmentTypeModal = ({
    open,
    appointmentType,
    onClose,
    onSubmit
}) => {

    const [formValues, setFormValues] = useState({
        name: "",
        color: "#1976d2"
    });

    useEffect(() => {
        if (appointmentType) {
            setFormValues({
                name: appointmentType.name || "",
                color: appointmentType.color || "#1976d2"
            });
        } else {
            setFormValues({
                name: "",
                color: "#1976d2"
            });
        }
    }, [appointmentType, open]);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;
        setFormValues((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("MODAL:", formValues);
        onSubmit(formValues);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {appointmentType
                        ? "Editar tipo de cita"
                        : "Nuevo tipo de cita"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                        autoFocus
                        slotProps={{
                            htmlInput: {
                                maxLength: 40
                            }
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Typography>
                            Selecciona Color:
                        </Typography>
                        <Box
                            component="input"
                            type="color"
                            name="color"
                            value={formValues.color}
                            onChange={handleChange}
                            sx={{
                                width: 50,
                                height: 40,
                                border: "none",
                                background: "transparent",
                                cursor: "pointer"
                            }}
                        />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {formValues.color}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        {appointmentType
                            ? "Guardar cambios"
                            : "Crear tipo"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
