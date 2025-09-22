import React, { createContext, useState, ReactNode } from "react";

// Définir le type d’un produit
export interface Product {
  id: number;
  design: string;
  prix: number;
  image_file?: string;
//   quantity?: number;
  pref?: string; // si tu utilises pref dans ton API
}

// Définir le type du contexte
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartMessage: string;
  setCartMessage: React.Dispatch<React.SetStateAction<string>>;
}

// Créer le contexte avec valeur par défaut
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartMessage: "",
  setCartMessage: () => {},
});

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartMessage, setCartMessage] = useState("");

  // Ajouter un produit
  const addToCart = (product: Product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      setCartMessage("Produit ajouté au panier !");
    } else {
      setCartMessage("Ce produit est déjà dans le panier !");
    }
  };

  // Supprimer un produit
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Vider le panier
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ 
        cartItems,
        addToCart, 
        removeFromCart, 
        clearCart, 
        cartMessage,
        setCartMessage, 
      }}>
      {children}
    </CartContext.Provider>
  );
};
