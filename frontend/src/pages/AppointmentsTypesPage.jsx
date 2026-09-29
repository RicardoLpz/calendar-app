import { useEffect, useState } from "react";
import { getAppointmentTypes, createAppointmentType,
        updateAppointmentType, deleteAppointmentType
 } from "../services/api";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { AppointmentTypeTable } from "../components/appointmentTypes/AppointmentTypeTable";
import { AppointmentTypeModal } from "../components/appointmentTypes/AppointmentTypeModal"; 

export const AppointmentsTypesPage = () => {
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);

    //load existing data
    const loadTypes = async () => {
        try{
            const data = await getAppointmentTypes();
            setAppointmentTypes(data);
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadTypes();
    }, []);

    const handleCreate = () => {
        setSelectedAppointmentType(null);
        setModalOpen(true);
    };


    const handleEdit = (appointmentType) => {
        setSelectedAppointmentType(appointmentType);
        setModalOpen(true);
    };


    const handleDelete = async (id) => {
        if (!window.confirm(
            "¿Seguro que quieres eliminar este tipo de cita?"
        )) {
            return;
        }

        try {
            await deleteAppointmentType(id);
            await loadTypes();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedAppointmentType) {
                await updateAppointmentType(
                    selectedAppointmentType.id,
                    formData
                );
            } else {
                await createAppointmentType(formData);
            }
            setModalOpen(false);
            await loadTypes();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const filteredTypes = appointmentTypes.filter((type) =>
        type.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Box>
                    <Typography variant="h5">
                        Tipos de citas
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Administra los tipos de citas disponibles
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nuevo tipo
                </Button>
            </Box>
            <Paper
                sx={{
                    p: 2,
                    mb: 2
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    label="Buscar tipo de cita"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />
            </Paper>
            <AppointmentTypeTable
                appointmentTypes={filteredTypes}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AppointmentTypeModal
                open={modalOpen}
                appointmentType={selectedAppointmentType}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}