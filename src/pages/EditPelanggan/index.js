import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import { InputData } from '../../components';
import { ref, update, onValue } from 'firebase/database';
import FIREBASE from '../../config/FIREBASE';
import SelectDropdown from 'react-native-select-dropdown';

export default class EditPelanggan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idpelanggan: '',
      namapelanggan: '',
      tanggaldaftar: '',
      waktudaftar: '',
      poin: '',
      status: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;

    const pelanggansRef = ref(FIREBASE.database, 'Pelanggan/' + id);

    onValue(pelanggansRef, (snapshot) => {
      const data = snapshot.val() || {};
      const pelanggansItem = { ...data };

      this.setState({
        idpelanggan: pelanggansItem.idpelanggan,
        namapelanggan: pelanggansItem.namapelanggan,
        tanggaldaftar: pelanggansItem.tanggaldaftar,
        waktudaftar: pelanggansItem.waktudaftar,
        poin: pelanggansItem.poin,
        status: pelanggansItem.status,
      });
    });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    const { id } = this.props.route.params;
    const { status } = this.state;

    if (
      this.state.idpelanggan &&
      this.state.namapelanggan &&
      this.state.tanggaldaftar &&
      this.state.waktudaftar &&
      status !== ''
    ) {
      const pelangganReferensi = ref(FIREBASE.database, 'Pelanggan/' + id);

      const pelanggan = {
        idpelanggan: this.state.idpelanggan,
        namapelanggan: this.state.namapelanggan,
        tanggaldaftar: this.state.tanggaldaftar,
        waktudaftar: this.state.waktudaftar,
        poin: this.state.poin,
        status: status,
      };

      console.log('Pelanggan yang akan diupdate:', pelanggan);

      update(pelangganReferensi, pelanggan)
        .then((data) => {
          Alert.alert('Sukses', 'Pelanggan Tersimpan');
          this.props.navigation.replace('DaftarPelanggan');
        })
        .catch((error) => {
          console.log('Error saat update:', error);
        });
    } else {
      Alert.alert('Error', 'Semua field wajib diisi');
    }
  };

  render() {
    const statusOptions = ['Aktif', 'Tidak Aktif'];

    return (
      <View style={styles.pages}>
        <InputData
          label="Nama Pelanggan"
          placeholder="Masukkan nama pelanggan"
          onChangeText={this.onChangeText}
          value={this.state.namapelanggan}
          namaState="namapelanggan"
        />
        <InputData
          label="Poin"
          placeholder="Masukkan poin"
          onChangeText={this.onChangeText}
          value={this.state.poin.toString()}
          namaState="poin"
        />
        <Text style={styles.label}>Status</Text>
        <SelectDropdown
          data={statusOptions}
          onSelect={(selectedItem, index) => {
            this.onChangeText('status', selectedItem === 'Aktif' ? '1' : '0');
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultValue={this.state.status === '1' ? 'Aktif' : 'Tidak Aktif'}
          buttonStyle={styles.dropdownButton}
          defaultButtonText={this.state.status === '1' ? 'Aktif' : 'Tidak Aktif'}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownIconPosition="right"
        />

        <TouchableOpacity style={styles.tombol} onPress={this.onSubmit}>
          <Text style={styles.textTombol}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombol: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  dropdownButtonText: {
    textAlign: 'flex-start',
  },
});
