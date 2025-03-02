import React, {useState, useEffect, use} from 'react'
import "../App.css";

const apiURL = 'https://randomuser.me/api/?results=25'

export const GetUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiURL, {
                method: 'GET',
                
            });

            if (!response.ok){
                throw new Error('Error en la obtencion de Datos: ' + response.statusText);
            }
            const data = await response.json();
            setUsers(data.results);
        } catch (error){
            setError(error.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading){
        return<div>Cargando...</div>;

    }

    if (error){
        return <div>Error:{error}</div>; 
    }

  return (
    <div className='container'>
        <h1 className='titulo'>Usuarios</h1>

        <div className='informacion'>
            {users.length > 0 ? (
                users.map((user) => (
                    
                    <div key={user.login.uuid} className='tarjeta' onClick={() => setSelectedUser(user)}>
                        <img className='imagenUsuario' src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                        <h2 className='nombre'> {`${user.name.title} ${user.name.first} ${user.name.last}`} </h2>
                        <p className='email'>{user.email}</p>
                        <p className='nacionalidad'>{`[ ${user.nat} ]   ${user.location.country}`}</p>
                    </div>
                ))
            ) : (
                <p className='errorUsuario'>No se encontraron Usuarios</p>
            )}

        </div>

            {selectedUser && (
                <div className='capaPrincipal' onClick={() => setSelectedUser(null)}>
                    <div className='contenido' onClick={(e) => e.stopPropagation()}>
                        <button className='botonCerrar' onClick={() => setSelectedUser(null)}>✕</button>
                        <img src={selectedUser.picture.large} alt={`${selectedUser.name.first} ${selectedUser.name.last}`} className='modImagen'/>
                        <h2>{`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}</h2>
                        <p><strong>Genero: </strong>{selectedUser.gender}</p>
                        <p><strong>Edad: </strong>{selectedUser.dob.age}</p>
                        <p><strong>Email: </strong>{selectedUser.email}</p>
                        <p><strong>Telefono: </strong>{selectedUser.phone}</p>
                        <p><strong>Celular: </strong>{selectedUser.cell}</p>
                        <p><strong>Direccion: </strong>{`${selectedUser.location?.street?.number || ''}, ${selectedUser.location?.street?.name || ''}, ${selectedUser.location?.city || ''}, ${selectedUser.location?.state || ''}, ${selectedUser.location?.country || ''}`}</p>
                        <p><strong>Coordenadas: </strong>{selectedUser.location?.coordinates ? `${selectedUser.location.coordinates.latitude}, ${selectedUser.location.coordinates.longitude}` : 'No disponible'}</p>
                        <p><strong>Codigo Postal: </strong>{selectedUser.location?.postcode || 'No Disponible'}</p>
                        <p><strong>Zona Horaria: </strong>{selectedUser.timezone ? `${selectedUser.timezone.offset}, ${selectedUser.timezone.description}` : 'No Disponible'}</p>
                        
                    </div>
                </div>
            )}
            


    </div>
  )
}

export default GetUsers;