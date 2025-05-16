import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import FIREBASE from '../../config/FIREBASE';
import { getDatabase, ref, onValue } from 'firebase/database';

export default class DetailPelanggan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pelanggan: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;

    const pelanggansRef = ref(FIREBASE.database, 'Pelanggan/' + id);

    onValue(pelanggansRef, (snapshot) => {
      const data = snapshot.val() || {};
      const pelanggansItem = { ...data };

      this.setState({
        pelanggan: pelanggansItem,
      });
    });
  }

  render() {
    const { pelanggan } = this.state;
    const statusPelanggan = pelanggan.status === '1' ? 'Aktif' : 'Tidak Aktif';

    return (
      <View style={styles.pages}>
        <Text>ID Pelanggan : </Text>
        <Text style={styles.text}>{pelanggan.idpelanggan}</Text>
        <Text>Nama Pelanggan : </Text>
        <Text style={styles.text}>{pelanggan.namapelanggan}</Text>
        <Text>Tanggal Daftar : </Text>
        <Text style={styles.text}>{pelanggan.tanggaldaftar}</Text>
        <Text>Waktu Daftar : </Text>
        <Text style={styles.text}>{pelanggan.waktudaftar}</Text>
        <Text>Poin : </Text>
        <Text style={styles.text}>{pelanggan.poin}</Text>
        <Text>Status : </Text>
        <Text style={styles.text}>{statusPelanggan}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
