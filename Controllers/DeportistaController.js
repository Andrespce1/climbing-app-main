import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';

const DeportistaController = () => {
  const [deportista, setDeportista] = useState({});
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaClubes, setListaClubes] = useState([]);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaModalidades, setListaModalidades] = useState([]);
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);

  useEffect(() => {
    axios.get('/api/deportistas')
      .then(response => {
        setDeportista(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const validarRol = (rol) => {
    return rol.includes('Administrador') || rol.includes('Juez');
  };

  const handleIndex = () => {
    const data = APIConsumer.Deportistum.Select(apiUrl);
    setListaCategorias(data.Categorias);
    setListaClubes(data.Clubes);
    setListaEntrenadores(data.Entrenadores);
    setListaGeneros(data.Generos);
    setListaModalidades(data.Modalidades);
    setListaProvincias(data.Provincias);
    setListaUsuarios(data Usuarios);
    setListaEstados(data.Estados);
  };

  const handleDetails = (id) => {
    const data = APIConsumer.Deportistum.SelectOne(apiUrl + id);
    setDeportista(data);
  };

  const handleCreate = (deportista) => {
    try {
      APIConsumer.Deportistum.Insert(apiUrl, deportista);
      setDeportista(deportista);
      notification.success('Deportista creado con éxito', 'Deportista creado');
    } catch (error) {
      notification.error('Error al crear deportista', error.Message);
    }
  };

  const handleEdit = (id, deportista) => {
    try {
      APIConsumer.Deportistum.Update(apiUrl + id, deportista);
      setDeportista(deportista);
      notification.success('Deportista editado con éxito', 'Deportista editado');
    } catch (error) {
      notification.error('Error al editar deportista', error.Message);
    }
  };

  const handleDelete = (id) => {
    try {
      APIConsumer.Deportistum.Delete(apiUrl + id);
      setDeportista({});
      notification.success('Deportista eliminado con éxito', 'Deportista eliminado');
    } catch (error) {
      notification.error('Error al eliminar deportista', error.Message);
    }
  };

  const listaModalidades = () => {
    const data = APIConsumer.Modalidad.Select(apiUrl.Replace("Deportista", "Modalidad"));
    const lista = data.Select(f => new Modalidad
      {
        IdMod = f.IdMod,
        DescripcionMod = f.DescripcionMod
      });
    return lista;
  };

  const listaCategorias = () => {
    const data = APIConsumer.Categorium.Select(apiUrl.Replace("Deportista", "Categoria"));
    const lista = data.Select(f => new Categorium
      {
        IdCat = f.IdCat,
        NombreCat = f.NombreCat
      });
    return lista;
  };

  const listaClubes = () => {
    const data = APIConsumer.Club.Select(apiUrl.Replace("Deportista", "Club"));
    const lista = data.Select(f => new Club
      {
        IdClub = f.IdClub,
        NombreClub = f.NombreClub
      });
    return lista;
  };

  const listaGeneros = () => {
    const data = APIConsumer.Genero.Select(apiUrl.Replace("Deportista", "Genero"));
    const lista = data.Select(f => new Genero
      {
        IdGen = f.IdGen,
        NombreGen = f.NombreGen
      });
    return lista;
  };

  const listaEntrenadores = () => {
    const data = APIConsumer.Entrenador.Select(apiUrl.Replace("Deportista", "Entrenador"));
    const lista = data.Select(f => new Entrenador
      {
        IdEnt = f.IdEnt,
        NombresEnt = f.NombresEnt,
        ApellidosEnt = f.ApellidosEnt
      });
    return lista;
  };

  const listaUsuarios = () => {
    const data = APIConsumer.Usuario.Select(apiUrl.Replace("Deportista", "Usuario"));
    const lista = data.Select(f => new Usuario
      {
        IdUsu = f.IdUsu,
        NombreUsu = f.NombreUsu
      });
    return lista;
  };

  const listaEstados = () => {
    const lista = [
      { Text: 'Activo', Value: 'true' },
      { Text: 'Inactivo', Value: 'false' }
    ];
    return lista;
  };

  const listaClasificaciones = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Deportista", "DetalleCompetencia"))
      .Where(f => f.IdCom == id);
    const lista = data.Select(f => new DetalleCompetencium
      {
        IdCom = f.IdCom,
        IdDep = f.IdDep,
        ClasRes = f.ClasRes,
        CuartosRes = f.CuartosRes,
        FinalRes = f.FinalRes,
        IdDetalle = f.IdDetalle,
        OctavosRes = f.OctavosRes,
        Puesto = f.Puesto,
        SemiRes = f.SemiRes
      });
    return lista;
  };

  public bool VerificaIdentificacion(string identificacion)
{
    bool estado = false;
    char[] valced = new char[13];
    int provincia;
    if (identificacion.Length >= 10)
    {
        valced = identificacion.Trim().ToCharArray();
        provincia = int.Parse((valced[0].ToString() + valced[1].ToString()));
        if (provincia > 0 && provincia < 31) // Permitir cedulas emitidas en Consulados
        {
            if (int.Parse(valced[2].ToString()) < 6)
                estado = VerificaCedula(valced);
            else if (int.Parse(valced[2].ToString()) == 6)
            {
                if (valced.Length == 13)
                {
                    // Se agrega la validación de excluir de la validación de RUC, las identificaciones cuyo tercer dígito sea 6 o 9.
                    estado = true;
                }
                else
                    // Permitir cedulas emitidas en Consulados
                    estado = VerificaCedula(valced);
            }
            else if (int.Parse(valced[2].ToString()) == 8)
            {
                if (valced.Length == 13)
                    estado = VerificaSectorPublico(valced);
                else
                    estado = false;
            }
            else if (int.Parse(valced[2].ToString()) == 9)
            {
                // Se agrega la validación de excluir de la validación de RUC, las identificaciones cuyo tercer dígito sea 6 o 9.
                estado = true;
            }
        }
    }
    return estado;
}

private bool VerificaCedula(char[] validarCedula)
{
    int aux = 0, par = 0, impar = 0, verifi;
    for (int i = 0; i < 9; i += 2)
    {
        aux = 2 * int.Parse(validarCedula[i].ToString());
        if (aux > 9)
            aux -= 9;
        par += aux;
    }
    for (int i = 1; i < 9; i += 2)
    {
        impar += int.Parse(validarCedula[i].ToString());
    }

    aux = par + impar;
    if (aux % 10 != 0)
    {
        verifi = 10 - (aux % 10);
    }
    else
        verifi = 0;
    if (verifi == int.Parse(validarCedula[9].ToString()))
        return true;
    else
        return false;
}

private bool VerificaSectorPublico(char[] validarCedula)
{
    int aux = 0, prod, veri;
    veri = int.Parse(validarCedula[9].ToString()) + int.Parse(validarCedula[10].ToString()) + int.Parse(validarCedula[11].ToString()) + int.Parse(validarCedula[12].ToString());
    if (veri > 0)
    {
        int[] coeficiente = new int[8] { 3, 2, 7, 6, 5, 4, 3, 2 };

        for (int i = 0; i < 8; i++)
        {
            prod = int.Parse(validarCedula[i].ToString()) * coeficiente[i];
            aux += prod;
        }

        if (aux % 11 == 0)
        {
            veri = 0;
        }
        else if (aux % 11 == 1)
        {
            return false;
        }
        else
        {
            aux = aux % 11;
            veri = 11 - aux;
        }

        if (veri == int.Parse(validarCedula[8].ToString()))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}