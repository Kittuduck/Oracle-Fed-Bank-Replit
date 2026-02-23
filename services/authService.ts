import { supabase } from '../lib/supabaseClient';

export const authService = {
    /**
     * sign up a new user and create a profile
     */
    async signUp(email: string, password: string, fullName: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) throw error;
        return data;
    },

    /**
     * sign in an existing user
     */
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    /**
     * sign out the current user
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * get the current active session
     */
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },

    /**
     * get the profile of the current user
     */
    async getProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * update the user profile
     */
    async updateProfile(updates: any) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);

        if (error) throw error;
    }
};
