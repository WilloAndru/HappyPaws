"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import axios from "axios";

export type DBAddress = {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  isDefault: boolean;
};

export type DBItems = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type DBOrder = {
  id: number;
  userId: string;
  status: string;
  items: DBItems[];
  total: number;
};

export type DBUser = {
  id: string;
  firebaseUid: string;
  email: string;
  name: string | null;
  image: string | null;
  cellphone: string | null;
  addresses: DBAddress[];
  customerId: string | null;
  paymentMethodId: string | null;
  orders: DBOrder[];
};

type AuthContextType = {
  user: DBUser | null;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Funcion para guardar el usuario en user de forma automatica
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const response = await axios.post("/api/users", { token });
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user from DB:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/auth");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          Verifying session…
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
