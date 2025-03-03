import React from "react";
import "../App.css";

export const SearchFilters = ({ searchTerm, setSearchTerm, filterByName, setFilterByName, filterByCountry, setFilterByCountry }) => {
  return (
    <div className="buscador">
      <input type="text" placeholder="Busca aquí..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="buscar" />

      <div className="filtros">
        <label>
          <input type="checkbox" checked={filterByName} onChange={() => setFilterByName(!filterByName)} />
          Filtrar Por Nombre
        </label>
        <label>
          <input type="checkbox" checked={filterByCountry} onChange={() => setFilterByCountry(!filterByCountry)} />
          Filtrar Por País
        </label>
      </div>
    </div>
  )
}

export default SearchFilters;