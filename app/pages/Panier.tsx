import React, { useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { BASE_IMG_URL } from "../utils/URL";

export default function Panier() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container}>

      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Text>Ton panier est vide...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.image_file && (
                  <Image
                    source={{ uri: `${BASE_IMG_URL}/image/${item.image_file}` }}
                    style={styles.image}
                  />
                )}
                <View style={styles.info}>
                  <Text style={styles.name}>{item.design}</Text>
                  <Text style={styles.price}>{item.prix} Ar</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>

              </View>
            )}
          />

          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={styles.clearText}>Vider le panier</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green" },
  clearBtn: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: { color: "#fff", fontWeight: "bold" },
});
