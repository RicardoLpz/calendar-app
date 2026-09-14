import { useEffect, useState } from "react";
import { getAppointments, createAppointment,
        updateAppointment, deleteAppointment, getAppointmentTypes
 } from "../services/api";

const initialFormState = {
    description: '',
    notes: '',
    appointment_type_id: '',
    starts_at: '',
    ends_at: '',
}

export const AppointmentsPage = () => {

    const [appointments, setAppointments] = useState([]);
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [editingID, seteditingID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //load existing data
    const loadData = async () => {
        try{
            const typesData = await getAppointmentTypes();
            const appsData = await getAppointments();
            setTypes(typesData);
            setAppointments(appsData);
            setError(null);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadData();
    }, []);

    //handle form fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({ ...prev, [name]: value }));
    };

    //submiting data from form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const startDate = new Date(formData.starts_at);
        const endDate = new Date(formData.ends_at);

        if (endDate <= startDate) {
            alert('La fecha y hora final deben ser posterior a la incial');
            return;
        }

        //format data fields
        const payload = {
            ...formData,
            appointment_type_id: parseInt(formData.appointment_type_id, 10),
            starts_at: new Date(formData.starts_at).toISOString(),
            ends_at: new Date(formData.ends_at).toISOString(),
        };

        try{
            if(editingID){
                await updateAppointment(editingID, payload);
            }else{
                await createAppointment(payload);
            }
            setFormData(initialFormState);
            seteditingID(null);
            await loadData();
        }catch(err){
            alert(err.message)
        }
    }

    //editing data
    const handleEdit = (item) =>{
        seteditingID(item.id);
        setFormData({
            description: item.description || '',
            notes: item.notes || '',
            appointment_type_id: item.appointment_type_id || '',
            starts_at: item.starts_at ? new Date(item.starts_at).toISOString().slice(0, 16) : '',
            ends_at: item.ends_at ? new Date(item.ends_at).toISOString().slice(0, 16) : '',
        });
    };

    //deleting data
    const handleDelete = async(id) => {
        if(!window.confirm('¿Seguro de eliminar cita?')) return;
        try{
            await deleteAppointment(id);
            await loadData();
        }catch(err){
            alert(err.message);
        }
    };

    //cancel edition
    const handleCancelEdit = () =>{
        seteditingID(null);
        setFormData(initialFormState);
    };

    if (loading) return <p>Cargando datos...</p>;

    return(
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2>{editingID ? 'Editar Cita' : 'Agendar Nueva Cita'}</h2>

            <form
                onSubmit={handleSubmit}
                style={{
                display: 'grid',
                gap: '12px',
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
                }}
            >
                <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Titulo:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    required
                />
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Tipo de Cita:</label>
                <select
                    name="appointment_type_id"
                    value={formData.appointment_type_id}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    required
                >
                    <option value="">-- Selecciona un tipo --</option>
                    {types.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                    ))}
                </select>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Fecha Inicio:</label>
                    <input
                    type="datetime-local"
                    name="starts_at"
                    value={formData.starts_at}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    required
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Fecha Fin:</label>
                    <input
                    type="datetime-local"
                    name="ends_at"
                    value={formData.ends_at}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                    min={formData.starts_at}
                    required
                    />
                </div>
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Notas adicionales:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    style={{ width: '100%', padding: '8px' }}
                />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    {editingID ? 'Guardar Cambios' : 'Agendar Cita'}
                </button>
                {editingID && (
                    <button type="button" onClick={handleCancelEdit} style={{ padding: '10px 20px' }}>
                        Cancelar Edición
                    </button>
                )}
                </div>
            </form>

            <h3>Listado de citas</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {appointments.length === 0 ? (
                <p>No hay citas programadas.</p>
                ) : (
                    appointments.map((item) => (
                        <li
                        key={item.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            padding: '15px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        >
                        <div>
                            <strong style={{ fontSize: '1.1em' }}>{item.description}</strong>
                            <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9em' }}>
                            Inicio: {new Date(item.starts_at).toLocaleString()} | Fin:{' '}
                            {new Date(item.ends_at).toLocaleString()}
                            </p>
                            {item.notes && <p style={{ margin: '4px 0', italic: 'true' }}>"{item.notes}"</p>}
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit(item)}>Editar</button>
                            <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>
                                Eliminar
                            </button>
                        </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};