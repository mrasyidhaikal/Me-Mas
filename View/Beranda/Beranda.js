import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView, RefreshControl } from 'react-native';
import Logout from './../../Controller/Logout';
import CallAsyncData from './../../Controller/CallAsyncData';
import CallAPIData from './../../Controller/CallAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const { width: WIDTH} = Dimensions.get('window');

class login extends React.Component{
    
    constructor() {
        super()
       
        this.UserData()

        this.state = {
            showPass:true,
            press:false,
            namaUser : "",
            tokenExpire : "",
            userid:"",
            token:"",
            isLogout : false,
            jualPersen: 0,
            beliPersen:0,
            hargaBeliToday:0,
            hargaJualToday:0,
            iconBeli : "",
            warnaBeli : "#fff",
            iconJual : "",
            warnaJual : "#fff",
            userSaldo :0,
            saldoUang:0,
            refreshing: false,
           
        }
    }
    
    // componentDidMount(){
    //   this.timer = setInterval(()=> this.checkExpire(), 10000,true)
    //  }

    //  checkExpire = async() => {
    //   const { navigation } = this.props;
    //   var day = Date()
   
    //   const hariIni = moment(day).format("YYYY-MM-DD hh:mm")
    //   console.log(this.state.tokenExpire)
    //  //console.log(hariIni)
    //   if (hariIni >= this.state.tokenExpire) {
    //     Logout.onLogout()
    //     console.log("udah")
    //     navigation.navigate('Login')
    //   }else{
    //     console.log("belom")
    //   }
    //  }
 
