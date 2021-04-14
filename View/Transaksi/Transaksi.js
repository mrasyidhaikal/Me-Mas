import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView,refreshControl, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallAsyncData from './../../Controller/CallAsyncData';
import CallAPIData from './../../Controller/CallAPI';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

const numColumn = 1


class Transaksi extends React.Component{
  
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
            gestureName: 'none',
            refreshing: false,
        }
    }

    _renderItem =({item,index}) =>{
    
        if(item.transaksitype == 'Jual' && item.status =='Pending'){
          return(
    
            <TouchableOpacity style={styles.item} onPress={() => this.checkTransaction(item.transaksiid,item.transaksitype)}>
              <View style={styles.containerBank}>
                <View style={styles.containerStart}>
                  <View style={styles.cardTransactionContentJual}>
                    <Icon name={'chevron-up'} size={20} color={'#fff'} />
                  </View>
                  <View style={{padding:5}}>
                      <Text style={styles.textBerat}>Penjualan Emas [Pending]</Text>
                  </View>
              </View>
              
              <View style={{marginRight:15}}>
                <Icon name={'ios-chevron-forward-sharp'} size={20} color={'#666872'} />
              </View>
            </View>
            <View style={{borderBottomColor:'#3A3E4F',borderBottomWidth:1,marginRight:20,marginTop:10}}></View>
            <View style={{flexDirection:'row',paddingVertical:10}}>
              <View>
                <Text style={styles.text}>Nominal</Text>
                <Text style={{color:'#fff',fontSize:16}}>{this.currencyFormat(item.total)}</Text>
              </View>
              <View style={{marginHorizontal:30}}>
                <Text style={styles.text}>Gram</Text>
                <Text style={{color:'#fff',fontSize:16}}>{item.berat+" gr"}</Text>
              </View>
              <View>
                <Text style={styles.text}>Tanggal</Text>
                <Text style={{color:'#fff',fontSize:16}}>{moment(item.transaksidate).format("DD MMM YYYY")}</Text>
              </View>
            </View>
            </TouchableOpacity>
        
        )
        let tambahJam = moment(item.transaksidate).add(3, "hours").format("DD MMM YYYY HH:mm")
        }else if(item.transaksitype == 'Beli' && item.status =='Pending' || item.status =='Menunggu Pembayaran'){
          return(
    
            <TouchableOpacity style={styles.item} onPress={() => this.checkTransaction(item.transaksiid,item.transaksitype)}>
              <View style={styles.containerBank}>
                <View style={styles.containerStart}>
                  <View style={styles.cardTransactionContentBeli}>
                    <Icon name={'chevron-down'} size={20} color={'#fff'} />
                  </View>
                  <View style={{padding:5}}>
                      <Text style={styles.textBerat}>Pembelian Emas [Pending]</Text>
                  </View>
              </View>
              
              <View style={{marginRight:15}}>
                <Icon name={'ios-chevron-forward-sharp'} size={20} color={'#666872'} />
              </View>
            </View>
            <View style={{borderBottomColor:'#3A3E4F',borderBottomWidth:1,marginRight:20,marginTop:10}}></View>
            <View style={{flexDirection:'row',paddingVertical:10}}>
              <View>
                <Text style={styles.text}>Nominal</Text>
                <Text style={{color:'#fff',fontSize:16}}>{this.currencyFormat(item.total)}</Text>
              </View>
              <View style={{marginHorizontal:30}}>
                <Text style={styles.text}>Gram</Text>
                <Text style={{color:'#fff',fontSize:16}}>{item.berat+" gr"}</Text>
              </View>
              <View>
                <Text style={styles.text}>Tanggal</Text>
                <Text style={{color:'#fff',fontSize:16}}>{moment(item.transaksidate).format("DD MMM YYYY")}</Text>
              </View>
            </View>
            </TouchableOpacity>
        
        )
        }
       
    }
    checkTransaction = (transactionID,transaksitype) =>{
          const { navigation } = this.props;  
          if(transaksitype == 'Beli'){
              navigation.navigate('TransaksiStackScreen',{screen:'detailTransaction',params:{transactionID:transactionID}})
          }else if(transaksitype == 'Jual'){
               navigation.navigate('TransaksiStackScreen',{screen:'detailJualTransaction',params:{transactionID:transactionID}})
          }
    }
    currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   }
    onLoad = async() =>{
        // const { navigation,route } = this.props;  
        // const { hargaBeliToday,token,userid } = route.params;
        const token = await CallAsyncData.getData('token')
        const userid = await CallAsyncData.getData('userid')
        //this.setState({token:token})
       // console.log(this.state.token)
        const url = `http://104.248.156.113:8024/api/v1/Transaction/GetTransaksiByUserList/${userid}`
        const response = await CallAPIData.getEmas(token,url)
        const {data,statusCode} = response
        this.setState({data:data})
      
        if(statusCode == 200){
         this.setState({ refreshing: false })
        }
    
    }

    setRefreshing = () =>{
      if(this.state.refreshing == false){
         this.setState({ refreshing: true })
         this.onLoad()
       }
    }


    onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
       const { navigation,route } = this.props;
      //  console.log(gestureName)
      this.setState({gestureName: gestureName});
      switch (gestureName) {
        case SWIPE_LEFT:

            navigation.navigate('TransaksiStackScreen',{screen:'TransaksiSelesai'})

          break;
      }
    }

    getBank = () => {
       
       
        // const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBank`
        // const response = await CallAPIData.getEmas(token,url)
        // const {data,statusCode} = response
        // (response)

      }
      componentDidMount(){
        this.onLoad()
        this.props.navigation.addListener('focus', this.onLoad)
       }
    render(){
     
      const { navigation } = this.props;

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50
      };
      
    return(
      
             
        <View style={styles.container}>
           
          <SafeAreaView>
          <ScrollView
          style={{height:windowHeight}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.setRefreshing}
              />
            }
          >
              <GestureRecognizer
                  onSwipe={(direction, state) => this.onSwipe(direction, state)}
                  config={config}
                  >

                <View style={styles.NavBackContainer}>
                
                  
                    <View>
                    <Text style={styles.logoText}>Transaksi</Text>
                    </View>
                    <View style={styles.boxHorizontal}>
                    <TouchableOpacity>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Pending</Text>
                        <View style={{borderBottomWidth:2,borderBottomColor:"#FFC52F",marginTop:3}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:20}} onPress={() => navigation.navigate('TransaksiStackScreen',{screen:'TransaksiSelesai'})}>
                        <Text style={styles.text}>Selesai</Text>
                    </TouchableOpacity>
                  </View>
                  
                
                </View>

                
                <View style={styles.NavBackContainer}>
              
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
              </GestureRecognizer>
          </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default Transaksi


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
    },
    NavBackContainer : {
       
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },
    cardTransactionContentJual:{
      padding:5,
     
      backgroundColor: '#2EAEBF',
      borderRadius:10,
    },
    cardTransactionContentBeli:{
      padding:5,
      backgroundColor: '#2daf7e',
      borderRadius: 10,
    },
    boxHorizontal:{
      flexDirection:"row",
      marginTop:10,
      justifyContent:'flex-start'
     
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
      color: '#666872',

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
        justifyContent:'space-between',
        paddingTop:10
       
    },
    containerStart:{
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
  