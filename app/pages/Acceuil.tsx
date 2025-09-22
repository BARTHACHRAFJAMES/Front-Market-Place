import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Api from "../Api/Api";
import { BASE_URL, BASE_IMG_URL } from "../utils/URL"; // <-- import ici

// ================== PRODUCT CARD ==================
function ProductCard({ id, image, title, price, shop }) {
  return (
    <Link href={`/details/${id}`} asChild>
      <TouchableOpacity style={styles.Card}>
        <Image source={{ uri: image }} style={styles.Img} />
        <Text style={{ fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "green" }}>R {price}</Text>
        <Ionicons name="heart" size={24} />
        {shop && <Text style={{ color: "gray" }}>{shop}</Text>}
      </TouchableOpacity>
    </Link>
  );
}

// ================== CATEGORIES WITH PRODUCTS (API) ==================
function CategoriesWithProducts() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories`);

        console.log("Status API:", res.status); 

        if (!res.ok) {
          throw new Error(`Erreur serveur: ${res.status}`);
        }

        const text = await res.text(); 
        console.log("Réponse API brute:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error("La réponse API n’est pas un JSON valide");
        }

        if (!Array.isArray(data)) {
          throw new Error("Format API inattendu (pas un tableau)");
        }

        setCategories(data);
      } catch (err: any) {
        console.error("Erreur API:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />;

  if (error)
    return (
      <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>
        Erreur: {error}
      </Text>
    );

  if (!categories || categories.length === 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Aucune catégorie trouvée
      </Text>
    );

  return (
    <View style={styles.prodContent}>
      <ScrollView>
        {categories.map((cat) => (
          <View key={cat.id} style={{ marginBottom: 30 }}>
            <Link href={`/categoriesDtetails/${cat.id}`} asChild>
            {cat.image_file ? (
              <Image
                source={{ uri: `${BASE_IMG_URL}/imagePub/${cat.image_file}` }}
                style={styles.banner}
                resizeMode="cover"
              />
            ) : null}
            </Link>

            {/* Titre + bouton voir plus */}
            <View style={styles.top}>
              <Text style={{ fontWeight: "bold" }}>{cat.nom_cat}</Text>
              <Link href={`/categoriesDtetails/${cat.id}`} asChild>
                <TouchableOpacity style={styles.plusBtn}>
                  <Text>Voir plus</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Produits */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.prodScroll}
            >
              {Array.isArray(cat.produits) &&
                cat.produits.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    id={prod.id}
                    image={`${BASE_IMG_URL}/image/${prod.image_file}`}
                    title={prod.design}
                    price={prod.prix}
                  />
                ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ================== STATIC CATEGORIES ==================
const CATEGORIES_DATA = ["Tous", "Soldes", "Nouvautés", "Populaires", "Tendance"];

function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.catContent}
      style={styles.catScroll}
    >
      {CATEGORIES_DATA.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryButton}>
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ================== MAIN SCREEN ==================
export default function Acceuil() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Categories />
        <CategoriesWithProducts />
      </ScrollView>
    </SafeAreaView>
  );
}

// ================== STYLES ==================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  catScroll: {
    maxHeight: 60,
    marginVertical: 8,
  },
  catContent: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  categoryText: {
    fontWeight: "500",
    fontSize: 14,
  },
  prodContent: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  plusBtn: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  Card: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    padding: 8,
    alignItems: "center",
    marginRight: 10,
  },
  Img: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  prodScroll: {
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 120,
    borderRadius: 2,
    marginBottom: 10,
  },
});
