import { Chip } from "@mui/material";

export const AppointmentChip = ({ appointmentType }) => {
    return (
        <Chip
            label={appointmentType?.name || "Sin tipo"}
            sx={{
                backgroundColor:
                    appointmentType?.color || "#1976d2",
                color: "#fff",
                fontWeight: 500
            }}
        />
    );
}
