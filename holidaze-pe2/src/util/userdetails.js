import { create } from 'zustand';

export const userDetails = create( (set) => ({
    loggedIn: false,
    accessToken: "",
    avatarURL: "",
    bannerURL: "",
    bio: "",
    email: "",
    name: "",
    venueManager: false,
    addUser: (data) => set({ 
        loggedIn: true,
        accessToken: data.accessToken,
        avatarURL: data.avatar.url,
        bannerURL: data.banner.url,
        bio: data.bio,
        email: data.email,
        name: data.name,
        venueManager: data.venueManager
    }),
    clear: () => set({ 
        loggedIn: false,
        accessToken: "",
        avatarURL: "",
        bannerURL: "",
        bio: "",
        email: "",
        name: "",
        venueManager: false
    }),
}));