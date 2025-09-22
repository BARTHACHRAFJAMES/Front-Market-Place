import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, BASE_IMG_URL } from "../utils/URL";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";

export default function CategoryDetails() {
  const { cartMessage, setCartMessage, addToCart } = useContext(CartContext);

  const navigation = useNavigation();
  const { idCat } = useLocalSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Auto-hide message après 5s
  useEffect(() => {
    if (cartMessage) {
      const timer = setTimeout(() => setCartMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories/${idCat}`);
      if (!res.ok) throw new Error("Erreur de chargement des produits");

      const data = await res.json();
      setProducts(data.produits || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [idCat]);

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red" }}>Erreur : {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Nir'Shop</Text>
          <View style={styles.comCircle}>
            <Text style={styles.comText}>com</Text>
          </View>
        </View>
      </View>

      {/* MESSAGE GLOBAL */}
      {cartMessage !== "" && (
        <View
          style={[
            styles.messageBox,
            cartMessage.includes("déjà")
              ? styles.messageError
              : styles.messageSuccess,
          ]}
        >
          <Text style={styles.messageText}>{cartMessage}</Text>
        </View>
      )}

      {/* LISTE PRODUITS */}
      <FlatList
        data={products}
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

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Ionicons
                  name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={favorites.includes(item.id) ? "red" : "#333"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addToCart(item)}
                style={styles.cartButton}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.cartText}>Panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  logoText: { fontSize: 20, fontWeight: "bold", color: "#000", marginRight: 5 },
  comCircle: {
    backgroundColor: "#007bff",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  comText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  // Card produit
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  info: { marginBottom: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green", marginTop: 5 },

  // Actions
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cartText: { color: "#fff", marginLeft: 5, fontWeight: "600" },

  // MESSAGE
  messageBox: {
    position: "absolute",
    top: 10,
    left: "10%",
    right: "10%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    zIndex: 1000,
  },
  messageSuccess: {
    backgroundColor: "#28a745",
  },
  messageError: {
    backgroundColor: "#dc3545",
  },
  messageText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
 