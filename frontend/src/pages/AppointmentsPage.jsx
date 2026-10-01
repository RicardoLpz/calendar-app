import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAppointments, 
        createAppointment,
        updateAppointment, 
        deleteAppointment, 
        getAppointmentTypes
 } from "../services/api";
import { Box,
        Button,
        Paper,
        TextField,
        Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppointmentTable } from "../components/appointments/AppointmentTable";
import { AppointmentModal } from "../components/appointments/AppointmentModal";

const initialFormState = {
    description: '',
    notes: '',
    appointment_type_id: '',
    starts_at: '',
    ends_at: '',
    location: '',
}

export const AppointmentsPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [appointments, setAppointments] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    //load existing data
    const loadData = async () => {
        try{
            const typesData = await getAppointmentTypes();
            const appsData = await getAppointments();
            setTypes(typesData);
            setAppointments(appsData);
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadData();
    }, []);

    const handleCreate = () => {
        setSelectedAppointment(null);
        setModalOpen(true);
    };


    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setModalOpen(true);
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Seguro que quieres eliminar esta cita?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteAppointment(id);
            await loadData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (selectedAppointment) {
                await updateAppointment(
                    selectedAppointment.id,
                    data
                );
            } else {
                await createAppointment(data);
            }

            setModalOpen(false);
            setSelectedAppointment(null);
            await loadData();

        } catch (error) {
            alert(error.message);
        }
    };


    const filteredAppointments = appointments.filter(
        (appointment) => {
            const searchText = search.toLowerCase();
            return (
                appointment.description
                    ?.toLowerCase()
                    .includes(searchText) ||
                appointment.notes
                    ?.toLowerCase()
                    .includes(searchText)
            );
        }
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
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Citas
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Administra las citas de tu agenda
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nueva cita
                </Button>
            </Box>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "divider"
                }}
            >
                <TextField
                    size="small"
                    fullWidth
                    label="Buscar"
                    placeholder="Descripcion o notas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Paper>
            <AppointmentTable
                appointments={filteredAppointments}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AppointmentModal
                open={modalOpen}
                appointment={selectedAppointment}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                appointmentTypes={types}
            />

        </Box>
    );
}

