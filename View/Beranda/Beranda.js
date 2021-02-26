import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');

class login extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false
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
              >
           <View style={styles.logoContainer}>
            <Image source={require("./../../assets/logoHome.png")}/>
           </View>

           <View style={styles.header}>
                <Image source={require("./../../assets/profile.png")}/>
                <View style={styles.welcome}>
                  <Text  style={styles.text}>Selamat Datang</Text>
                  <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Jenny Wilson</Text>
                </View>
                <Icon name={'ios-notifications-outline'} size={24} color={'#fff'} />
           </View>
           

           <View style={styles.CardSaldo}>

                <View style={styles.contentSaldo}>
                <Text style={styles.text}>Saldo Emas</Text>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Rp. 3.380.000</Text>
                <Text style={styles.text}>3,9 Gram</Text>
                </View>
              
           </View>

           <View style={styles.CardHarga}>
                  <View style={styles.contentHarga}>
         
              <View style={styles.contentHargaSub}>
                 <Text style={styles.textHarga}>Harga beli</Text>
                    <View style={styles.iconPersen}>
                          <Icon name={'ios-caret-up'} size={11} color={'#2DAF7E'} />
                          <Text style={{fontSize:9,color:'#2DAF7E'}}>0.25%</Text>
                    </View>
                 
              </View>
            
              <View style={styles.contentHargaSub}>
                 <Text style={styles.textHarga}>Harga Jual</Text>
                    <View style={styles.iconPersen}>
                          <Icon name={'ios-caret-down'} size={11} color={'#E14C4C'} />
                          <Text style={{fontSize:9,color:'#E14C4C'}}>0.25%</Text>
                    </View>
              </View>
                 </View>

                <View style={styles.contentHarga}>
                   <View style={styles.contentHargaSubBawah}>
                    <Text style={styles.text}>Rp. 840.000/gr</Text>
                  </View>
                  <View style={styles.contentHargaSubBawah}>
                    <Text style={styles.text}>Rp. 740.000/gr</Text>
                  </View>
                </View>
                
                <View style={styles.grafik}>
                  <TouchableOpacity style={styles.containerGrafik} onPress={() => navigation.navigate('Grafik') }> 
                            <Icon name={'analytics-sharp'} size={26} color={'#2EAEBF'} />
                            <Text style={{fontSize:12,color:'#2EAEBF',fontWeight:'bold'}}>Lihat Grafik</Text>
                    </TouchableOpacity>
                </View>

         </View>

         <View style={styles.cardTransaction}>
       
              
              <TouchableOpacity style={styles.cardTransactionContentBeli} onPress={() => navigation.navigate('BeliEmas') }>
                    <Icon name={'trending-up-sharp'} size={54} color={'#fff'} />
                    <Text style={styles.text}>Beli</Text>
              </TouchableOpacity>
             
              <TouchableOpacity style={styles.cardTransactionContentJual}>
                    <Icon name={'trending-down-sharp'} size={54} color={'#fff'} onPress={() => navigation.navigate('JualEmas') } />
                    <Text style={styles.text}>Jual</Text>
              </TouchableOpacity>
             
              <TouchableOpacity style={styles.cardTransactionContentTransfer}>
                    <Icon name={'ios-arrow-up-outline'} size={54} color={'#fff'} />
                    <Text style={styles.text}>Transfer</Text>
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
        flexDirection:'row',
    },
    contentHargaSubBawah:{
      paddingHorizontal:25,
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
      paddingHorizontal:20,
      backgroundColor: '#2daf7e',
      borderRadius: 10,
      borderTopRightRadius:0,
      borderBottomRightRadius:0,
      alignItems:'center',
    },
    cardTransactionContentJual:{
      padding:10,
      paddingHorizontal:20,
      backgroundColor: '#2EAEBF',
      alignItems:'center',
    },
    cardTransactionContentTransfer:{
      padding:10,
      paddingHorizontal:20,
      backgroundColor: '#FD7557',
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




  
