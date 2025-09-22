// CustomDrawer.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect, Link } from "@react-navigation/native";
import { eventBus } from "./eventBus";
import { BASE_URL, BASE_IMG_URL } from "./utils/URL"; // <-- import ici

export default function CustomDrawerContent(props: any) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterClient, setShowRegisterClient] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState<any>(null); // 👤 client connecté
  const navigation = useNavigation();

  const clientConnect = () => {
    const updateClient = async () => {
      const savedClient = await AsyncStorage.getItem("client");
      setClient(savedClient ? JSON.parse(savedClient) : null);
    };
  
    // charger au montage
    updateClient();
  
    // écouter logout
    const onLogout = () => setClient(null);
    eventBus.on("logout", onLogout);


  
    // cleanup
    return () => {
      eventBus.off("logout", onLogout);
    };
  }

  useEffect(() => {
    clientConnect();

    const interval = setInterval(clientConnect, 1000); // Met à jour toutes les une secondes

    return () => clearInterval(interval); // Nettoyage lors du démontage
  }, []);
  


  //Déconnexion
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("client");
    setClient(null);
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Nir'Shop</Text>
          <View style={styles.comCircle}>
            <Text style={styles.comText}>com</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        {client ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "600", marginBottom: 10 }}>
              Bonjour, {client.prenom}
            </Text>
            <TouchableOpacity style={styles.Btn} onPress={() => setShowLogoutModal(true)}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.btnText}>Se Déconnecter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonRow}>
            {/* <Text style={styles.authButton} onPress={() => setShowLogin(true)}>
              Se connecter
            </Text> */}
            <Text style={styles.authButton} onPress={() => props.navigation.navigate("Login")}>
              Se connecter
            </Text>
            {/* <Text style={styles.authButton} onPress={() => setShowRegister(true)}>
              S’inscrire
            </Text> */}
            <Text style={styles.authButton} onPress={() => props.navigation.navigate("Inscription")}>
               M'inscrire
            </Text>
          </View>
        )}
      </View>
      {/* === MODAL CONFIRMATION === */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons 
              name="alert-circle-outline" 
              size={50} 
              color="#f44336" 
              style={{ textAlign: "center" }} 
            />
            <Text style={styles.modalTitle}>Voulez-vous vraiment vous déconnecter ?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalBtnText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "red" }]}
                onPress={handleLogout}
              >
                <Text style={styles.modalBtnText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ===== HEADER LOGO =====
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 5,
    height: 100,
  },
  logoText: { fontSize: 26, fontWeight: "bold", color: "#000", marginRight: 5 },
  comCircle: {
    backgroundColor: "#007bff",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  comText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  // ===== FOOTER =====
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    height: 120,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  authButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 8,
    fontWeight: "600",
  },
  Btn: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", marginLeft: 8, fontSize: 16 },


  // ===== MODAL =====
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 320,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 6,
    alignItems: "center",
  },

  // Champ texte avec icône
  input_group: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: { flex: 1, marginLeft: 10, paddingVertical: 5 },

  // Boutons d'auth classique
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  //btnText: { color: "#fff", fontWeight: "600" },

  // ===== BOUTONS D'INSCRIPTION (Client / Fournisseur / Livreur) =====
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 6,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 10,
  },

  // Fermer
  closeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  closeText: {
    marginLeft: 5,
    color: "red",
    fontWeight: "600",
    fontSize: 14,
  },
  // MODAL
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: { fontSize: 16, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 5 },
  modalBtnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});

