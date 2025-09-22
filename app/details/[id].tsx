import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, BASE_IMG_URL } from "../utils/URL"; 
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { cartMessage, setCartMessage, addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  // Effet pour cacher le message après 5s
  useEffect(() => {
    if (cartMessage) {
      const timer = setTimeout(() => {
        setCartMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}/produits/${id}`);
      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
      const data = await res.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
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

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Produit introuvable</Text>
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

      {/* CONTENU */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {product.image_file && (
          <Image
            source={{ uri: `${BASE_IMG_URL}/image/${product.image_file}` }}
            style={styles.image}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{product.design}</Text>
          <Text style={styles.price}>Prix : {product.prix} Ar</Text>
          <Text style={styles.description}>
            {product.description || "Pas de description disponible."}
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        {/* Bouton Favori */}
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color={isFavorite ? "red" : "#333"}
          />
        </TouchableOpacity>

        {/* Bouton Ajouter au panier */}
        <TouchableOpacity
          onPress={() => addToCart(product)}
          style={styles.cartButton}
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.cartText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>

      {/* MESSAGE CART */}
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
    </SafeAreaView>
  );
}

// ================== STYLES ==================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoContainer: { flexDirection: "row", alignItems: "center", padding: 15 },
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
  scroll: { padding: 16, paddingBottom: 100 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250, borderRadius: 8, marginBottom: 20 },
  content: { paddingHorizontal: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 18, color: "green", marginBottom: 15 },
  description: { fontSize: 15, color: "#444", lineHeight: 22, textAlign: "justify" },

  // FOOTER
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  favButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },

  // MESSAGE
  messageBox: {
    position: "absolute",
    bottom: 80,
    left: "10%",
    right: "10%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
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
