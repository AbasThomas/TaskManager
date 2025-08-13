import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../Services/firebase'; // Make sure this path is correct

const AuthContext = createContext();

// Hook to access the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Signup with email verification
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Set the user's full name
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    // Send email verification
    await sendEmailVerification(userCredential.user);

    // Temporarily update the user locally (but emailVerified is still false until confirmed)
    setCurrentUser({ ...userCredential.user, displayName: fullName });

    return userCredential;
  };

  // ✅ Login and restrict unverified users
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Check if the user's email is verified
    if (!userCredential.user.emailVerified) {
      throw new Error('Please verify your email before logging in.');
    }

    return userCredential;
  };

  // ✅ Logout
  const logout = () => {
    return signOut(auth);
  };

  // ✅ Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Auth context value
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
