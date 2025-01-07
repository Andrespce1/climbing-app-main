import React from "react";
import { Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAppStorageHook from "./../../storage/appStorage";

import ClubStackNavigation from "./ClubStackNavigation";
import SedeStackNavigation from "./SedeStackNavigation";
import DeportistaStackNavigation from "./DeportistaStackNavigation";
import CompentenciaStackNavigation from "./CompentenciaStackNavigation";

const Tab = createBottomTabNavigator();



const BottomTabsNavigation = () => {
  const { appUser, unsetAppUser, setAppUser } = useAppStorageHook();
  return (
    <>
      {
      appUser != null && appUser.rolesUsu == "Administrador" ? (
        <Tab.Navigator
          screenOptions={{
            // tabBarHideOnKeyboard: true,
            // tabBarShowLabel: false,
            // tabBarStyle: [
            //   {
            //     position: 'absolute',
            //     bottom: 0,
            //     left: 0,
            //     right: 0,
            //     elevation: 0,
            //     backgroundColor: '#FFFFFF',
            //     borderRadius: 15,
            //     height: 90,
            //   },
            // ],
            headerShown: true,
          }}
        >
          <Tab.Screen
            name="ClubStackNavigation"
            component={ClubStackNavigation}
            options={{
              headerShown: false,
              // tabBarActiveTintColor: '#452ea6',
              // tabBarLabel: 'ConfigTabStackNavigation',
              // tabBarIcon: ({color, size, focused}) => (
              //   <View>
              //     <Icon name="settings" type="material" color={color} size={size} />
              //     <Text style={{color: color, fontSize: 10}}>
              //     ClubStackNavigation
              //     </Text>
              //   </View>
              // ),
            }}
          />
          <Tab.Screen
            name="SedeStackNavigation"
            component={SedeStackNavigation}
          />
          <Tab.Screen
            name="DeportistaStackNavigation"
            component={DeportistaStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation"
            component={CompentenciaStackNavigation}
          />
        </Tab.Navigator>
      ) : 
      appUser != null && appUser.rolesUsu == "Juez" ? (
        <Tab.Navigator
          screenOptions={{
            // tabBarHideOnKeyboard: true,
            // tabBarShowLabel: false,
            // tabBarStyle: [
            //   {
            //     position: 'absolute',
            //     bottom: 0,
            //     left: 0,
            //     right: 0,
            //     elevation: 0,
            //     backgroundColor: '#FFFFFF',
            //     borderRadius: 15,
            //     height: 90,
            //   },
            // ],
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="ClubStackNavigation"
            component={ClubStackNavigation}
            options={{
              headerShown: false,
              // tabBarActiveTintColor: '#452ea6',
              // tabBarLabel: 'ConfigTabStackNavigation',
              // tabBarIcon: ({color, size, focused}) => (
              //   <View>
              //     <Icon name="settings" type="material" color={color} size={size} />
              //     <Text style={{color: color, fontSize: 10}}>
              //     ClubStackNavigation
              //     </Text>
              //   </View>
              // ),
            }}
          />
          <Tab.Screen
            name="SedeStackNavigation"
            component={SedeStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation"
            component={CompentenciaStackNavigation}
          />
        </Tab.Navigator>
      ):
      appUser != null && appUser.rolesUsu == "Entrenador" ? (
        <Tab.Navigator
          screenOptions={{
            // tabBarHideOnKeyboard: true,
            // tabBarShowLabel: false,
            // tabBarStyle: [
            //   {
            //     position: 'absolute',
            //     bottom: 0,
            //     left: 0,
            //     right: 0,
            //     elevation: 0,
            //     backgroundColor: '#FFFFFF',
            //     borderRadius: 15,
            //     height: 90,
            //   },
            // ],
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="ClubStackNavigation"
            component={ClubStackNavigation}
            options={{
              headerShown: false,
              // tabBarActiveTintColor: '#452ea6',
              // tabBarLabel: 'ConfigTabStackNavigation',
              // tabBarIcon: ({color, size, focused}) => (
              //   <View>
              //     <Icon name="settings" type="material" color={color} size={size} />
              //     <Text style={{color: color, fontSize: 10}}>
              //     ClubStackNavigation
              //     </Text>
              //   </View>
              // ),
            }}
          />
          <Tab.Screen
            name="DeportistaStackNavigation"
            component={DeportistaStackNavigation}
          />
        </Tab.Navigator>
      )
      : (
        <Tab.Navigator
          screenOptions={{
            // tabBarHideOnKeyboard: true,
            // tabBarShowLabel: false,
            // tabBarStyle: [
            //   {
            //     position: 'absolute',
            //     bottom: 0,
            //     left: 0,
            //     right: 0,
            //     elevation: 0,
            //     backgroundColor: '#FFFFFF',
            //     borderRadius: 15,
            //     height: 90,
            //   },
            // ],
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="ClubStackNavigation"
            component={ClubStackNavigation}
            options={{
              headerShown: false,
              // tabBarActiveTintColor: '#452ea6',
              // tabBarLabel: 'ConfigTabStackNavigation',
              // tabBarIcon: ({color, size, focused}) => (
              //   <View>
              //     <Icon name="settings" type="material" color={color} size={size} />
              //     <Text style={{color: color, fontSize: 10}}>
              //     ClubStackNavigation
              //     </Text>
              //   </View>
              // ),
            }}
          />
          <Tab.Screen
            name="SedeStackNavigation"
            component={SedeStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation1"
            component={CompentenciaStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation2"
            component={CompentenciaStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation3"
            component={CompentenciaStackNavigation}
          />
          <Tab.Screen
            name="CompentenciaStackNavigation4"
            component={CompentenciaStackNavigation}
          />
        </Tab.Navigator>
      )}
    </>

    // {
    //   appUser!=null && appUser.rolesUsu=="Administrador"?(
    //       <Stack.Group>
    //           <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
    //           options={{ headerShown: true,headerTitle:"Administrador Stack"}}
    //           />
    //       </Stack.Group>

    //   )
    //   :appUser!=null && appUser.rolesUsu=="Deportista"?(
    //       <Stack.Group>
    //           <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
    //           options={{ headerShown: true,headerTitle:"Deportista Stack"}}
    //           />
    //       </Stack.Group>
    //   )
    //   :appUser!=null && appUser.rolesUsu=="Entrenador"?(
    //       <Stack.Group>
    //           <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
    //           options={{ headerShown: true,headerTitle:"Entrenador Stack"}}
    //           />
    //       </Stack.Group>
    //   )
    //   :appUser!=null && appUser.rolesUsu=="Juez"?(
    //       <Stack.Group>
    //           <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
    //           options={{ headerShown: true,headerTitle:"Juez Stack"}}
    //           />
    //       </Stack.Group>
    //   )
    //   :
    //   (
    //       <Stack.Group>
    //           <Stack.Screen name="AppStackNavigation" component={AppStackNavigation}
    //               options={{ headerShown: true,headerTitle:"No Sesion Stack" }}
    //               />
    //       </Stack.Group>
    //   )
    // }
  );
};

export default BottomTabsNavigation;
