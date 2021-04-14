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
            selectedId:'',
            harga : 0,
        }
    }

    _renderItem =({item,index}) =>{
      const { navigation,route } = this.props;  
      const { hargaBeliToday,token,userid,berat } = route.params;
      var harga = berat * hargaBeliToday
      // console.log(harga)

      if(harga >= 499999){
        return(      
            <TouchableOpacity style={styles.item} onPress={() => this.checkPin(item.bankid,item.urlicon,item.kategori)} >
              <View style={styles.containerBank}>
                <View >
                    <Image style={styles.imageBank}   
                    source={{
                    uri: item.urlicon,
                    }}/> 
                </View>
                <View style={{padding:7}}>
                    <Text style={styles.textBerat}>{item.bankname}</Text>
                    
                </View>
            </View>
            </TouchableOpacity>        
        )
      }else{
          if(item.bankid != 'bfmx19udvhlSME5y'){
              return(      
                <TouchableOpacity style={styles.item} onPress={() => this.checkPin(item.bankid,item.urlicon,item.kategori)} >
                  <View style={styles.containerBank}>
                    <View >
                        <Image style={styles.imageBank}   
                        source={{
                        uri: item.urlicon,
                        }}/> 
                    </View>
                    <View style={{padding:7}}>
                        <Text style={styles.textBerat}>{item.bankname}</Text>
                        
                    </View>
                </View>
                </TouchableOpacity>        
            )
          }
      }
        
    }
    checkPin = (bankid,urlicon,kategori) =>{
    const { navigation,route } = this.props;  
    const { hargaBeliToday,token,userid,berat } = route.params;
    var harga = berat * hargaBeliToday
    
    navigation.navigate('pinConfirmation',{berat:berat,token:token,userid:userid,hargaBeliToday:hargaBeliToday,bankid:bankid,total:harga,urlicon:urlicon,kategori:kategori})
        
    }
    onLogout = async() =>{
        // const { navigation,route } = this.props;  
        // const { hargaBeliToday,token,userid } = route.params;
        
        var token = this.props.route.params.token
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
      componentDidMount(){
        this.onLogout()
      }
    render(){
     
      const { navigation } = this.props;
 
    return(
        
        <View style={styles.container}>
           
        <SafeAreaView>
     
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
          extraData={
            this.state.selectedId     // for single item
          }
          numColumns = {numColumn}
          />
        </View>   
          <Text style={styles.textNote}>
            Note :
          </Text>
          <Text style={styles.textNote}>
            Untuk Pembayaran VA Via BCA Minimal Transaksi Rp 500.000
          </Text>


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
    textNote:{
      color: '#666872',
      fontSize: 12,
      width: windowHeight/3,
      paddingRight:20,
      left:25,
      alignItems:'center',
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
  