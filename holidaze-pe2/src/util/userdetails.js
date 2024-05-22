import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userDetails = create(
  persist(
    (set) => ({
      loggedIn: false,
      apiKey: "62ade5c2-ecdc-44e6-a17d-109cbad07130",
      accessToken: "",
      avatarURL: "",
      bio: "",
      email: "",
      name: "",
      venueManager: false,
      addUser: (data) =>
        set({
          loggedIn: true,
          accessToken: data.accessToken,
          avatarURL: data.avatar.url,
          bio: data.bio,
          email: data.email,
          name: data.name,
          venueManager: data.venueManager,
        }),
      clear: () =>
        set({
          loggedIn: false,
          accessToken: "",
          avatarURL: "",
          bio: "",
          email: "",
          name: "",
          venueManager: false,
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);
