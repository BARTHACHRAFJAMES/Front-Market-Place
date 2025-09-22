import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Header from "./Header";
import Acceuil from "./pages/Acceuil";
import Panier from "./pages/Panier";
import Categories from "./pages/Categories";
import CustomDrawerContent from "./CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function MaisonScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Acceuil />
    </SafeAreaView>
  );
}

function ListeCategoriesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Categories />
    </SafeAreaView>
  );
}

function PanierScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Panier />
    </SafeAreaView>
  );
}

function ListesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.screenContent}>
        <Text>📋 Tes listes</Text>
      </View>
    </SafeAreaView>
  );
}

export default function Home() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#fff", width: 260 },
        drawerLabelStyle: { fontSize: 14, fontWeight: "500" },
        drawerActiveTintColor: "#007bff",
        drawerInactiveTintColor: "#333",
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons name="home-outline" size={24} color={color} />
        ),
      }}
    >
      <Drawer.Screen name="Acceuil" component={MaisonScreen} />

      <Drawer.Screen 
         name="Achat par catégories" 
         component={ListeCategoriesScreen} 
         options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
         name="Commandes" 
         component={ListeCategoriesScreen} 
         options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Profile" 
        component={require("./pages/ProfileScreen").default} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen 
        name="Panier" component={PanierScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }} 
      />

      <Drawer.Screen
        name="Favories" component={ListesScreen}
        options={{
         drawerIcon: ({ color, size }) => (
           <Ionicons name="heart" size={24
          } color="#ff0000" />
         ),
        }} 
       />


      {/* Inscrptions */}
       <Drawer.Screen
         name="Inscription"
         component={require("./Inscription").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />
       
       <Drawer.Screen
         name="InscriptionClient"
         component={require("./InscriptionUser/InscriptionClient").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />

       <Drawer.Screen
         name="InscriptionLivreur"
         component={require("./InscriptionUser/InscriptionLivreur").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />

       <Drawer.Screen
         name="InscriptionFournisseur"
         component={require("./InscriptionUser/InscriptionFournisseur").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />

       <Drawer.Screen
         name="InscriptionEditeur"
         component={require("./InscriptionUser/InscriptionEditeur").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />

       {/* Login */}

       <Drawer.Screen
         name="Login"
         component={require("./LoginUser/Login").default}
         options={{ drawerItemStyle: { display: "none" } }}
       />

    </Drawer.Navigator>
    
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  comCircle: {
    backgroundColor: "#007bff",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  comText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Footer
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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

  // Modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 350,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  closeText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
