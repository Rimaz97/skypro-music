import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

  const isFavorite = (trackId) => {
    return computed(() => favorites.value.some((fav) => fav.id === trackId));
  };

  const addToFavorites = (track) => {
    if (!favorites.value.some((fav) => fav.id === track.id)) {
      favorites.value.push(track);
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
    }
  };

  const removeFromFavorites = (trackId) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== trackId);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const toggleFavorite = (track) => {
    if (isFavorite(track.id).value) {
      removeFromFavorites(track.id);
    } else {
      addToFavorites(track);
    }
  };

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
});
