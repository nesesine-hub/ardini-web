import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function login(email, password) {
    if (!isFirebaseConfigured) {
      return Promise.reject(
        new Error("Firebase yapılandırması eksik. Lütfen src/firebase/config.js dosyasını doldurun.")
      );
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (!isFirebaseConfigured) return Promise.resolve();
    return signOut(auth);
  }

  const value = { currentUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
