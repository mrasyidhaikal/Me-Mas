import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);
const harga = [
    {nama:'Email',key:'mrasyid.haikal@gmail.com'},
    {nama:'Nama Lengkap',key:'M Rasyid Khaikal'},
    {nama:'Alamat',key:'Melchem'},
    {nama:'Nomor KTP',key:'511243'},
    {nama:'Tempat Lahir',key:'password'}]
const numColumn = 1


class Profile extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false
        }
    }

    _renderItem =({item,index}) =>{
      
        return(
            <TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.nama}</Text>
            <Text style={styles.textBerat}>{item.key}</Text>
          </View>
          </TouchableOpacity>
        )
    }
 
    onLogout = async() =>{
      const { navigation } = this.props;
      try{
        await AsyncStorage.clear()
        navigation.navigate('Login')
      }catch(err){
        console.log(err)
      }
    }
    render(){
      const { navigation } = this.props;
    return(
        
        <View style={styles.container}>
           
        <SafeAreaView>
        <ScrollView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Pengaturan Akun</Text>
            <Image source={require("./../../assets/profile.png")} style={{marginRight:30,}} />    
            </View>
         
        </View>

        
        <View style={styles.NavBackContainer}>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Personal Information</Text>
        </View>
        <View>
        <FlatList
          data={harga}
          renderItem = {this._renderItem}
          keyExtractor={(item, index)=> index.toString()}
          numColumns = {numColumn}
          />
        </View>
        <View style={styles.NavBackContainer}>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Data Rekening</Text>
            
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('DataRekening') }>
             <View style={styles.keamanan}>

            <View style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>    
                <Icon name={'ios-card-outline'} size={25} color={'#2EAEBF'} style={styles.inputIcon}/>
                <Text style={styles.textBerat}> Data Rekning</Text>
            </View>  

            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name={'ios-chevron-forward-sharp'} size={25} color={'#fff'}/>
            </View>

          </View>
        </TouchableOpacity>

        <View style={styles.NavBackContainer}>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Keamanan</Text>
            
        </View>
        
        
        <TouchableOpacity onPress={() => navigation.push('ChangePassword') }>
          <View style={styles.keamanan}>

            <View style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>    
                <Icon name={'ios-lock-closed-outline'} size={25} color={'#2EAEBF'} style={styles.inputIcon}/>
                <Text style={styles.textBerat}> Password</Text>
            </View>  

            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name={'ios-chevron-forward-sharp'} size={25} color={'#fff'}/>
            </View>

          </View>
          </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.keamanan}>

            <View style={{flex:0.5,flexDirection:'row',alignItems:'center'}}>    
                <Icon name={'ios-lock-closed-outline'} size={25} color={'#2EAEBF'} style={styles.inputIcon}/>
                <Text style={styles.textBerat}> PIN</Text>
            </View>  

            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name={'ios-chevron-forward-sharp'} size={25} color={'#fff'}/>
            </View>

          </View>
          </TouchableOpacity>
      
     
       

         
        
          <TouchableOpacity onPress={this.onLogout}>
          <View style={styles.keamanan}>

            <View style={{flex:1,alignItems:'center'}}>    
               
                <Text style={styles.text}>Logout</Text>
            </View>  

            <View style={{alignItems:'center'}}>
                <Icon name={'ios-arrow-forward-circle'} size={25} color={'#E14C4C'}/>
            </View>

          </View>
          </TouchableOpacity>
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default Profile


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
       
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },


    keamanan:{
      flex:1,
      margin : 20,
      paddingVertical:15,
      paddingLeft:15,
      backgroundColor: '#252835',
      borderRadius: 10,
      flexDirection:'row',
      
    },
   
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 5 ,
    //  fontFamily: 'Roboto-Bold',
    },
    textBerat: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 16,
      
    //  fontFamily: 'Roboto-Bold',
    },
    text: {
      color: '#E14C4C',

      fontSize : 16,
    },
    textItem:{
        fontSize:13,
        color:'#666872',
        
    },
  
    item :{
      backgroundColor : '#252835',
      borderColor: '#1F1D2A',
      borderWidth:2,
      borderRadius:10,
      justifyContent:'center',
      alignContent: 'flex-start',
      height : 70,
      margin:10,
      flex:1,
      paddingLeft:20,
    },

    btnLogin: {
      width : WIDTH - 55,
      height : 45,
      borderRadius: 10,
      fontSize:16,
      backgroundColor:'#252835',
      flexDirection:'row',
      justifyContent:'center',
      marginTop: 20,
    },
  });
  