import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = create((set) => {
  // Set up auth state listener
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,
    error: null,
    signIn: async (email, password) => {
      try {
        set({ loading: true, error: null });
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
    signUp: async (email, password) => {
      try {
        set({ loading: true, error: null });
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
    signOut: async () => {
      try {
        set({ loading: true, error: null });
        await firebaseSignOut(auth);
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    }
  };
});