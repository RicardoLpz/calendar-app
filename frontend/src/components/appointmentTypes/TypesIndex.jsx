import {
    Box,
    Paper,
    Typography,
    Chip
} from "@mui/material";

import {
    useMemo
} from "react";

export const TypesIndex = ({appointmentTypes, appointments}) =>{
    
    const appointmentTypeCounts = useMemo(() => {
        const counts = {};
        appointments.forEach((appointment) => {
            const typeId = appointment.appointment_type?.id;
            if (!typeId) return;
            counts[typeId] = (counts[typeId] || 0) + 1;
        });
        return counts;
    }, [appointments]);

    return(
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 2
            }}
        >
            {appointmentTypes.map((type) => (
                <Box
                    key={type.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: type.color
                        }}
                    />
                    <Typography variant="body2">
                        {type.name}
                    </Typography>
                    <Chip
                        label={appointmentTypeCounts[type.id] || 0}
                        size="small"
                    />
                </Box>
            ))}
        </Box>
    )
}