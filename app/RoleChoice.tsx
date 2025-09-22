// pages/RoleChoice.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RoleChoice({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisis ton rôle</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.replace("Home")} // redirige vers ton Drawer (index.tsx/Home)
      >
        <Ionicons name="person-outline" size={28} color="#007bff" />
        <Text style={styles.optionText}>Client</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("InscriptionLivreur")} // ton écran Livreur
      >
        <Ionicons name="bicycle-outline" size={28} color="green" />
        <Text style={styles.optionText}>Livreur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("InscriptionFournisseur")} //ton écran Fournisseur
      >
        <Ionicons name="storefront-outline" size={28} color="orange" />
        <Text style={styles.optionText}>Fournisseur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginVertical: 10,
    width: "80%",
    borderRadius: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
    color: "#333",
  },
});
