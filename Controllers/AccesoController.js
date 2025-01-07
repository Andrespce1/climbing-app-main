import axios from 'axios';
import { notification } from 'react-notifyify';
import { useState, useEffect } from 'react';

const climbingAppContext = require('./climbing-app-context');

const AccesoController = () => {
  const [usuario, setUsuario] = useState({});
  const [rol, setRol] = useState('');

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
    return climbingAppContext.Usuarios.find(usuario => usuario.NombreUsu === nombre && usuario.ClaveUsu === clave);
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

  return (
    <div>
      <h1>Acceso</h1>
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
    </div>
  );
};

export default AccesoController;