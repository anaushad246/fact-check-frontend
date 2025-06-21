import { create } from 'zustand'
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User
} from 'firebase/auth'
import { auth } from '../firebase/config'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => {
  // Set up auth state listener
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false })
  })

  return {
    user: null,
    loading: true,
    error: null,
    signIn: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null })
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        set({ error: (error as Error).message })
      } finally {
        set({ loading: false })
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null })
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        set({ error: (error as Error).message })
      } finally {
        set({ loading: false })
      }
    },
    signOut: async () => {
      try {
        set({ loading: true, error: null })
        await firebaseSignOut(auth)
      } catch (error) {
        set({ error: (error as Error).message })
      } finally {
        set({ loading: false })
      }
    }
  }
})