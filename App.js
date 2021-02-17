import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
// import login from './View/login'
// const Stack = createStackNavigator();
const { width: WIDTH} = Dimensions.get('window');

// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={login}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default function App() {
  return (

    <View style={styles.container}>
        <SafeAreaView>
        <View style={styles.logoContainer}>
          <Image source={require("./assets/logo.png")}/>
          <Text style={styles.subLogo}>Investasi dalam genggaman</Text>
        </View>
         
         <View style={styles.bottomContainer}>
                <Text style={styles.logoText}>Selamat Datang</Text>
                
                <TouchableOpacity style={styles.btnLogin}>
                      <Text style={styles.text}>Masuk</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegis}>
                      <Text style={styles.text}>Daftar</Text>
                </TouchableOpacity>
         </View>
         </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1D2A',
 
  },
  logoContainer : {
    height:'60%',
    alignItems: 'center',
    justifyContent:'center',
  },
  bottomContainer : {
    height:'40%',
    alignItems:'center',
    justifyContent: 'center'
  },
  logoText: {
    color : '#fff',
    fontSize : 25,
    marginTop: 5 ,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center'
  },
  subLogo: {
    color : '#fff',
    fontSize : 20,
    marginTop : 5,

  },
  btnLogin: {
    width : WIDTH - 55,
    height : 45,
    borderRadius: 10,
    fontSize:16,
    backgroundColor:'#FFC52F',
    justifyContent:'center',
    marginTop: 20,
  },
  btnRegis: {
    width : WIDTH - 55,
    height : 45,
    borderStyle: 'solid',
    borderWidth : 2, 
    borderRadius: 10,
    fontSize:16,
    borderColor: '#666872',
    justifyContent:'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    textAlign : 'center',
    fontSize : 16,
  }
});
