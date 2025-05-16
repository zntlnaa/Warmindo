import { StyleSheet, Text, TouchableOpacity, View , Pressable} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const CardPelanggan = ({id, pelangganItem, navigation, removeData }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("DetailPelanggan", { id: id })}
    > 
       <View>
            <Text style={styles.idpelanggan}>{pelangganItem.idpelanggan}</Text>   
            <Text style={styles.namapelanggan}>{pelangganItem.namapelanggan}</Text>     
        </View>
        <View style={styles.icon}>
            <Pressable onPress={() => navigation.navigate("EditPelanggan", { id: id })}>
                <FontAwesomeIcon icon={faEdit} color={"orange"} size={25} />
            </Pressable>
            <Pressable onPress={() => removeData(id)}>
                <FontAwesomeIcon icon={faTimes} color={"red"} size={25} />
            </Pressable>
      </View>
    </TouchableOpacity>
  )
}

export default CardPelanggan

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 15,
      backgroundColor: "white",
      borderRadius: 5,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    idpelanggan: {
      fontWeight: "bold",
      fontSize: 16,
    },
    namapelanggan: {
      fontSize: 12,
      color: "gray",
    },
    icon: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center", 
      gap: 22
    },
  });