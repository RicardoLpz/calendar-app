import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Chip,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay } from "@mui/x-date-pickers/PickerDay";
import dayjs from "dayjs";
import { getAppointments } from "../services/api";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const Calendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const loadAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const appointmentDates = useMemo(() => {
        return new Set(
            appointments.map((appointment) =>
                dayjs(appointment.starts_at).format("YYYY-MM-DD")
            )
        );
    }, [appointments]);


    const selectedDayAppointments = useMemo(() => {
        const date = selectedDate.format("YYYY-MM-DD");
        return appointments.filter((appointment) =>
            dayjs(appointment.starts_at)
                .format("YYYY-MM-DD") === date
        );

    }, [appointments, selectedDate]);

    const AppointmentDay = (props) => {
        const {
            day,
            outsideCurrentMonth,
            ...other
        } = props;

        const formattedDate = day.format("YYYY-MM-DD");
        const hasAppointment =
            appointmentDates.has(formattedDate);
        return (
            <LocalizationProvider adapterLocale={undefined} dateAdapter={AdapterDayjs}>
                <PickerDay
                    {...other}
                    day={day}
                    outsideCurrentMonth={outsideCurrentMonth}
                    sx={{
                        ...(hasAppointment && {
                            backgroundColor: "success.main",
                            color: "success.contrastText",
                            "&:hover": {
                                backgroundColor: "success.dark"
                            },
                            "&.Mui-selected": {
                                backgroundColor: "success.dark"
                            }
                        })
                    }}
                />
            </LocalizationProvider>
        );
    };


    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5">
                    Calendario
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Consulta las citas programadas
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    }
                }}
            >

                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <LocalizationProvider adapterLocale={undefined} dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newDate) =>
                            setSelectedDate(newDate)
                        }
                        slots={{
                            day: AppointmentDay
                        }}
                    />
                    </LocalizationProvider>
                </Paper>

                <Paper
                    sx={{
                        p: 3,
                        flexGrow: 1
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >
                        Citas del{" "}
                        {selectedDate.format("DD/MM/YYYY")}
                    </Typography>
                    {selectedDayAppointments.length === 0 ? (
                        <Typography
                            color="text.secondary"
                        >
                            No hay citas para este día.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {selectedDayAppointments.map(
                                (appointment) => (
                                    <Paper
                                        key={appointment.id}
                                        variant="outlined"
                                        sx={{
                                            p: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    fontWeight="bold"
                                                >
                                                    { appointment.description }
                                                    {" - "}
                                                    { appointment.appointment_type?.name }
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {dayjs(appointment.starts_at).format("hh:mm A")}
                                                    {" - "}
                                                    {dayjs(appointment.ends_at).format("hh:mm A")}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label="Agendada"
                                                color="success"
                                                size="small"
                                            />
                                        </Box>
                                    </Paper>
                                )
                            )}
                        </Stack>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}
