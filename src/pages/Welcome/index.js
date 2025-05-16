import { Text, StyleSheet, View, TouchableOpacity,Alert } from 'react-native'
import React, { Component } from 'react'
import { InputData } from '../../components'
import { ref, push, child } from 'firebase/database';
import FIREBASE from '../../config/FIREBASE';

export default class Welcome extends Component {
  //rconst for construcktor
  constructor(props) {
    super(props)
  
    this.state = {
      id: '',
      password: '',
    };
  }

  onChangeText = (namaState, value)=>{
    this.setState({
      [namaState]:value
    })
  }
  onSubmit = async () => {
    if (this.state.id && this.state.password) {
      const LoginReferensi = ref(FIREBASE.database, 'Login');  // Menggunakan ref dari database Firebase
    
      const Login = {
       id : this.state.id,
       password : this.state.password
    }
  
      push(LoginReferensi, Login)
        .then((data) => {
          Alert.alert('Sukses', 'Login Tersimpan');
          this.props.navigation.replace('DaftarLogin');
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    } else {
      Alert.alert('Error', 'Semua field wajib diisi');
    }
  };
  
  render() {
    return (
      <View style={styles.pages}>
       <InputData 
       label="ID Login" 
       placeholder="Masukkan id Login"
       onChangeText={this.onChangeText}
       value={this.state.id}
       namaState="id"
       />
       <InputData 
       label="Password" 
       placeholder="Masukkan password"
       onChangeText={this.onChangeText}
       value={this.state.password}
       namaState="password"
       />
      
       <TouchableOpacity style={styles.tombol} onPress={()=>this.onSubmit()}>
        <Text style={styles.textTombol}>SUBMIT</Text>
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  pages:{
    flex: 1,
    padding: 30
  },
  tombol:{
    backgroundColor:'black',
    padding:10,
    borderRadius:5,
    marginTop:10
  },
  textTombol:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center'
  }

})