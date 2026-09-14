import { useState } from 'react';

export const AppointmentSearch = ({ appointments = [], onSelectAppointment }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAppointments = appointments.filter((item) => {
        const term = searchTerm.toLowerCase().trim();
        if(!term) return false;

        const matchesDescription = item.description?.toLowerCase().includes(term);
        const matchesNotes = item.notes?.toLowerCase().includes(term);
        return matchesDescription || matchesNotes;
    });

    const termEntered = searchTerm.trim().length > 0;

    return(
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Buscador de Citas</h3>

            <div style={{ marginBottom: '15px' }}>
                <input
                type="text"
                placeholder="Buscar por descripción o notas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                }}
                />
            </div>

            <div>
                {termEntered && (
                    <small style={{ color: '#666' }}>
                    Mostrando {filteredAppointments.length} de {appointments.length} citas
                    </small>
                )}
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                {termEntered && filteredAppointments.length === 0 ? (
                    <li style={{ padding: '10px 0', color: '#888' }}>
                        No se encontraron citas que coincidan con "{searchTerm}".
                    </li>
                ) : (
                    filteredAppointments.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => onSelectAppointment && onSelectAppointment(item)}
                        style={{
                        padding: '10px',
                        marginBottom: '8px',
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: onSelectAppointment ? 'pointer' : 'default',
                        }}
                    >
                        <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{item.description}</div>
                        
                        {item.notes && (
                        <div style={{ fontSize: '0.85em', color: '#555', marginTop: '4px' }}>
                            {item.notes}
                        </div>
                        )}

                        <div style={{ fontSize: '0.8em', color: '#888', marginTop: '4px' }}>
                            {new Date(item.starts_at).toLocaleString()}
                        </div>
                    </li>
                    ))
                )}
                </ul>
            </div>
        </div>
    );

};