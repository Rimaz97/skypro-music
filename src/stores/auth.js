import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const token = ref(localStorage.getItem("token") || null);

  const isAuthenticated = computed(() => !!token.value);

  const login = (userData, authToken) => {
    user.value = userData;
    token.value = authToken;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = (userData, authToken) => {
    login(userData, authToken);
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
  };
});
