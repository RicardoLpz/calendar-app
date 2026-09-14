const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:65432';

//APPOINTMENTS

//GET
export const getAppointments = async() => {
    const response = await fetch(`${API_URL}/appointments`);
    if(!response.ok) throw new Error('Problemas al obtener citas');
    return await response.json();
}

//PSOT
export const createAppointment = async(formData) =>{
    const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appointment: formData }),
    })
    if (!response.ok) throw new Error('Error al crear la cita');
    return await response.json();
};

//patch
export const updateAppointment = async(id, formData) =>{
    const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appointment: formData }),
    })
    if (!response.ok) throw new Error('Error al actualizar la cita');
    return await response.json();
};

//delete
export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar cita');
};

////APPOINTMENT TYPES////

//GET
export const getAppointmentTypes = async () => {
  const response = await fetch(`${API_URL}/appointment_types`);
  if (!response.ok) throw new Error('Error al cargar tipos de cita');
  return await response.json();
};

//POST
export const createAppointmentType = async(name) =>{
    const response = await fetch(`${API_URL}/appointment_types`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appointment_type: {name} }),
    })
    if (!response.ok) throw new Error('Error al crear el tipo de cita');
    return await response.json();
};

//patch
export const updateAppointmentType = async(id, name) =>{
    const response = await fetch(`${API_URL}/appointment_types/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ appointment_type: {name} }),
    })
    if (!response.ok) throw new Error('Error al actualizar el tipo de cita');
    return await response.json();
};

//delete
export const deleteAppointmentType = async (id) => {
  const response = await fetch(`${API_URL}/appointment_types/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar tipos de cita');
};