    UserData = async() => {
      //const { navigation } = this.props;
      const namaUser = await CallAsyncData.getData('name')
      const tokenExpire = await CallAsyncData.getData('tokenExpire')
      const token = await CallAsyncData.getData('token')
      const userid = await CallAsyncData.getData('userid')


      this.setState({namaUser :namaUser,tokenExpire:tokenExpire,token:token,userid:userid})
      this.getHarga()
    
    
    }
    getHarga = async() => {


      const today = moment(Date()).format("YYYY-MM-DD")
      const yesterDay =moment(Date()).add(-31,'days').format("YYYY-MM-DD")
      // console.log(today)
 
      // const today = '2021-03-25'
      // const yesterDay = '2021-03-24'

      const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetHargaEmas/${yesterDay}/${today}`
      const response = await CallAPIData.getEmas(this.state.token,url)
      const {data,statusCode} = response
      // console.log(response)
      
      let jualPersen = ((data[0].hargajual/data[1].hargajual)-1)*100
      let beliPersen = ((data[0].hargabeli/data[1].hargabeli)-1)*100
      let hargaBeliToday = data[0].hargabeli
      let hargaJualToday = data[0].hargajual

      this.setState({jualPersen:jualPersen,beliPersen:beliPersen,hargaBeliToday:hargaBeliToday,hargaJualToday:hargaJualToday})
      this.checkDownOrUpBeli()
      this.checkDownOrUpJual()
      this.getSaldo()
     
      if(statusCode == 200 ){
        this.setState({ refreshing: false })
      }


    }
    checkDownOrUpBeli(){
      if (this.state.beliPersen < 0) {
        this.setState({iconBeli:'ios-caret-down',warnaBeli:'#E14C4C'})
      }else{
        this.setState({iconBeli:'ios-caret-up',warnaBeli:'#2DAF7E'})
      }
    }
    checkDownOrUpJual(){
      if (this.state.jualPersen < 0) {
        this.setState({iconJual:'ios-caret-down',warnaJual:'#E14C4C'})
      }else{
        this.setState({iconJual:'ios-caret-up',warnaJual:'#2DAF7E'})
      }
    }
    getSaldo = async() =>{

        const link = `http://104.248.156.113:8024/api/v1/Dashboard/GetSaldo/${this.state.userid}`
        const saldo = await CallAPIData.getEmas(this.state.token,link)
        const {data,statusCode} = saldo
     
        let saldoUang = data.balanceberat * this.state.hargaJualToday
        this.setState({userSaldo:data.balanceberat,saldoUang:saldoUang})
    
    }
    currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   }

   setRefreshing = () =>{
     if(this.state.refreshing == false){
        this.setState({ refreshing: true })
        this.getHarga()
      }
   }
    render(){
    
      const { navigation } = this.props;
    return(
    
        <View style={styles.container}>
        <SafeAreaView>
        <ScrollView
                style={styles.contentContainer}
                showsVerticalScrollIndicator={true}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.setRefreshing}
                  />
                }
              >
           <View style={styles.logoContainer}>
            <Image source={require("./../../assets/logoHome.png")}/>
           </View>

           <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.push("Profile")}> 
                <Image source={require("./../../assets/profile.png")}/>
                </TouchableOpacity>
                <View style={styles.welcome}>
                  <Text  style={styles.text}>Selamat Datang,</Text>
                  <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>{this.state.namaUser}</Text>
                </View>
                <Icon name={'ios-notifications-outline'} size={24} color={'#fff'} />
           </View>
           

           <View style={styles.CardSaldo}>

                <View style={styles.contentSaldo}>
                <Text style={styles.text}>Saldo Emas</Text>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>{this.currencyFormat(this.state.saldoUang)}</Text>
                <Text style={styles.text}>{this.state.userSaldo} Gram</Text>
                </View>
              
           </View>

           <View style={styles.CardHarga}>
              {/* <View style={styles.contentHarga}> */}
              <View style={{flexDirection:'row'}}>

                  <View style={styles.contentHargaSub}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.textHarga}>Harga beli</Text>
                          <View style={styles.iconPersen}>
                                <Icon name={this.state.iconBeli} size={11} color={this.state.warnaBeli} />
                                <Text style={{fontSize:9,color:`${this.state.warnaBeli}`}}>{Number((this.state.beliPersen).toFixed(2))}%</Text>
                          </View>
                    </View>
                    <View>
                      <Text style={styles.text}>{this.currencyFormat(this.state.hargaBeliToday)}</Text>
                    </View>
                  </View>

                  <View style={styles.contentHargaSub}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.textHarga}>Harga Jual</Text>
                        <View style={styles.iconPersen}>
                              <Icon name={this.state.iconJual} size={11} color={this.state.warnaJual} />
                              <Text style={{fontSize:9,color:`${this.state.warnaJual}`}}>{Number((this.state.jualPersen).toFixed(2))}%</Text>
                        </View>
                    </View>
                    <View>
                      <Text style={styles.text}>{this.currencyFormat(this.state.hargaJualToday)}</Text>
                    </View>
                  </View>

              </View>


                <View style={styles.grafik}>
                  <TouchableOpacity style={styles.containerGrafik} onPress={() => navigation.navigate("Grafik") }> 
                            <Icon name={'analytics-sharp'} size={26} color={'#2EAEBF'} />
                            <Text style={{fontSize:12,color:'#2EAEBF',fontWeight:'bold'}}> Lihat Grafik</Text>
                    </TouchableOpacity>
                </View>

         </View>

         <View style={styles.cardTransaction}>
       
              
              <TouchableOpacity style={styles.cardTransactionContentBeli} onPress={() => navigation.navigate('beliEmas',{hargaBeliToday:this.state.hargaBeliToday,token:this.state.token,userid:this.state.userid}) }>
                    <Icon name={'trending-up-sharp'} size={54} color={'#fff'} />
                    <Text style={styles.text}>Beli</Text>
              </TouchableOpacity>
             
              {/* <TouchableOpacity style={styles.cardTransactionContentJual}>
                    <Icon name={'trending-down-sharp'} size={54} color={'#fff'} onPress={() => navigation.navigate('jualEmas',{hargaJualToday:this.state.hargaJualToday,token:this.state.token,userid:this.state.userid,saldoUang:this.state.saldoUang,userSaldo:this.state.userSaldo}) } />
                    <Text style={styles.text}>Jual</Text>
              </TouchableOpacity> */}
             
              <TouchableOpacity style={styles.cardTransactionContentTransfer} onPress={() => navigation.navigate('jualEmas',{hargaJualToday:this.state.hargaJualToday,token:this.state.token,userid:this.state.userid,saldoUang:this.state.saldoUang,userSaldo:this.state.userSaldo}) } >
                    <Icon name={'ios-arrow-up-sharp'} size={54} color={'#fff'} />
                    <Text style={styles.text}>Jual</Text>
              </TouchableOpacity>
           
         </View>

        <View style={styles.cardTransaction}> 
            <Text style={styles.text}>Transaksi Terkini</Text>
            <Text>Hari ini</Text>
        </View>
               

 
               

            <StatusBar barStyle="light-content"/>
       </ScrollView>
        </SafeAreaView>  
      </View>
      
    )
   
    }

}


  export default login




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
      flexDirection: 'column',
      
    },
    header: {
      flexDirection: 'row',
      alignItems:'center',
      marginHorizontal: 20,
      marginVertical: 32,

    },  
    welcome: {
      flex:1,
      paddingHorizontal:16,
    },
    CardSaldo:{
      width : WIDTH - 50,
      marginLeft:20,
      borderRadius: 20, 
      zIndex:999,
      backgroundColor:'#6c62cc',
    },
    contentSaldo:{
      padding:30,
    },
    CardHarga:{
      width : WIDTH - 50,
      marginTop:-20,
      paddingTop:10,
      borderTopRightRadius:0,
      borderTopLeftRadius:0,
      marginLeft:20,
      borderRadius: 20, 
      backgroundColor:'#2EAEBF',
     
    },
    contentHarga:{
      flexDirection:'row',
    },
    contentHargaSub:{
        padding:30,
        paddingHorizontal:25,
        // flexDirection:'row',
    },
    contentHargaSubBawah:{
      width:(WIDTH/2.3),
      paddingHorizontal:37,
      marginTop:-20,
      paddingBottom: 25,
      flexDirection:'row',
  },
  grafik:{
      alignSelf:'center',
      paddingBottom:20,
  },  
    cardTransaction:{
      width : WIDTH - 55,
      margin:20,
      justifyContent:'space-around',
      paddingVertical:10,
      flexDirection: 'row',
      backgroundColor: '#252835',
      borderRadius: 10,
      
    },
    cardTransactionContentBeli:{
      padding:10,
      paddingHorizontal:40,
      backgroundColor: '#2daf7e',
      borderRadius: 10,
      borderTopRightRadius:0,
      borderBottomRightRadius:0,
      alignItems:'center',
    },
    // cardTransactionContentJual:{
    //   padding:10,
    //   paddingHorizontal:20,
    //   backgroundColor: '#2EAEBF',
    //   alignItems:'center',
    // },
    cardTransactionContentTransfer:{
      padding:10,
      paddingHorizontal:40,
      backgroundColor: '#2EAEBF',
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
      borderRadius: 10,
      alignItems:'center',
    },
    logoContainer : {
      flexDirection: 'row',
      alignContent:'center',
      justifyContent:'center',
      marginTop: 20,
    
    },
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 5 ,
    //  fontFamily: 'Roboto-Bold',
      textAlign: 'left'
    },

    text: {
      color: '#fff',
      fontSize : 16,
    },
    textHarga:{
      color: '#fff',
      fontSize : 14,
    },
    containerGrafik:{
      flexDirection:'row',
      backgroundColor:'#fff',
      borderRadius:15,
      paddingHorizontal:20,
      paddingVertical:5,
      alignItems:'center',
    },
    iconPersen:{
      flexDirection:'row',
      backgroundColor:'#fff',
      borderRadius:10,
      paddingHorizontal:5,
      marginLeft:5,
      alignSelf:'center'
    }
 
  });
  
;




  
