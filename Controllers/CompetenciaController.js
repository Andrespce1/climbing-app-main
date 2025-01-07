import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';

const CompetenciaController = () => {
  const [competencia, setCompetencia] = useState({});
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaModalidades, setListaModalidades] = useState([]);
  const [listaSedes, setListaSedes] = useState([]);
  const [listaJueces, setListaJueces] = useState([]);
  const [listaPosiciones, setListaPosiciones] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);

  useEffect(() => {
    axios.get('/api/competencias')
      .then(response => {
        setCompetencia(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const validarRol = (rol) => {
    return rol.includes('Administrador') || rol.includes('Juez');
  };

  const handleIndex = () => {
    const data = APIConsumer.Competencium.Select(apiUrl);
    setListaCategorias(data.Categorias);
    setListaGeneros(data.Generos);
    setListaModalidades(data.Modalidades);
    setListaSedes(data.Sedes);
    setListaJueces(data.Jueces);
    setListaPosiciones(data.Posiciones);
    setListaEstados(data.Estados);
  };

  const handleDetails = (id) => {
    const data = APIConsumer.Competencium.SelectOne(apiUrl + id);
    setCompetencia(data);
  };

  const handleCreate = (competencia) => {
    try {
      APIConsumer.Competencium.Insert(apiUrl, competencia);
      setCompetencia(competencia);
      notification.success('Competencia creada con éxito', 'Competencia creada');
    } catch (error) {
      notification.error('Error al crear competencia', error.Message);
    }
  };

  const handleEdit = (id, competencia) => {
    try {
      APIConsumer.Competencium.Update(apiUrl + id, competencia);
      setCompetencia(competencia);
      notification.success('Competencia editada con éxito', 'Competencia editada');
    } catch (error) {
      notification.error('Error al editar competencia', error.Message);
    }
  };

  const handleDelete = (id) => {
    try {
      APIConsumer.Competencium.Delete(apiUrl + id);
      setCompetencia(competencia);
      notification.success('Competencia eliminada con éxito', 'Competencia eliminada');
    } catch (error) {
      notification.error('Error al eliminar competencia', error.Message);
    }
  };

  const listaModalidades = () => {
    const data = APIConsumer.Modalidad.Select(apiUrl.Replace("Competencia", "Modalidad"));
    const lista = data.Select(f => new Modalidad
      {
        IdMod = f.IdMod,
        DescripcionMod = f.DescripcionMod
      });
    return lista;
  };

  const listaCategorias = () => {
    const data = APIConsumer.Categorium.Select(apiUrl.Replace("Competencia", "Categoria"));
    const lista = data.Select(f => new Categorium
      {
        IdCat = f.IdCat,
        NombreCat = f.NombreCat
      });
    return lista;
  };

  const listaGeneros = () => {
    const data = APIConsumer.Genero.Select(apiUrl.Replace("Competencia", "Genero"));
    const lista = data.Select(f => new Genero
      {
        IdGen = f.IdGen,
        NombreGen = f.NombreGen
      });
    return lista;
  };

  const listaSedes = () => {
    const data = APIConsumer.Sede.Select(apiUrl.Replace("Competencia", "Sede"));
    const lista = data.Select(f => new Sede
      {
        IdSede = f.IdSede,
        NombreSede = f.NombreSede
      });
    return lista;
  };

  const listaJueces = () => {
    const data = APIConsumer.Juez.Select(apiUrl.Replace("Competencia", "Juez"));
    const lista = data.Select(f => new Juez
      {
        IdJuez = f.IdJuez,
        NombresJuez = f.NombresJuez,
        ApellidosJuez = f.ApellidosJuez
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
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaPosiciones = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesOctavos = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
      .Where(f => f.IdCom == id && f.ClasRes != 'fs' && f.ClasRes != 'fall');
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

  const listaClasificacionesSemi = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartos = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesOctavosCuartos = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
      .Where(f => f.IdCom == id && f.ClasRes != 'fs' && f.ClasRes != 'fall');
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

  const listaClasificacionesOctavosCuartosSemi = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
      .Where(f => f.IdCom == id && f.ClasRes != 'fs' && f.ClasRes != 'fall');
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

  const listaClasificacionesOctavosCuartosSemiFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
      .Where(f => f.IdCom == id && f.ClasRes != 'fs' && f.ClasRes != 'fall');
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

  const listaClasificacionesOctavosCuartosSemiFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
      .Where(f => f.IdCom == id && f.ClasRes != 'fs' && f.ClasRes != 'fall');
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

  const listaClasificacionesCuartosSemi = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinalFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinalFinalFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinalFinalFinalFinal = (id) => {
    const data = APIConsumer.DetalleCompetencium.Select(apiUrl.Replace("Competencia", "DetalleCompetencia"))
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

  const listaClasificacionesCuartosSemiFinalFinalFinalFinal = (id) => {
    const data = APIConsumer.Detalle