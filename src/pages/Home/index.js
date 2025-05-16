import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE'
import { getDatabase, ref, onValue } from 'firebase/database';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
      menusKey: [],
    };
  }

  componentDidMount() {
    const menusRef = ref(FIREBASE.database, 'Kontak');

    onValue(menusRef, (snapshot) => {
      const data = snapshot.val() || {};
      const menusKey = Object.keys(data);

      this.setState({
        menus: data,
        menusKey: menusKey,
      });
    });
  }

  render() {
    // console.log('menus : ', this.state.menus);
    // console.log('menusKey: ', this.state.menusKey);
    const{ menus, menusKey }=this.state
     return (
      <View style={styles.page}>
    
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Menu</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.listBuku}>
          {menusKey.length > 0 ? (
            menusKey.map((key) => (
              <Text key={key}>{menus[key].nama}</Text>            
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>
      
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah} 
            onPress={()=> this.props.navigation.navigate('TambahMenu')}>
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
  listBuku :{
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
