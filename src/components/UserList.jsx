import React from "react";

export const UserList = ({ users, setSelectedUser }) => {
  return (
    <div className="informacion">
            {users.length > 0 ? (
                users.map((user) => (
                <div key={user.login.uuid} className="tarjeta" onClick={() => setSelectedUser(user)}>
                    <img className="imagenUsuario" src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                    <h2 className="nombre"> {`${user.name.title} ${user.name.first} ${user.name.last}`} </h2>
                    <p className="email">{user.email}</p>
                    <p className="nacionalidad">{`[ ${user.nat} ]   ${user.location.country}`}</p>
                </div>
                ))
            ) : (
                <p className="errorUsuario">No se encontraron Usuarios</p>
            )}
    </div>
  )
}

export default UserList;
