import React, { useState, useEffect } from "react";
import SearchFilters from './SearchFilters';
import UserList from './UserList';
import UserModal from './UserModal';
import "../App.css";

const apiURL = "http://localhost:5000/api/users";

export const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByName, setFilterByName] = useState(false);
  const [filterByCountry, setFilterByCountry] = useState(false);

  const fetchUsers = async () => {
    try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) throw new Error("Error en la obtención de datos: " + response.statusText);

        const data = await response.json();
        console.log("Datos recibidos del backend:", data);
        setUsers(data.results || data);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("Usuarios obtenidos:", users);
      }, [users]);
      

    if (loading) {
        return(
        <div className="containerCargando">
            <div className="carga"></div>
            <p className="textoCarga">Cargando...</p>
        </div>
        ) 
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredUsers = (users || []).filter((user) => {
        const fullName = `${user?.name?.first ?? ''} ${user?.name?.last ?? ''}`.toLowerCase();
        const country = user?.location?.country?.toLowerCase() ?? '';
        const searchLower = searchTerm.toLowerCase();
    
        if (!searchTerm) return true;
        if (filterByName && fullName.includes(searchLower)) return true;
        if (filterByCountry && country.includes(searchLower)) return true;
    
        return !filterByName && !filterByCountry && (fullName.includes(searchLower) || country.includes(searchLower));
    });
    

    return (
        <div className="container">
        <h1 className="titulo">Usuarios</h1>

        {/* componente de filtros */}
        <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterByName={filterByName}
            setFilterByName={setFilterByName}
            filterByCountry={filterByCountry}
            setFilterByCountry={setFilterByCountry}
        />

        {/* lista de usuarios */}
        <UserList users={filteredUsers} setSelectedUser={setSelectedUser} />

        {/* modal detalles */}
        {selectedUser && <UserModal user={selectedUser} setSelectedUser={setSelectedUser} />}
        </div>
    );
    };

    export default GetUsers;
