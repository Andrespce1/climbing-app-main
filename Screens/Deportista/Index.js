import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const Index = () => {
  const [deportistas, setDeportistas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOrEntrenador, setIsAdminOrEntrenador] = useState(false); // Simulando User.IsInRole
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaClubes, setListaClubes] = useState([]);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener datos
    loadDeportistas();
    loadListaCategorias();
    loadListaClubes();
    loadListaEntrenadores();
    loadListaGeneros();
    loadListaProvincias();
    loadListaUsuarios();
    checkUserRole(); // Simulando User.IsInRole
  }, []);

  const loadDeportistas = async () => {
    // Llamar a la API para obtener deportistas
    const response = await fetch('https://tu-api.com/deportistas');
    const data = await response.json();
    setDeportistas(data);
  };

  const loadListaCategorias = async () => {
    // Llamar a la API para obtener categorías
    const response = await fetch('https://tu-api.com/categorias');
    const data = await response.json();
    setListaCategorias(data);
  };

  // Repetir para cada lista (clubes, entrenadores, géneros, provincias, usuarios)

  const checkUserRole = () => {
    // Simulando la verificación de rol
    setIsAdminOrEntrenador(true); // Cambiar según la lógica de autenticación
  };

  const handleSearch = () => {
    // Implementar lógica de búsqueda
  };

  return (
    <View>
      {isAdminOrEntrenador && (
        <View>
          <Text>ADMINISTRACIÓN DE DEPORTISTAS</Text>
          <Button title="Crear" onPress={() => console.log('Crear deportista')} />
        </View>
      )}

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar ..."
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={deportistas}
        renderItem={({ item }) => (
          <View>
            <Text>Nombres: {item.NombresDep}</Text>
            <Text>Apellidos: {item.ApellidosDep}</Text>
            <Text>Cédula: {item.CedulaDep}</Text>

            <Text>Categoría: 
              {listaCategorias.find((categoria) => categoria.IdCat === item.IdCat)?.NombreCat}
            </Text>

            <Text>Club: 
              {listaClubes.find((club) => club.IdClub === item.IdClub)?.NombreClub}
            </Text>

            <Text>Entrenador: 
              {listaEntrenadores.find((entrenador) => entrenador.IdEnt === item.IdEnt)?.NombresEnt} 
              {listaEntrenadores.find((entrenador) => entrenador.IdEnt === item.IdEnt)?.ApellidosEnt}
            </Text>

            <Text>Género: 
              {listaGeneros.find((genero) => genero.IdGen === item.IdGen)?.NombreGen}
            </Text>

            <Text>Provincia: 
              {listaProvincias.find((provincia) => provincia.IdPro === item.IdPro)?.NombrePro}
            </Text>

            <Text>Usuario: 
              {listaUsuarios.find((usuario) => usuario.IdUsu === item.IdUsu)?.NombreUsu}
            </Text>

            <Text>Estado: {item.ActivoDep ? 'Activo' : 'Inactivo'}</Text>

            {isAdminOrEntrenador && (
              <View>
                <TouchableOpacity onPress={() => console.log('Editar deportista')}>
                  <Text>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Detalles deportista')}>
                  <Text>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Deshabilitar deportista')}>
                  <Text>Deshabilitar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={item => item.IdDep.toString()}
      />
    </View>
  );
};

export default Index;