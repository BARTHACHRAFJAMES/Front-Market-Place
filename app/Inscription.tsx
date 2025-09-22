import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
  } from "react-native";
import { useNavigation, useFocusEffect, Link } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Inscription(props: any) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
       {/* === HEADER === */}
       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Nir'Shop</Text>
              <View style={styles.comCircle}>
                <Text style={styles.comText}>com</Text>
              </View>
            </View>
       </View>
       <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
       <View style={styles.section}>
          <Text style={styles.title}>Je vais m'inscrire en tant que</Text>
        
            {/* Client */}
            <TouchableOpacity
              style={[styles.optionButton, styles.clientBtn]}
              onPress={() => props.navigation.navigate("InscriptionClient")}
            >
              <Ionicons name="person-circle-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.optionTextWhite}>Client</Text>
            </TouchableOpacity>
            
            {/* Livreur */}
            <TouchableOpacity
              style={[styles.optionButton, styles.livreurBtn]}
              onPress={() => props.navigation.navigate("InscriptionLivreur")}
            >
              <Ionicons name="bicycle-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.optionTextWhite}>Livreur</Text>
            </TouchableOpacity>
            
            {/* Fournisseur */}
            <TouchableOpacity
              style={[styles.optionButton, styles.fournisseurBtn]}
              onPress={() => props.navigation.navigate("InscriptionFournisseur")}
            >
              <Ionicons name="storefront-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.optionTextWhite}>Fournisseur</Text>
            </TouchableOpacity>
            
            {/* Editeur */}
            <TouchableOpacity
              style={[styles.optionButton, styles.editeurBtn]}
              onPress={() => props.navigation.navigate("InscriptionEditeur")}
            >
              <Ionicons name="create-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.optionTextWhite}>Éditeur</Text>
            </TouchableOpacity>

          
        </View>
        <View style={styles.PluTot}>
           <TouchableOpacity
              style={styles.optionButtonConn}
              
            >
              <Ionicons
                name="log-in-outline"
                size={24}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.optionTextConn} onPress={() => props.navigation.navigate("Login")}>Se connecter plutôt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#333" },
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
  section: {
    flexDirection: "column", // empiler en colonne
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  
  clientBtn: {
    backgroundColor: "#007bff", // Bleu
  },
  
  livreurBtn: {
    backgroundColor: "#28a745", // Vert
  },
  
  fournisseurBtn: {
    backgroundColor: "#ffc107", // Jaune
  },
  
  editeurBtn: {
    backgroundColor: "#dc3545", // Rouge
  },
  
  optionTextWhite: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  
  PluTot:{
    padding: 20,
    flexDirection: "column",
  },
  optionButtonConn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#007bff",
  },
  optionTextConn:{
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  optionButtonAcceuil:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00CCFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#00CCFFFF",
  }
})
