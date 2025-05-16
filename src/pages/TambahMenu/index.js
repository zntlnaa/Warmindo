import { Text, StyleSheet, View, TouchableOpacity,Alert } from 'react-native'
import React, { Component } from 'react'
import { InputData } from '../../components'
import { ref, push } from 'firebase/database';
import FIREBASE from '../../config/FIREBASE';

export default class TambahMenu extends Component {
  //rconst for construcktor
  constructor(props) {
    super(props)
  
    this.state = {
       nama: '',
       nomorHP:'',
       alamat:'',
    }
  }

  onChangeText = (namaState, value)=>{
    this.setState({
      [namaState]:value
    })
  }
  onSubmit = () => {
    if (this.state.nama && this.state.nomorHP && this.state.alamat) {
      const kontakReferensi = ref(FIREBASE.database, 'Kontak');  // Menggunakan ref dari database Firebase
  
      const kontak = {
        nama: this.state.nama,
        nomorHP: this.state.nomorHP,
        alamat: this.state.alamat
      }
  
      push(kontakReferensi, kontak)
        .then((data) => {
          Alert.alert('Sukses', 'Kontak Tersimpan');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    } else {
      Alert.alert('Error', 'Nama, NomorHP, dan Alamat wajib diisi');
    }
  };

  render() {
    return (
      <View style={styles.pages}>
       <InputData 
       label="Nama" 
       placeholder="Masukkan nama"
       onChangeText={this.onChangeText}
       value={this.state.nama}
       namaState="nama"
       />
       <InputData 
       label="No.Hp" 
       placeholder="Masukkan nomor hp" 
       keyboardType="number-pad"
       onChangeText={this.onChangeText}
       value={this.state.nomorHP}
       namaState="nomorHP"
       />
       <InputData 
       label="Alamat" 
       placeholder="Masukkan alamat" 
       isTextArea={true}
       onChangeText={this.onChangeText}
       value={this.state.alamat}
       namaState="alamat"
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