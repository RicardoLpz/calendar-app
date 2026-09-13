const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:65432';

export const getAppointments = async() => {
    const response = await fetch(`${API_URL}/appointments`);
    if(!response.ok){
        throw new Error('Problemas al obtener citas');
    }
    return await response.json();
}