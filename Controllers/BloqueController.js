import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';

const BloqueController = () => {
  const [usuario, setUsuario] = useState({});
  const [rol, setRol] = useState('');
  const [listaPuntajeBloque, setListaPuntajeBloque] = useState([]);
  const [listaDeportistaCompetencia, setListaDeportistaCompetencia] = useState([]);
  const [listaPosicionesClasificatoria, setListaPosicionesClasificatoria] = useState([]);

  useEffect(() => {
    axios.get('/api/usuarios')
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const salir = () => {
    notification.success('Sesión cerrada', 'Sesión cerrada');
    axios.post('/api/salir')
      .then(response => {
        window.location.href = '/api/acceso';
      })
      .catch(error => {
        console.error(error);
      });
  };

  const validarUsuario = (nombre, clave) => {
    return APIConsumer.Usuarios.find(usuario => usuario.NombreUsu === nombre && usuario.ClaveUsu === clave);
  };

  const handleIndex = (event) => {
    const usuario = validarUsuario(event.target.nombreUsu.value, event.target.claveUsu.value);

    if (usuario) {
      const claims = [
        {
          type: 'name',
          value: usuario.NombreUsu
        }
      ];

      const roles = usuario.RolesUsu.split(',');

      roles.forEach(rol => {
        claims.push({
          type: 'role',
          value: rol
        });
      });

      const claimsIdentity = new ClaimsIdentity(claims);
      axios.post('/api/sesion', claimsIdentity)
        .then(response => {
          notification.info('Rol', rol);
          window.location.href = '/api/home';
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      notification.error('Ingrese un usuario y contraseña validos', 'Error');
    }
  };

  const listadoDeportista = () => {
    const deportista = APIConsumer.Usuarios.find(usuario => usuario.IdDep === 1);
    return deportista;
  };

  const listadoPuntajeBloque = (id, etapa) => {
    const puntajeBloque = APIConsumer.PuntajeBloques.find(puntaje => puntaje.IdCom === id && puntaje.IdDep === 1 && puntaje.Etapa === etapa);
    return puntajeBloque;
  };

  const agregarResultados = (evento) => {
    const resultadoBloque = evento.target.resultados.value;
    const resultadoFinal = APIConsumer.ResultadoBloques.find(res => res.IdResBloque === resultadoBloque);
    if (resultadoFinal) {
      resultadoFinal.Etapa = 'Final';
      APIConsumer.ResultadoBloques.Update(apiUrl + resultadoFinal.IdResBloque.ToString(), resultadoFinal);
      resultadoFinal = new ResultadoBloque();
      APIConsumer.ResultadoBloques.Insert(apiUrl + resultadoFinal.IdResBloque.ToString(), resultadoFinal);
    }
  };

  return (
    <div>
      <h1>Bloque</h1>
      <form onSubmit={handleIndex}>
        <label>
          Nombre:
          <input type="text" name="nombreUsu" />
        </label>
        <label>
          Clave:
          <input type="password" name="claveUsu" />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={salir}>Salir</button>
      <h1>Lista de Puntaje Bloque</h1>
      <ul>
        {listaPuntajeBloque.map(puntajeBloque => (
          <li key={puntajeBloque.IdBloPts}>{puntajeBloque.NumeroBloque}</li>
        ))}
      </ul>
      <h1>Lista de Deportista Competencia</h1>
      <ul>
        {listaDeportistaCompetencia.map(deportista => (
          <li key={deportista.IdDep}>{deportista.NombresDep} {deportista.ApellidosDep}</li>
        ))}
      </ul>
      <h1>Lista de Posiciones Clasificatoria</h1>
      <ul>
        {listaPosicionesClasificatoria.map(posicion => (
          <li key={posicion.IdPosicion}>{posicion.Puesto}</li>
        ))}
      </ul>
      <h1>Resultado Bloque</h1>
      <select name="resultados">
        {APIConsumer.ResultadoBloques.map(resultadoBloque => (
          <option value={resultadoBloque.IdResBloque}>{resultadoBloque.IdResBloque}</option>
        ))}
      </select>
      <button onClick={agregarResultados}>Agregar Resultados</button>
    </div>
  );
};

export default BloqueController;