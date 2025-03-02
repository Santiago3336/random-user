import React, {useState, useEffect} from 'react'

const apiURL = 'https://randomuser.me/api/?results=25'

export const GetUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    <div>
        <h1>Usuarios</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Foto</th>
                    <th>Nacionalidad</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.login.uuid}>
                            <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                            <td>{user.email}</td>
                            <td><img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`}/></td>
                            <td>{`${user.nat} ${user.location.country}`}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No se han encontraron usuarion</td>
                    </tr>
                ) }
            </tbody>
        </table>
    </div>
  )
}

export default GetUsers;