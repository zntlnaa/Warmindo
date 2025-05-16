import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE'
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { CardPelanggan } from '../../components'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelanggans: {},
      pelanggansKey: [],
    };
  }

  componentDidMount() {
    
  };

  render() {
    // console.log('pelanggans : ', this.state.pelanggans);
    // console.log('pelanggansKey: ', this.state.pelanggansKey);
    const{ pelanggans, pelanggansKey }=this.state
     return (
      <View style={styles.page}>
        <Text
				style={{
					fontSize: 42,
					fontWeight: "bold",
					color: "#3c444c",
					marginTop: 14,
					marginBottom: 10,
          paddingLeft:20
				}}
			>
				Dashboard
			</Text>
    
        {/* <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <View style={styles.garis} />
        </View>
       */}
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah} 
            onPress={()=> this.props.navigation.navigate('DaftarPelanggan')}>
            <Text style={styles.title}>Daftar Pelanggan</Text>
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
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    margin:10,
    color: 'white'
  },
  btnTambah: {
    backgroundColor: '#f96163',
    shadowColor: '#000',
    borderRadius:5,
    marginLeft:20,
    marginRight:20,
    marginTop:20
  },
});
