import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { CartProvider } from "./context/CartContext"; // ajoute ton provider (adapte le chemin)

export default function RootLayout() {
  return (
    <CartProvider>
      {/* Header custom */}
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

      {/* Navigation */}
      <Stack
        screenOptions={{
          headerShown: false, // cache le header natif
        }}
      />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 30,              // hauteur fixée à 30px
    backgroundColor: "#fff", 
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 12,
    color: "#000",
  },
});
