import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userDetails = create( 
    persist((set) => ({
    loggedIn: false,
    apiKey:"",
    accessToken:"",
    avatarURL:"",
    bio:"",
    email:"",
    name:"",
    venueManager: false,
    addUser: (data) => set({ 
        loggedIn: true,
        accessToken: data.accessToken,
        avatarURL: data.avatar.url,
        bio: data.bio,
        email: data.email,
        name: data.name,
        venueManager: data.venueManager
    }),
    clear: () => set({ 
        loggedIn: false,
        apiKey: "",
        accessToken: "",
        avatarURL: "",
        bio: "",
        email: "",
        name: "",
        venueManager: false
    }),
    addApiKey: (key) => set({ 
        apiKey: key
    }),
    }),
    {
        name:"user-storage"
    }));