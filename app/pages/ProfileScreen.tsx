import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { eventBus } from "../eventBus";

export default function ProfileScreen() {
  const [client, setClient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const navigation = useNavigation();

  // Recharge client à chaque fois que l’écran est focus
  useFocusEffect(
    useCallback(() => {
      const loadClient = async () => {
        const savedClient = await AsyncStorage.getItem("client");
        if (savedClient) {
          setClient(JSON.parse(savedClient));
        } else {
          setClient(null);
        }
      };
      loadClient();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("client");
    setClient(null);

    // Notifier le drawer
    eventBus.emit("logout");
    navigation.navigate("Acceuil" as never);
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* === HEADER === */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Mon Profil</Text>

        <TouchableOpacity onPress={() => setShowModalEdit(true)}>
          <Ionicons name="create-outline" size={26} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* === AVATAR === */}
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#007bff" />
        {client && (
          <Text style={styles.clientName}>
            {client?.prenom}
          </Text>
        )}
      </View>

      {/* === INFOS PROFIL === */}
      {client ? (
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="person-circle-outline" size={20} color="#555" />
            <Text style={styles.value}>
              {client?.nom } {client.prenom}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <Text style={styles.value}>{client?.email}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#555" />
            <Text style={styles.value}>
              {client?.adresse ? client.adresse : "Non renseignée"}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noClient}>Aucun client connecté</Text>
      )}

      {/* === BOUTONS ACTIONS === */}
      {client && (
        <View style={styles.conBtn}>
          {/* Bouton changer mot de passe */}
          <TouchableOpacity
            style={[styles.Btn, { backgroundColor: "#007bff", marginBottom: 15 }]}
            onPress={() => setShowModalPassword(true)}
          >
            <Ionicons name="key-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>Changer mot de passe</Text>
          </TouchableOpacity>

          {/* Bouton logout */}
          <TouchableOpacity style={styles.Btn} onPress={() => setShowModal(true)}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>Se Déconnecter</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* === MODAL CONFIRMATION LOGOUT === */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name="alert-circle-outline"
              size={50}
              color="#f44336"
              style={{ textAlign: "center" }}
            />
            <Text style={styles.modalTitle}>
              Voulez-vous vraiment vous déconnecter ?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setShowModal(false)}
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

      {/* === MODAL EDIT PROFILE === */}
      <Modal transparent visible={showModalEdit} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Modification de profil</Text>
            <View style={styles.input_group}>
              <Ionicons name="person-outline" size={22} color="#000" />
              <TextInput
                placeholder="Nom"
                style={styles.input}
                value={client?.nom || ""}
              />
            </View>
            <View style={styles.input_group}>
              <Ionicons name="person-outline" size={22} color="#000" />
              <TextInput
                placeholder="Prénom"
                style={styles.input}
                value={client?.prenom || ""}
              />
            </View>
            <View style={styles.input_group}>
              <Ionicons name="location-outline" size={22} color="#000" />
              <TextInput
                placeholder="Adresse"
                style={styles.input}
                value={client?.adresse || ""}
              />
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Enrégistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModalEdit(false)}>
              <Text style={{ textAlign: "center", color: "red" }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* === MODAL CHANGER MOT DE PASSE === */}
      <Modal transparent visible={showModalPassword} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Changer mot de passe</Text>
            <View style={styles.input_group}>
              <Ionicons name="lock-closed-outline" size={22} color="#000" />
              <TextInput placeholder="Ancien mot de passe" style={styles.input} secureTextEntry />
            </View>
            <View style={styles.input_group}>
              <Ionicons name="lock-closed-outline" size={22} color="#000" />
              <TextInput placeholder="Nouveau mot de passe" style={styles.input} secureTextEntry />
            </View>
            <View style={styles.input_group}>
              <Ionicons name="lock-closed-outline" size={22} color="#000" />
              <TextInput placeholder="Confirmer mot de passe" style={styles.input} secureTextEntry />
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModalPassword(false)}>
              <Text style={{ textAlign: "center", color: "red" }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#333" },

  // AVATAR
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  clientName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },

  // CARD PROFIL
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },

  // NO CLIENT
  noClient: { color: "red", textAlign: "center", marginTop: 30 },

  // BOUTONS
  conBtn: { marginTop: 30, alignItems: "center" },
  Btn: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
    width: 300,
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", marginLeft: 8, fontSize: 16, },

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
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 5 },
  modalBtnText: { color: "#fff", fontWeight: "600", textAlign: "center" },

  // ===== MODAL EDIT/MDP =====
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
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
});
