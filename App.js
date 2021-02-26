import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Icon from 'react-native-vector-icons/Ionicons'

import loginScreen from './View/login';
import HomeScreen from './View/HomeScreen';
import RegisterScreen from './View/RegisterScreen';
import PinScreen from './View/pin';
import Beranda from './View/Beranda/Beranda';
import Transaksi from './View/Transaksi/Transaksi';
import GrafikScreen from './View/Beranda/GrafikEmas';
import BeliEmas from './View/Beranda/BeliEmas';
import JualEmas from './View/Beranda/JualEmas';
// import login from './View/login'

const { width: WIDTH} = Dimensions.get('window');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();






const AppTabs = () =>{
  return (

    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#FFB800',
      
      inactiveTintColor: '#666872',
      style: {
        backgroundColor: '#1F1D2A',
        paddingBottom: 10,
        borderTopWidth:0,
  }
    }}
    >
  
      <Tab.Screen name="Beranda" component={Beranda} 
      options={{
        tabBarLabel: 'Beranda',
        
        tabBarIcon: ({color}) => (
          <Icon name="ios-home-outline" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Transaksi" component={Transaksi}
      options={{

        tabBarIcon: ({color}) => (
          <Icon name="ios-home-outline" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>

  );
}


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ gestureEnabled: false, headerShown: false }}
    
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
   
    />
    
    <Stack.Screen
      name="Login"
      component={loginScreen}
    />
      <Stack.Screen
      name="Register"
      component={RegisterScreen}
    />
      <Stack.Screen
      name="pin"
      component={PinScreen}
    />
     <Stack.Screen
      name="AppTabs"
      component={AppTabs}
    />

     <Stack.Screen
      name="Grafik"
      component={GrafikScreen}
    />
    <Stack.Screen
      name="BeliEmas"
      component={BeliEmas}
    />
    <Stack.Screen
      name="JualEmas"
      component={JualEmas}
    />
  </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


