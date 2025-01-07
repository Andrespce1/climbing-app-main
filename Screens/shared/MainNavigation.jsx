import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AppStackNavigation from './AppStackNavigation';
import AutorizacionStackNavigation from './AutorizacionStackNavigation';

import useAppStorageHook from './../../storage/appStorage';

import api from '../../services/api';

const Stack = createNativeStackNavigator();


const MainNavigation=()=> {

    const {appUser,unsetAppUser,setAppUser} = useAppStorageHook();
    useEffect(() => {
    console.log("Using useEffect on MainNavigation");
    // setAppUser({
    //     "idUsu": 1,
    //     "nombreUsu": "Juan Torres",
    //     "tokenUsu": "3124h87sdhsdiuhsd78",
    //     "rolesUsu": "Administrador",
    //     "activoUsu": true
    // });
    console.log(appUser);
    if(appUser!=null && appUser.tokenUsu!=null){
        api.get('/api/Usuario/validarlogin', {
            headers: {
              Authorization: `Bearer ${appUser.tokenUsu}` 
            }
          })
        .then(response => {
          console.log('Respuesta: ' + JSON.stringify(response.data));
        })
        .catch(error => {
          //Alert.alert('Credenciales inválidas');
          console.log('Error: ' + error);
          unsetAppUser();
        });
    }
    

    }, []);
    return (
//        <ClubTest/>
        <NavigationContainer>
            <Stack.Navigator>
            {
            appUser!=null?(
                <Stack.Group>
                    <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
                    options={{ headerShown: false,headerTitle:"With Sesion Stack"}}
                    />
                </Stack.Group>
            )
            :
            (
                <Stack.Group>
                    <Stack.Screen name="AutorizacionStackNavigation" component={AutorizacionStackNavigation} 
                        options={{ headerShown: false,headerTitle:"No Sesion Stack" }}
                        />
                </Stack.Group>
            )
        }
        
        </Stack.Navigator>

        </NavigationContainer>
        
    );
}

export default MainNavigation;  