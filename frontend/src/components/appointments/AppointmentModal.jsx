import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";

import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";


export const AppointmentModal = ({
    open,
    appointment,
    onClose,
    onSubmit,
    appointmentTypes
}) => {

    const [formValues, setFormValues] = useState({
        description: "",
        appointment_type_id: "",
        starts_at: "",
        ends_at: "",
        notes: "",
        location: ""
    });

    useEffect(() => {
        if (appointment) {
            setFormValues({
                description: appointment.description || "",
                appointment_type_id: appointment.appointment_type_id || "",
                starts_at: appointment.starts_at || "",
                ends_at: appointment.ends_at || "",
                notes: appointment.notes || "",
                location: appointment.location || "",
            });
        } else {
            setFormValues({
                description: "",
                appointment_type_id: "",
                starts_at: "",
                ends_at: "",
                notes: "",
                location:""
            });
        }

    }, [appointment, open]);

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
                    {appointment
                        ? "Editar cita"
                        : "Nueva cita"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Descripcion"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        select
                        margin="normal"
                        label="Tipo de cita"
                        name="appointment_type_id"
                        value={formValues.appointment_type_id}
                        onChange={handleChange}
                        required
                    >
                        {appointmentTypes.map((type) => (
                            <MenuItem
                                key={type.id}
                                value={type.id}
                            >
                                {type.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider adapterLocale={undefined} dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Fecha inicio"
                            value={
                                formValues.starts_at
                                    ? dayjs(formValues.starts_at)
                                    : null
                            }
                            onChange={(value) => {
                                setFormValues((previous) => ({
                                    ...previous,
                                    starts_at: value
                                        ? value.toISOString()
                                        : ""
                                }));
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: "normal",
                                    required: true
                                }
                            }}
                        />
                        <DateTimePicker
                            label="Fecha fin"
                            value={
                                formValues.ends_at
                                    ? dayjs(formValues.ends_at)
                                    : null
                            }
                            onChange={(value) => {
                                setFormValues((previous) => ({
                                    ...previous,
                                    ends_at: value
                                        ? value.toISOString()
                                        : ""
                                }));
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: "normal",
                                    required: true
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Notas"
                        name="notes"
                        value={formValues.notes}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Ubicacion"
                        name="location"
                        value={formValues.location}
                        onChange={handleChange}
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
                        {appointment
                            ? "Guardar cambios"
                            : "Crear cita"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
