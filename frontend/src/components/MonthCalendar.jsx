import { useState } from "react";

export const MonthCalendar = ({appointments = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    //Adjustment, 0 = MOnday, 6 = sunday
    let startingDay = firstDayOfMonth.getDay() - 1;
    if (startingDay === -1) startingDay = 6;

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getDaysWithAppointments = () => {
        const activeDays = new Set();
        appointments.forEach((item) => {
            const date = new Date(item.starts_at);
            if(date.getFullYear() === year && date.getMonth() === month) {
                activeDays.add(date.getDate());
            }
        });
        return activeDays;
    };

    const activeDays = getDaysWithAppointments();

    //build empty cells and month days 
    const emptySlots = Array.from({ length: startingDay });
    const daySlots = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return(
        <div style={{ maxWidth: '450px', margin: '20px auto', fontFamily: 'sans-serif' }}>
            {/* header and nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <button onClick={handlePrevMonth}>&lt; Anterior</button>
                <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{monthName}</h3>
                <button onClick={handleNextMonth}>Siguiente &gt;</button>
            </div>

            {/* weekdays */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d) => (
                <div key={d} style={{ padding: '4px' }}>{d}</div>
                ))}
            </div>

            {/* grid of days*/}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '5px' }}>
                {emptySlots.map((_, i) => (
                <div key={`empty-${i}`} style={{ height: '40px' }} />
                ))}

                {/* month days */}
                {daySlots.map((day) => {
                const hasApp = activeDays.has(day);
                return (
                    <div
                    key={day}
                    style={{
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        border: '1px solid #eee',
                        backgroundColor: hasApp ? '#2ecc71' : '#f9f9f9',
                        color: hasApp ? 'white' : '#333',
                        fontWeight: hasApp ? 'bold' : 'normal',
                        position: 'relative',
                    }}
                    >
                    {day}
                    {hasApp && (
                        <span
                        style={{
                            position: 'absolute',
                            bottom: '3px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                        }}
                        />
                    )}
                    </div>
                );
                })}
            </div>
        </div>
    );
};