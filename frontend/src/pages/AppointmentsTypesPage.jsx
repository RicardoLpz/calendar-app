import { useEffect, useState } from "react";
import { getAppointmentTypes, createAppointmentType,
        updateAppointmentType, deleteAppointmentType
 } from "../services/api";

export const AppointmentsTypesPage = () => {
    const [types, setTypes] = useState([]);
    const [name, setName] = useState('');
    const [editingID, seteditingID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //load existing data
    const loadTypes = async () => {
        try{
            const data = await getAppointmentTypes();
            setTypes(data);
            setError(null);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadTypes();
    }, []);

    //create or edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim()) return;

        try{
            if(editingID){
                await updateAppointmentType(editingID, name);
            }else{
                await createAppointmentType(name);
            }
            setName('');
            seteditingID(null);
            await loadTypes();
        }catch(err){
            alert(err.message);
        }
    };

    //load data for editing
    const handleEdit = (type) => {
        seteditingID(type.id);
        setName(type.name);
    }

    //cancel edition
    const handleCancelEdit = () => {
        seteditingID(null);
        setName('');
    };

    //delete
    const handleDelete = async (id) =>{
        if(!window.confirm('¿Seguro que quieres eliminar?')) return;

        try{
            await deleteAppointmentType(id);
            await loadTypes();
        }catch(err){
            alert(err.message);
        }
    };

    if (loading) return <p>Cargando datos...</p>;

    return(
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Gestión de Tipos de Cita</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form
                onSubmit={handleSubmit}
                style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                background: '#f9f9f9',
                padding: '15px',
                borderRadius: '8px',
                }}
            >
                <input
                type="text"
                placeholder="Nombre del tipo de cita"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ flex: 1, padding: '8px', fontSize: '14px' }}
                required
                />
                <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                {editingID ? 'Guardar Cambios' : 'Crear'}
                </button>
                {editingID && (
                <button type="button" onClick={handleCancelEdit} style={{ padding: '8px 16px' }}>
                    Cancelar
                </button>
                )}
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {types.length === 0 ? (
                <p>No hay tipos existentes</p>
                ) : (
                types.map((type) => (
                    <li
                        key={type.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            marginBottom: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                        }}
                    >
                    <span><strong>ID {type.id}:</strong> {type.name}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(type)}>Editar</button>
                        <button onClick={() => handleDelete(type.id)} style={{ color: 'red' }}>
                            Eliminar
                        </button>
                    </div>
                    </li>
                ))
                )}
            </ul>
        </div>
    )
}