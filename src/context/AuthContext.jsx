import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional user details from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDoc.data() });
          } else {
            // Fallback if firestore doc isn't found
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'patient' });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'patient' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { role: 'patient' };
      const fullUser = { uid: userCredential.user.uid, email, ...userData };
      setUser(fullUser);
      return fullUser;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      
      // Fallback for Demo Accounts (useful for hackathon if DB isn't seeded)
      if (email === 'doctor@demo.com' && password === 'demo123') {
        const demoUser = { uid: 'demo_doc', email, role: 'doctor', name: 'Dr. Arjun Sharma', specialization: 'Cardiologist', avatar: 'AS' };
        setUser(demoUser);
        return demoUser;
      }
      if (email === 'patient@demo.com' && password === 'demo123') {
        const demoUser = { uid: 'demo_pat', email, role: 'patient', name: 'Priya Mehta', avatar: 'PM' };
        setUser(demoUser);
        return demoUser;
      }
      
      throw new Error(error.message.replace('Firebase: ', ''));
    }
  };

  const register = async (data) => {
    try {
      const { email, password, ...restData } = data;
      
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // 2. Prepare user document data
      const avatar = data.name 
        ? data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) 
        : 'U';
      const userData = { ...restData, avatar, createdAt: new Date().toISOString() };
      
      // 3. Save extended profile details inside Firestore 'users' collection
      await setDoc(doc(db, "users", uid), userData);
      
      const fullUser = { uid, email, ...userData };
      setUser(fullUser);
      return fullUser;
    } catch (error) {
      console.error("Firebase Registration Error:", error);
      throw new Error(error.message.replace('Firebase: ', ''));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      const email = result.user.email;
      
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        const name = result.user.displayName || 'User';
        const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const newUserData = { name, email, avatar, role: 'patient', createdAt: new Date().toISOString() };
        await setDoc(doc(db, "users", uid), newUserData);
        const fullUser = { uid, ...newUserData };
        setUser(fullUser);
        return fullUser;
      } else {
        const fullUser = { uid, email, ...userDoc.data() };
        setUser(fullUser);
        return fullUser;
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      throw new Error(error.message.replace('Firebase: ', ''));
    }
  };

  const logout = async () => {
    // If it's a demo account fallback, reset locally
    if (user && user.uid && user.uid.startsWith('demo_')) {
      setUser(null);
      return;
    }
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
