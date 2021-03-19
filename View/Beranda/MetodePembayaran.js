import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallAsyncData from './../../Controller/CallAsyncData';
import CallAPIData from './../../Controller/CallAPI';
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

const harga = [
    {nama:require('./../../assets/6pYcEmoVuNG.png'),key:'mrasyid.haikal@gmail.com'},
    {nama:require('./../../assets/5ujN7DGvKP6Qcaw3.png'),key:'M Rasyid Khaikal'},
    {nama:require('./../../assets/8JQBzUKrep0.png'),key:'Melchem'},
    {nama:require('./../../assets/W7kN6S2sr3bepBAy.png'),key:'511243'},
    {nama:require('./../../assets/bfmx19udvhlSME5y.png'),key:'password'}]
const numColumn = 1


class Metode extends React.Component{
  
    constructor() {
     
        super()
       
        this.state = {
            showPass:true,
            press:false,
            token : '',
            bankid : '',
            bankname : '',
            kategori : '',
            data : [],
        }
    }

    _renderItem =({item,index}) =>{
        
        return(
           
          <View style={styles.item}>
               <TouchableOpacity onPress={this.checkPin}>
              <View style={styles.containerBank}>
                {/* <View >
                    <Image source={item.nama} style={styles.imageBank}/> 
                </View> */}
                <View style={{padding:7}}>
                    <Text style={styles.textBerat}>{item.bankname}</Text>
                    
                </View>
            </View>
            </TouchableOpacity>
          </View>
        
        )
    }
    checkPin = (bankid) =>{
    const { navigation,route } = this.props;  
    const { hargaBeliToday,token,userid,berat } = route.params;
    console.log(berat)
    console.log(hargaBeliToday)
    console.log(token)
    console.log(bankid)
    //navigation.navigate('pinConfirmation',{berat:berat,token:token,userid:userid,hargaBeliToday:hargaBeliToday,bankid:bankid})
        
    }
    onLogout = async() =>{
        // const { navigation,route } = this.props;  
        // const { hargaBeliToday,token,userid } = route.params;
        
        var token = this.props.route.params.hargaBeliToday
        //this.setState({token:token})
       // console.log(this.state.token)
        const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBank`
        const response = await CallAPIData.getEmas(token,url)
        const {data,statusCode} = response
        this.setState({data:data})
      
    
    }

    getBank = () => {
       
       
        // const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBank`
        // const response = await CallAPIData.getEmas(token,url)
        // const {data,statusCode} = response
        // console.log(response)

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
            <Text style={styles.logoText}>Pembayaran</Text>
           
            </View>
         
        </View>

        
        <View style={styles.NavBackContainer}>
            <Text style={{color:'#fff',fontSize:16}}>Virtual Acccount</Text>
        </View>
        <View>
        <FlatList
          data={this.state.data}
          renderItem = {this._renderItem}
          keyExtractor={(item, index)=> index.toString()}
          numColumns = {numColumn}
          />
        </View>

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

        <TouchableOpacity onPress={this.onLogout}>
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
      
     
       

         
        
       
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default Metode


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
    imageBank:{
      width:40,
      height:40,
      
    },
    containerBank:{
        flexDirection : 'row',

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
  