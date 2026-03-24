import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { User, Session } from "@supabase/supabase-js";

interface CustomerAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null, session: Session | null) => void;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useCustomerAuth = create<CustomerAuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,

      setUser: (user, session) => set({ user, session, loading: false }),

      initialize: async () => {
        const { data: { session } } = await supabaseBrowser.auth.getSession();
        if (session) {
          set({ user: session.user, session, loading: false });
        } else {
          set({ user: null, session: null, loading: false });
        }

        // Listen for auth changes
        supabaseBrowser.auth.onAuthStateChange((_event, session) => {
          set({
            user: session?.user ?? null,
            session: session ?? null,
            loading: false,
          });
        });
      },

      signUp: async (email, password, name) => {
        const { data, error } = await supabaseBrowser.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
          },
        });

        if (error) {
          return { error: error.message };
        }

        if (data.user) {
          set({ user: data.user, session: data.session, loading: false });
        }

        return {};
      },

      signIn: async (email, password) => {
        const { data, error } = await supabaseBrowser.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error: error.message };
        }

        set({ user: data.user, session: data.session, loading: false });
        return {};
      },

      signOut: async () => {
        await supabaseBrowser.auth.signOut();
        set({ user: null, session: null });
      },
    }),
    {
      name: "vitanatur-customer-auth",
      partialize: (state) => ({
        // Don't persist user/session - always verify from Supabase
      }),
    }
  )
);
