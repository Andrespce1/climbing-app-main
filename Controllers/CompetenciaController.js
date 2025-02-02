import axios from 'axios';

import api from '../services/api'; // Asegúrate de importar tu instancia de API

const CompetenciaController = {
  // Obtener todas las competencias, con opción de búsqueda
  async getCompetencias(searchFor = '') {
    try {
      const url = searchFor ? `${apiUrl}?searchFor=${searchFor}` : apiUrl;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching competencias:', error);
      throw error;
    }
  },

  // Obtener una competencia por su ID
  async getCompetenciaById(id) {
    try {
      const response = await axios.get(`${apiUrl}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching competencia by id:', error);
      throw error;
    }
  },

  // Crear una nueva competencia
  async createCompetencia(competencia) {
    try {
      const response = await axios.post(apiUrl, competencia);
      return response.data;
    } catch (error) {
      console.error('Error creating competencia:', error);
      throw error;
    }
  },

  // Actualizar una competencia existente
  async updateCompetencia(id, competencia) {
    try {
      const response = await axios.put(`${apiUrl}${id}`, competencia);
      return response.data;
    } catch (error) {
      console.error('Error updating competencia:', error);
      throw error;
    }
  },

  // Eliminar una competencia (marcar como inactiva)
  async deleteCompetencia(id) {
    try {
      const competencia = await this.getCompetenciaById(id);
      competencia.activo = false; // Marcar como inactivo
      const response = await axios.put(`${apiUrl}${id}`, competencia);
      return response.data;
    } catch (error) {
      console.error('Error deleting competencia:', error);
      throw error;
    }
  },

  // Obtener listados de categorías, géneros, modalidades, jueces y sedes
  async getListadoCategorias() {
    try {
      const response = await axios.get(apiUrl.replace('Competencia', 'Categoria'));
      return response.data.map(cat => ({ value: cat.id, text: cat.nombre }));
    } catch (error) {
      console.error('Error fetching categorias:', error);
      throw error;
    }
  },

  async getListadoGeneros() {
    try {
      const response = await axios.get(apiUrl.replace('Competencia', 'Genero'));
      return response.data.map(gen => ({ value: gen.id, text: gen.nombre }));
    } catch (error) {
      console.error('Error fetching generos:', error);
      throw error;
    }
  },

  async getListadoModalidades() {
    try {
      const response = await axios.get(apiUrl.replace('Competencia', 'Modalidad'));
      return response.data.map(mod => ({ value: mod.id, text: mod.descripcion }));
    } catch (error) {
      console.error('Error fetching modalidades:', error);
      throw error;
    }
  },

  async getListadoJueces() {
    try {
      const response = await axios.get(apiUrl.replace('Competencia', 'Juez'));
      return response.data.map(juez => ({
        value: juez.id,
        text: `${juez.nombres} ${juez.apellidos}`,
      }));
    } catch (error) {
      console.error('Error fetching jueces:', error);
      throw error;
    }
  },

  async getListadoSedes() {
    try {
      const response = await axios.get(apiUrl.replace('Competencia', 'Sede'));
      return response.data.map(sede => ({ value: sede.id, text: sede.nombre }));
    } catch (error) {
      console.error('Error fetching sedes:', error);
      throw error;
    }
  },

  // Agregar un resultado a una competencia
  async agregarResultado(id, result, fase) {
    try {
      const detalle = await axios.get(`${apiUrl.replace('Competencia', 'DetalleCompetencia')}${id}`);
      let updatedDetalle = detalle.data;

      if (fase === 'octavos') {
        updatedDetalle.octavosRes = result;
      } else if (fase === 'cuartos') {
        updatedDetalle.cuartosRes = result;
      } else if (fase === 'semi') {
        updatedDetalle.semiRes = result;
      } else if (fase === 'final') {
        updatedDetalle.finalRes = result;
      }

      const response = await axios.put(`${apiUrl.replace('Competencia', 'DetalleCompetencia')}${id}`, updatedDetalle);
      return response.data;
    } catch (error) {
      console.error('Error adding result:', error);
      throw error;
    }
  },

  // Obtener la clasificación de una competencia
  async getClasificacion(id) {
    try {
      const response = await axios.get(`${apiUrl.replace('Competencia', 'DetalleCompetencia')}?idCom=${id}`);
      const detalles = response.data;

      // Filtrar y ordenar los resultados
      const resultadosOrdenados = detalles
        .filter(detalle => detalle.clasRes && detalle.clasRes !== 'fs' && detalle.clasRes !== 'fall')
        .map(detalle => ({
          ...detalle,
          tiempo: parseFloat(detalle.clasRes),
        }))
        .sort((a, b) => a.tiempo - b.tiempo);

      return resultadosOrdenados;
    } catch (error) {
      console.error('Error fetching clasificacion:', error);
      throw error;
    }
  },

  // Simular enfrentamientos entre deportistas
  async enfrentar(deportista1, deportista2, fase) {
    const tiempo1 = parseFloat(deportista1[`${fase}Res`]);
    const tiempo2 = parseFloat(deportista2[`${fase}Res`]);

    if (isNaN(tiempo1) || deportista1[`${fase}Res`] === 'fs' || deportista1[`${fase}Res`] === 'fall') {
      return deportista2;
    }
    if (isNaN(tiempo2) || deportista2[`${fase}Res`] === 'fs' || deportista2[`${fase}Res`] === 'fall') {
      return deportista1;
    }

    return tiempo1 < tiempo2 ? deportista1 : deportista2;
  },
};

export default CompetenciaController;