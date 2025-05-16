// Import necessary modules and components
import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import { InputData } from '../../components';
import { ref, get } from 'firebase/database'; // Updated import statements
import FIREBASE from '../../config/FIREBASE';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: '',
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = async () => {
    if (this.state.id && this.state.password) {
      const loginRef = ref(FIREBASE.database, 'Login');

      get(loginRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userArray = Object.values(userData);
            
            // Filter the array to find the matching user
            const matchedUser = userArray.find(user => user.id === this.state.id);

            if (matchedUser && matchedUser.password === this.state.password) {
              Alert.alert('Success', 'Login Successful');
              this.props.navigation.replace('Dashboard');
            } else {
              Alert.alert('Error', 'Invalid ID or Password');
            }
          } else {
            Alert.alert('Error', 'User not found');
          }
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    } else {
      Alert.alert('Error', 'All fields are mandatory');
    }
  };

  render() {
    return (

      <View style={styles.pages}>
      <Text
				style={{
					fontSize: 42,
					fontWeight: "bold",
					color: "#3c444c",
					marginTop: 14,
					marginBottom: 10,
				}}
			>
				Warmindo
			</Text>

      <Image
				source={require("./warmindoo.png")}
				style={{ margin: 0, width: '100%', height: '50%'}}
			/>
        <InputData
          // label="Username"
          placeholder="Enter Username"
          onChangeText={this.onChangeText}
          value={this.state.id}
          namaState="id"
          style={{ marginTop: 0, marginBottom: 0, width: '100%', height: '40%'}}
          
        />
        <InputData
          // label="Password"
          placeholder="Enter password"
          onChangeText={this.onChangeText}
          value={this.state.password}
          namaState="password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    // alignItems: "center"

  },



  tombol: {
    backgroundColor: "#f96163",
		borderRadius: 18,
		paddingVertical: 18,
		width: "100%",
    marginTop:30,
		margin: "auto",
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
