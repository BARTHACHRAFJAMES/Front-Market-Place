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
    ActivityIndicator,
  } from "react-native";
import { useNavigation, useFocusEffect, Link } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BASE_URL, BASE_IMG_URL } from "../utils/URL"; // <-- import ici

export default function Login(props: any) {
  const navigation = useNavigation();


  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState<any>(null); //client connecté

  // Champs form login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Reset form login
  const resetLoginForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setErreur("");
    setMessage("");
  };

   // Connexion Client
   const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setErreur("Email et mot de passe requis");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/clients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErreur(data.message || "Connexion échouée");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("client", JSON.stringify(data.client));
      setClient(data.client);


      resetLoginForm();
      setMessage(data.response);

      props.navigation.navigate("Acceuil" as never);
    } catch (error: any) {
      setErreur(error.message);
    } finally {
      setLoading(false);
    }
  };

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

       <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
          
            <View style={styles.Tete}>
               <Ionicons name='log-in-outline' style={styles.person}/>
               <Text style={styles.title}>Connexion</Text>
            </View>
            <View style={styles.form}>
               <View style={styles.input_group}>
                 <Ionicons name="mail-outline" size={22} color="#000" />
                 <TextInput placeholder="Email" style={styles.input} value={loginEmail} onChangeText={setLoginEmail}/>
               </View>
   
               <View style={styles.input_group}>
                 <Ionicons name="key-outline" size={22} color="#000" />
                 <TextInput
                   placeholder="Mot de passe"
                   style={styles.input}
                   secureTextEntry
                   value={loginPassword}
                   onChangeText={setLoginPassword}
                 />
               </View>

               {erreur ? <Text style={{ color: "red" }}>{erreur}</Text> : null}
               <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                 {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Se Connecter</Text>}
               </TouchableOpacity>
            </View>
            <View style={styles.ContbtnVersConn}>
               <TouchableOpacity onPress={() => props.navigation.navigate("Inscription")} style={styles.btnVersConn}>
                 <Text style={styles.btnTextCon}>Je n'ai pas encore une compte</Text>
               </TouchableOpacity>
            </View>
        </ScrollView> 
    </SafeAreaView>
  )
}

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
   flexDirection: "column",
 },
 Tete: {
   flexDirection: "column",
   textAlign: "center"
 },
 title:{
   fontSize: 24,
   textAlign: "center"
 },
 person: {
   textAlign: "center",
   fontSize: 50,
   color: "#007bff",
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
   marginTop: 10, 
   marginBottom: 10,
   width: 270,
 },
 input: { flex: 1, paddingVertical: 5,marginLeft: 10, paddingHorizontal: 5,},
 form: {
   alignItems: "center",
   
 },
 // Boutons d'auth classique
 btn: {
   backgroundColor: "#007bff",
   padding: 12,
   borderRadius: 8,
   alignItems: "center",
   marginTop: 5,
   width: 270,
 },
 btnText: { color: "#fff", fontWeight: "600" },
 ContbtnVersConn: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
 },
 btnVersConn:{
   width: 270,
   borderColor: "#007bff",
   padding: 12,
   borderRadius: 8,
   alignItems: "center",
   marginTop: 5,
   backgroundColor: "#fff",
   borderWidth: 1,
 },
 btnTextCon: {
   color: "#007bff",
 }
})