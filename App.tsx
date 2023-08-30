import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import Login from './screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';


const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() =>{
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    })
  })


  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        {user ? 
        (
          <Stack.Screen name='Main' options={{headerShown: false}} component={MainScreen}/>

        ) : 
        (
          <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
        )}

        </Stack.Navigator>      
    </NavigationContainer>
    </GestureHandlerRootView>


  );
}

