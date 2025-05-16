
import React from 'react'
//router dengan stack navigation
import { createStackNavigator } from '@react-navigation/stack'
import {Login, Welcome, Dashboard, DaftarPelanggan, TambahPelanggan, DetailPelanggan,EditPelanggan} from '../pages'

const  Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Login" component={Login} options={{headerShown :false}}/>
      <Stack.Screen name="Welcome" component={Welcome} options={{title: 'Welcome'}}/>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown :false}}/>
      <Stack.Screen name="DaftarPelanggan" component={DaftarPelanggan} options={{headerShown :false}}/>
      <Stack.Screen name="TambahPelanggan" component={TambahPelanggan} options={{ title: 'Tambah Pelanggan'}}/>
      <Stack.Screen name="DetailPelanggan" component={DetailPelanggan} options={{ title: 'Detail Pelanggan'}}/>
      <Stack.Screen name="EditPelanggan" component={EditPelanggan} options={{ title: 'Edit Pelanggan'}} />
    
    </Stack.Navigator>
  )
}

export default Router