import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const harga = [{key:'100rb'},{key:'250rb'},{key:'500rb'},{key:'750rb'},{key:'1jt'},{key:'Lainnya'}]
const numColumn = 3
class BeliEmas extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false
        }
    }
 
    _renderItem =({item,index}) =>{
      
        return(
          <View style={styles.item}>
            <TouchableOpacity>
            <Text style={styles.textBerat}>{item.key}</Text>
            </TouchableOpacity>
          </View>
        )
    }
    render(){
      const { navigation } = this.props;
    return(
        
        <View style={styles.container}>
           
        <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>

            <Text style={styles.logoText}>Beli Emas</Text>
           
        </View>

        <View style={styles.detailHarga}>
                <View style={{flexDirection:'row',justifyContent:'space-around',}}>
                  <Text style={styles.text}>Harga Beli</Text>
                <Icon name={'ios-chevron-forward-sharp'} size={28} color={'#fff'}/>
                  <Text style={styles.text}>Rp. 840.000/gr</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:20}}>
                  <Text style={styles.subText}>Per/01/01/2021</Text>
                </View>
        </View>

        <View style={styles.boxHorizontal}>
                  <TouchableOpacity style={{borderBottomWidth:2,borderBottomColor:"#FFC52F"}}>
                      <Text style={styles.text}>Rupiah</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:20}}>
                      <Text style={styles.text}>Gram</Text>
                  </TouchableOpacity>
        </View>

        <View style={styles.beratEmas}>
            <Text style={styles.text}>Setara dengan barat emas</Text>
            <Text style={styles.textBerat}>0 gr</Text>
        </View>

        <View>
          <FlatList
          data={harga}
          renderItem = {this._renderItem}
          keyExtractor={(item, index)=> index.toString()}
          numColumns = {numColumn}
          />
        </View>
        <View style={{marginVertical:20}}>
            <TextInput
                    style={styles.input}
                    placeholder={'Rp.'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
        </View>
        
      <View style={{alignSelf:'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Login') } style={styles.btnLogin} >
                  <Text style={styles.text}>Beli Emas</Text>
      </TouchableOpacity>
      </View>
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default BeliEmas


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
      marginTop:50,
      marginLeft : 30,
      alignContent:'space-around',
      justifyContent:'center',
    
    },
    detailHarga:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#6c62cc',
      borderRadius: 10,
    },
    beratEmas:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#252835',
      borderRadius: 10,
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
      fontSize : 18,
      textAlign:'center',
    //  fontFamily: 'Roboto-Bold',
    },
    text: {
      color: '#fff',
      textAlign : 'center',
      fontSize : 16,
    },
    subText: {
      fontSize:12,
      color:'#fff'
    },
    boxHorizontal:{
      flexDirection:"row",
      marginTop:10,
      justifyContent:'center'
     
    },
    item :{
      backgroundColor : '#1F1D2A',
      borderColor: '#252835',
      borderWidth:2,
      alignItems:'center',
      borderRadius:10,
      justifyContent:'center',
      height : 70,
      margin:10,
      flex:1,
    },
    input: {
      width: WIDTH-200,
      
      height:45,
      borderRadius:10,
      fontSize:16,
      paddingLeft:15,
      backgroundColor:'#252835',
      color:'#fff',
      marginHorizontal:100,
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
  });
  