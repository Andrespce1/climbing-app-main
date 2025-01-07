import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';

const ClubController = () => {
  const [club, setClub] = useState({});
  const [listaClubes, setListaClubes] = useState([]);
  const [listaDeclubes, setListaDeClubes] = useState([]);
  const [listaPosiciones, setListaPosiciones] = useState([]);

  useEffect(() => {
    axios.get('/api/club')
      .then(response => {
        setListaClubes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const validarRol = (rol) => {
    return rol.includes('Administrador') || rol.includes('Entrenador');
  };

  const handleIndex = () => {
    const data = APIConsumer.Club.Select(apiUrl);
    setListaClubes(data);
  };

  const handleDetails = (id) => {
    const data = APIConsumer.Club.SelectOne(apiUrl + id);
    setListaDeClubes(data);
  };

  const handleCreate = (club) => {
    try {
      APIConsumer.Club.Insert(apiUrl, club);
      setListaClubes([...listaClubes, club]);
      notification.success('Clube creado con éxito', 'Clube creado');
    } catch (ex) {
      notification.error('Error al crear clube', ex.Message);
    }
  };

  const handleEdit = (id, club) => {
    try {
      APIConsumer.Club.Update(apiUrl + id, club);
      setListaDeClubes([...listaDeClubes, club]);
      notification.success('Clube editado con éxito', 'Clube editado');
    } catch (ex) {
      notification.error('Error al editar clube', ex.Message);
    }
  };

  const handleDelete = (id) => {
    APIConsumer.Club.Delete(apiUrl + id);
    notification.success('Club eliminado con éxito', 'Clube eliminado');
  };

  return (
    <div>
      <h1>Club</h1>
      <form onSubmit={handleIndex}>
        <label>
          Nombre:
          <input type="text" name="nombre" />
        </label>
        <label>
          Clave:
          <input type="password" name="clave" />
        </label>
        <button type="submit">Crear clube</button>
      </form>
      <h1>Lista de clubes</h1>
      <ul>
        {listaClubes.map(clube => (
          <li key={club.id}>{club.nombre}</li>
        ))}
      </ul>
      <h1>Detalle de clube</h1>
      <ul>
        {listaDeClubes.map(clube => (
          <li key={club.id}>{club.nombre}</li>
        ))}
      </ul>
      <h1>Crea clube</h1>
      <form onSubmit={handleCreate}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={club.nombre} />
        </label>
        <label>
          Clave:
          <input type="password" name="clave" value={club.clave} />
        </label>
        <button type="submit">Crear clube</button>
      </form>
      <h1>Editar clube</h1>
      <form onSubmit={handleEdit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={club.nombre} />
        </label>
        <label>
          Clave:
          <input type="password" name="clave" value={club.clave} />
        </label>
        <button type="submit">Editar clube</button>
      </form>
      <h1>Eliminar clube</h1>
      <button onClick={handleDelete}>Eliminar clube</button>
    </div>
  );
};

export default ClubController;