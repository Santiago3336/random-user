import React from "react";

export const UserModal = ({ user, setSelectedUser }) => {
  return (
      <div className="capaPrincipal" onClick={() => setSelectedUser(null)}>
          <div className="contenido" onClick={(e) => e.stopPropagation()}>
              <button className="botonCerrar" onClick={() => setSelectedUser(null)}>✕</button>
              <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="modImagen" />
              <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
              <p><strong>Genero: </strong>{user.gender}</p>
              <p><strong>Edad: </strong>{user.dob.age}</p>
              <p><strong>Email: </strong>{user.email}</p>
              <p><strong>Telefono: </strong>{user.phone}</p>
              <p><strong>Celular: </strong>{user.cell}</p>
              <p><strong>Direccion: </strong>{`${user.location?.street?.number || ""}, ${user.location?.street?.name || ""}, ${user.location?.city || ""}, ${user.location?.state || ""}, ${user.location?.country || ""}`}</p>
          </div>
      </div>
  )
}

export default UserModal;
