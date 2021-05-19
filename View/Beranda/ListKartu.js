import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView,ImageBackground,RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CallAsyncData from './../../Controller/CallAsyncData';
import CallAPIData from './../../Controller/CallAPI';
import Icon from 'react-native-vector-icons/Ionicons'
import react from 'react';
import { withRepeat } from 'react-native-reanimated';

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const numColumn = 1

class ListKartu extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false,
            data:[],

            refreshing: false,

            selectedId:'',

        }
    }
    showPass = () => {
        if (this.state.press == false){
            this.setState({ showPass: false, press:true })
        }else{
            this.setState({ showPass: true, press:false })
        }
    }
    getDataRekening = async() =>{
  
  
          const token = await CallAsyncData.getData('token')
          const userid = await CallAsyncData.getData('userid')
          const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBankUserList/${userid}`
          const response = await CallAPIData.getEmas(token,url)
          const {data,statusCode} = response
         
          this.setState({data:data})
          console.log(statusCode)

          if(statusCode == 200){
              this.setState({ refreshing: false })
          }

         
        }
    
        _renderItem =({item,index}) =>{
          const { navigation,route } = this.props;
          const {berat,hargaJualToday,token,userid,saldoUang,userSaldo} =  route.params
        
            return(
        
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('KonfirmasiJual',{bankid:item.bankuserid,berat:berat,hargaJualToday:hargaJualToday,token:token,userid:userid,saldoUang:saldoUang,userSaldo:userSaldo,norek:item.norekning,bankname:item.bankname,namapemilik:item.namapemilik})} >
            <ImageBackground source={require('./../../assets/paycard.png')} style={styles.image}>
                  <View style={styles.containerBank}>
                    {/* <View >
                        <Image style={styles.imageBank}   
                        source={{
                        uri: item.urlicon,
                        }}/> 
                    </View> */}
                    <View>
                        <View>
                        <Text style={styles.textBerat}>{item.bankname}</Text>
                        </View>
                        <View style={{paddingVertical:25}}>
                        <Text style={styles.text}>Nomor Rekening</Text>
                        <Text style={styles.text}>{item.norekning}</Text>
                        </View>
                        <View>
                        <Text style={styles.textBerat}>{item.namapemilik}</Text>
                        </View>
                    </View>
                </View>
                </ImageBackground>
                </TouchableOpacity>
            
            )
        }
    
    componentDidMount(){
      // this.setState({ refreshing: true })
      this.getDataRekening()
    }
    
    setRefreshing = () =>{
      if(this.state.refreshing == false){
         this.setState({ refreshing: true })
         this.getDataRekening()
       }
    }
   
    render(){
      const { navigation } = this.props;
    return(
        
        <View style={styles.container}>
           
        <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.setRefreshing}
            />
          }
        >
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Registration</Text>
            </View>
         
        </View>

        <View>
                <FlatList
                data={this.state.data}
                renderItem = {this._renderItem}
                keyExtractor={(item, index)=> index.toString()}

                extraData={
                  this.state.selectedId    // for single item
                }
                numColumns = {numColumn}

                />
           
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TambahKartu')}>
          <View style={styles.keamanan}>

            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>    
                <Image source={require('./../../assets/ic_add_card.png')}/>
                <Text style={styles.text}>Tambahkan Kartu</Text>
            </View>  

          </View>
          </TouchableOpacity>
    
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default ListKartu


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
       
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },
    image:{
        
        borderWidth:2,
        borderRadius:10,
        justifyContent:'center',
        alignContent: 'flex-start',
        height: 204,
        margin:10,
        flex:1,
        paddingLeft:20,
    },


    keamanan:{
      flex:1,
      margin : 20,
    
      backgroundColor: 'rgba(108, 98, 204, 0.2)',
      borderColor: '#6C62CC',
      borderWidth : 2,
      borderRadius: 10,
      flexDirection:'row',
      height: 204,
      
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
      fontSize : 20,
      
    //  fontFamily: 'Roboto-Bold',
    },
    text: {
      color: '#fff',

      fontSize : 16,
    },
    textItem:{
        fontSize:13,
        color:'#666872',
        
    },
    item :{
      margin:0
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
    inputContainer:{
        marginTop:10,
    },
    input: {
        width: WIDTH-55,
        height:45,
        borderRadius:10,
        fontSize:16,
        paddingLeft:20,
        backgroundColor:'#252835',
        color:'#fff',
        marginHorizontal:25,
    },
    inputIcon:{
        position: 'absolute',
        borderColor:'#666872',
        top:8,
        left:37,
        paddingRight:5,
        borderRightWidth : 1, 
    },
    btnEye:{
        position:'absolute',
        top:8,
        right:37,
    }
  });
  