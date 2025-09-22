import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

export default function Header({ navigation }: { navigation: any }) {
  return (
    <View style={styles.header}>
      {/* Bouton Menu → ouvre le Drawer */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu-outline" size={28} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Nir'Shop</Text>
        <View style={styles.comCircle}>
          <Text style={styles.comText}>com</Text>
        </View>
      </View>

      {/* Icônes de droite */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          <View style={styles.nbInCart}>
            <Text style={styles.nbText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginRight: 4,
  },
  comCircle: {
    backgroundColor: "#007bff",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  comText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 12,
    position: "relative",
  },
  nbInCart: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: '#007bff',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nbText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
