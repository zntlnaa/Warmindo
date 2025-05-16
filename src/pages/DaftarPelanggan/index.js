import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE'
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { CardPelanggan } from '../../components'

export default class DaftarPelanggan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelanggans: {},
      pelanggansKey: [],
    };
  }

  componentDidMount() {
    const pelanggansRef = ref(FIREBASE.database, 'Pelanggan');

    onValue(pelanggansRef, (snapshot) => {
      const data = snapshot.val() || {};
      const pelanggansKey = Object.keys(data);

      this.setState({
        pelanggans: data,
        pelanggansKey: pelanggansKey,
      });
    });
  }

  removeData = (id) => {
    Alert.alert(
      "Info",
      "Anda yakin akan menghapus data ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const pelanggansRef = ref(FIREBASE.database, 'Pelanggan/' + id);
            remove(pelanggansRef);
            Alert.alert('Hapus', 'Sukses Hapus Data')
          }},
      ],
      { cancelable: false }
    );
  };

  render() {
    // console.log('pelanggans : ', this.state.pelanggans);
    // console.log('pelanggansKey: ', this.state.pelanggansKey);
    const{ pelanggans, pelanggansKey }=this.state
     return (
      <View style={styles.page}>
    
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Pelanggan</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.listPelanggan}>
          {pelanggansKey.length > 0 ? (
            pelanggansKey.map((key) => (
              <CardPelanggan key={key} pelangganItem = {pelanggans[key]} id={key} 
              {...this.props} removeData={this.removeData}/>            
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>
      
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah} 
            onPress={()=> this.props.navigation.navigate('TambahPelanggan')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header:{
    paddingHorizontal:30,
    paddingTop:30
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  garis:{
    borderWidth:1,
    marginTop: 10
  },
  listPelanggan :{
    paddingHorizontal : 30 ,
    marginTop:20
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
