import axios from 'axios';
import { JSON } from 'json';

const APIConsumer = {
  async select(apiUrl) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const datos = JSON.parse(response.data);
      return datos;
    } catch (error) {
      console.error(error);
    }
  },

  async select_search_for(apiUrl, searchFor) {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          searchFor
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const datos = JSON.parse(response.data);
      return datos;
    } catch (error) {
      console.error(error);
    }
  },

  async select_one(apiUrl) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const datos = JSON.parse(response.data);
      return datos;
    } catch (error) {
      console.error(error);
    }
  },

  async insert(apiUrl, data) {
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const resultado = JSON.parse(response.data);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  async update(apiUrl, data) {
    try {
      const response = await axios.put(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(apiUrl) {
    try {
      await axios.delete(apiUrl);
    } catch (error) {
      console.error(error);
    }
  }
};

export default APIConsumer;