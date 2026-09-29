import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

import { useEffect, useState } from "react";


export const AppointmentTypeModal = ({
    open,
    appointmentType,
    onClose,
    onSubmit
}) => {

    const [formValues, setFormValues] = useState({
        name: ""
    });

    useEffect(() => {
        if (appointmentType) {
            setFormValues({
                name: appointmentType.name || ""
            });
        } else {
            setFormValues({
                name: ""
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
                    />
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
