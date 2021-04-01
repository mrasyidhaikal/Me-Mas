import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import Icon from 'react-native-vector-icons/Ionicons'
import CallAsyncData from './Controller/CallAsyncData';
import loginScreen from './View/login';
import HomeScreen from './View/HomeScreen';
import RegisterScreen from './View/RegisterScreen';
import PinScreen from './View/pin';
import Beranda from './View/Beranda/Beranda';
import Transaksi from './View/Transaksi/Transaksi';
import GrafikScreen from './View/Beranda/GrafikEmas';
import BeliEmas from './View/Beranda/BeliEmas';
import JualEmas from './View/Beranda/JualEmas';
import Profile from './View/Beranda/Profile';
import ChangePassword from './View/Beranda/ChangePassword'
import ChangePin from './View/Beranda/ChangePin'
import metodePembayaran from './View/Beranda/MetodePembayaran'
import pinConfirmation from './View/Beranda/PinConfirmation'
import detail from './View/Beranda/detail'
import detailTransaction from './View/Transaksi/detailTransaction'
import detailJualTransaction from './View/Transaksi/detailJualTransaction'
import DataRekening from './View/Beranda/DataRekening'
import TambahKartu from './View/Beranda/TambahKartu'
import UpdateKartu from './View/Beranda/UpdateKartu'
import ListKartu from './View/Beranda/ListKartu'
import KonfirmasiJual from './View/Beranda/KonfirmasiJual'
import TransaksiSelesai from './View/Transaksi/TransaksiSelesai'
// import login from './View/login'

const { width: WIDTH} = Dimensions.get('window');
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RegisterStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TransaksiStack = createStackNavigator();
const IsiHomeStack = createStackNavigator();

// const IsiHomeStacks = () => {
//   return(
//     <IsiHomeStack.Navigator
//     screenOptions={{ gestureEnabled: false, headerShown: false }}
//     >
     
//     </IsiHomeStack.Navigator>
//     )
// } 

const RegisterTab = () => {
  return(
      <RegisterStack.Navigator
      screenOptions={{ gestureEnabled: false, headerShown: false }}
      >
           <RegisterStack.Screen
              name="Splash"
              component={HomeScreen}
            />
              <RegisterStack.Screen
              name="Login"
              component={loginScreen}
            />
          <RegisterStack.Screen
              name="Register"
              component={RegisterScreen}
            />
        <RegisterStack.Screen
            name="pin"
            component={PinScreen}
          />
          <RegisterStack.Screen
            name="AppTabs"
            component={AppTabs}
          />
      
      </RegisterStack.Navigator>
  );
}

const HomeStackScreen = ({navigation,route}) =>{
  // if(route.state && route.state.index > 0){
  //   navigation.setOptions({tabBarVisible : false})
  // }else{
  //   navigation.setOptions({tabBarVisible : true})
  // }

  return(
  <HomeStack.Navigator
  screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <HomeStack.Screen name="Beranda" component={Beranda}  />
    <HomeStack.Screen name="Grafik" component={GrafikScreen}  />

    <HomeStack.Screen name="Profile" component={Profile}  />
    <HomeStack.Screen name="beliEmas"component={BeliEmas}/>
    <HomeStack.Screen name="metodePembayaran"component={metodePembayaran}/>
    <HomeStack.Screen name="pinConfirmation" component={pinConfirmation} />
    <HomeStack.Screen name="detail" component={detailTransaction} />
    <HomeStack.Screen name="detailJual" component={detailJualTransaction} />
    <HomeStack.Screen name="jualEmas" component={JualEmas} />
    {/* <HomeStack.Screen 
      name="IsiHomeStack" 
      component={IsiHomeStacks}
    /> */}

    <HomeStack.Screen name="UpdateKartu" component={UpdateKartu} />
    <HomeStack.Screen name="DataRekening" component={DataRekening} />
    <HomeStack.Screen name="TambahKartu" component={TambahKartu} />
    <HomeStack.Screen name="ListKartu" component={ListKartu} />
    <HomeStack.Screen name="KonfirmasiJual" component={KonfirmasiJual} />
    <HomeStack.Screen name="ChangePassword" component={ChangePassword} />
    <HomeStack.Screen name="ChangePin" component={ChangePin} />
    <HomeStack.Screen name="Login" component={RegisterTab} />

  </HomeStack.Navigator>
  )
}

const TransaksiStackScreen = () =>{
  return(
  <TransaksiStack.Navigator
  screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <TransaksiStack.Screen name="Transaksi" component={Transaksi}  />
    <TransaksiStack.Screen name="detailTransaction" component={detailTransaction} />
    <TransaksiStack.Screen name="detailJualTransaction" component={detailJualTransaction} />
    <TransaksiStack.Screen name="TransaksiSelesai" component={TransaksiSelesai} />
  </TransaksiStack.Navigator>
  )
}

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
  
      <Tab.Screen name="Beranda" component={HomeStackScreen} 
      options={{
        tabBarLabel: 'Beranda',
        
        tabBarIcon: ({color}) => (
          <Icon name="ios-home-outline" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Transaksi" component={TransaksiStackScreen}
      options={{

        tabBarIcon: ({color}) => (
          <Icon name="ios-cart-outline" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>

  );
}



export default class App extends React.Component {

  
  constructor() {
    super()
   
    this.UserData()
    this.state = {
       tokenUser : "",
        tokenExpire : "",
    }
}

UserData = async() => {
  const tokenUser = await CallAsyncData.getData('token')
  const tokenExpire = await CallAsyncData.getData('tokenExpire')
  this.setState({tokenExpire: tokenExpire,tokenUser:tokenUser})
  
}

  render(){
      
  return (
    <NavigationContainer>
       <AuthStack.Navigator
    screenOptions={{ gestureEnabled: false, headerShown: false }}
      >
    {this.state.tokenUser ?(
       <AuthStack.Screen
       name="AppTabs"
       component={AppTabs}
     />
    ): (
      <AuthStack.Screen
      name="splash"
      component={RegisterTab}
    />
    )}
    
   



    
  </AuthStack.Navigator>
    </NavigationContainer>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


