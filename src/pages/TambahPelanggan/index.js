import { Text, StyleSheet, View, TouchableOpacity,Alert } from 'react-native'
import React, { Component } from 'react'
import { InputData } from '../../components'
import { ref, push, child } from 'firebase/database';
import FIREBASE from '../../config/FIREBASE';

export default class TambahPelanggan extends Component {
  //rconst for construcktor
  constructor(props) {
    super(props)
  
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    const currentTimeString = currentDate.toISOString().split('T')[1].substring(0, 5);

    this.state = {
      idpelanggan: '',
      namapelanggan: '',
      tanggaldaftar: currentDateString,
      waktudaftar: currentTimeString,
      poin: 0,
      status: 1,
    };
  }

  onChangeText = (namaState, value)=>{
    this.setState({
      [namaState]:value
    })
  }
  onSubmit = async () => {
    if (this.state.idpelanggan && this.state.namapelanggan && this.state.tanggaldaftar && this.state.waktudaftar && this.state.status) {
      const pelangganReferensi = ref(FIREBASE.database, 'Pelanggan');  // Menggunakan ref dari database Firebase
    
      const pelanggan = {
       idpelanggan : this.state.idpelanggan,
       namapelanggan: this.state.namapelanggan,
       tanggaldaftar:this.state.tanggaldaftar,
       waktudaftar: this.state.waktudaftar,
       poin: this.state.poin,
       status : this.state.status
    }
  
      push(pelangganReferensi, pelanggan)
        .then((data) => {
          Alert.alert('Sukses', 'pelanggan Tersimpan');
          this.props.navigation.replace('DaftarPelanggan');
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    } else {
      Alert.alert('Error', 'Semua field wajib diisi');
    }
  };
  
  render() {
    const statusPelanggan = this.state.status === 1 ? 'Aktif' : '';
    return (
      <View style={styles.pages}>
       <InputData 
       label="ID Pelanggan" 
       placeholder="Masukkan id pelanggan"
       onChangeText={this.onChangeText}
       value={this.state.idpelanggan}
       namaState="idpelanggan"
       />
       <InputData 
       label="Nama Pelanggan" 
       placeholder="Masukkan nama pelanggan"
       onChangeText={this.onChangeText}
       value={this.state.namapelanggan}
       namaState="namapelanggan"
       />
       <InputData 
       label="Status" 
       onChangeText={this.onChangeText}
       value={statusPelanggan}
       namaState="status"
       />
       <InputData 
       label="Tanggal Daftar" 
       onChangeText={this.onChangeText}
       value={this.state.tanggaldaftar}
       namaState="tanggaldaftar"
       />
       <InputData 
       label="Waktu Daftar" 
       onChangeText={this.onChangeText}
       value={this.state.waktudaftar}
       namaState="waktudaftar"
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