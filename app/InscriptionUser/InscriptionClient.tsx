import React, {useState} from 'react'
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
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { eventBus } from '../eventBus';
import { BASE_URL, BASE_IMG_URL } from "../utils/URL"; // <-- import ici

export default function InscriptionClient(props: any) {
  const navigation = useNavigation();

  // Champs form register client
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirme, setPasswordConfirme] = useState("");

  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState<any>(null); //client connecté


  // Reset form register
  const resetRegisterForm = () => {
    setNom("");
    setPrenom("");
    setAdresse("");
    setEmail("");
    setPassword("");
    setPasswordConfirme("");
    setErreur("");
    setMessage("");
  };

  // Validation mot de passe
  const getPasswordValidationMessage = () => {
    if (password.length === 0) return "";
    if (password.length < 6) {
      return "Minimum 6 caractères";
    }
    return "Mot de passe valide";
  };

  const isPasswordValid = password.length >= 6;


  // Inscription
  const handleRegisterClient = async () => {
    if (!nom || !adresse || !email || !password || !passwordConfirme) {
      setErreur("Tous les champs sont obligatoires.");
      return;
    }

    if (!isPasswordValid) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== passwordConfirme) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);
      setErreur("");
      setMessage("");

      const response = await fetch(`${BASE_URL}/clients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nom,
          prenom,
          adresse,
          email,
          password,
          password_confirmation: passwordConfirme,
        }),
      });

      const data = await response.json();
      console.log("Réponse API:", data);

      if (!response.ok) {
        setErreur(data.message || "Inscription échouée");
        return;
      }

      if (data.token && data.client) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("client", JSON.stringify(data.client));
        resetRegisterForm();
        setMessage("Inscription réussie !");
        props.navigation.navigate("Acceuil" as never);
      } else {
        setErreur("Réponse inattendue du serveur.");
      }
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
            <TouchableOpacity onPress={() => props.navigation.navigate("Inscription")}>
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
       
       <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}
       >
          
            <View style={styles.Tete}>
               <Ionicons name='person-circle-outline' style={styles.person}/>
               <Text style={styles.title}>Inscription de client</Text>
            </View>
            <View style={styles.form}>
               <View style={styles.input_group}>
                 <Ionicons name="person-outline" size={22} color="#000" />
                 <TextInput placeholder="Nom" style={styles.input} value={nom} onChangeText={setNom}/>
               </View>
   
               <View style={styles.input_group}>
                 <Ionicons name="person-outline" size={22} color="#000" />
                 <TextInput placeholder="Prénom" style={styles.input} value={prenom} onChangeText={setPrenom} />
               </View>
   
               <View style={styles.input_group}>
                 <Ionicons name="location-outline" size={22} color="#000" />
                 <TextInput placeholder="Adresse" style={styles.input} value={adresse} onChangeText={setAdresse} />
               </View>
   
               <View style={styles.input_group}>
                 <Ionicons name="mail-outline" size={22} color="#000" />
                 <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
               </View>
   
                {/* Password */}
                <View style={styles.input_group}>
                  <Ionicons name="key-outline" size={22} color="#000" />
                  <TextInput
                    placeholder="Mot de passe"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                {/* Message dynamique mot de passe */}
                {password.length > 0 && (
                  <Text style={{ color: isPasswordValid ? "green" : "red" }}>
                    {getPasswordValidationMessage()}
                  </Text>
                )}
   
               <View style={styles.input_group}>
                 <Ionicons name="lock-closed-outline" size={22} color="#000" />
                 <TextInput
                   placeholder="Confirmer mot de passe"
                   style={styles.input}
                   secureTextEntry
                   value={passwordConfirme} 
                   onChangeText={setPasswordConfirme}
                 />
               </View>

               {/* Erreurs globales */}
               {erreur ? <Text style={{ color: "red" }}>{erreur}</Text> : null}
               {message ? <Text style={{ color: "green" }}>{message}</Text> : null}
     

               <TouchableOpacity style={styles.btn}>
                 {loading ? <ActivityIndicator color="#fff" /> : <Text onPress={handleRegisterClient} style={styles.btnText}>S’inscrire</Text>}
               </TouchableOpacity>
            </View>
            <View style={styles.ContbtnVersConn}>
               <TouchableOpacity style={styles.btnVersConn}>
                 <Text style={styles.btnTextCon} onPress={() => props.navigation.navigate("Login")}>J'ai déjà une compte</Text>
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
