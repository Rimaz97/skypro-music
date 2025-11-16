<template>
  <div class="wrapper">
    <div class="container-signup">
      <div class="modal__block">
        <form class="modal__form-login" @submit.prevent="handleRegister">
          <router-link to="/">
            <div class="modal__logo">
              <img src="/img/logo_modal.png" alt="logo" />
            </div>
          </router-link>
          <input
            class="modal__input login"
            type="email"
            v-model="email"
            placeholder="Почта"
            required
            autocomplete="email"
          />
          <input
            class="modal__input password-first"
            type="password"
            v-model="password"
            placeholder="Пароль"
            required
            autocomplete="new-password"
          />
          <input
            class="modal__input password-double"
            type="password"
            v-model="confirmPassword"
            placeholder="Повторите пароль"
            required
            autocomplete="new-password"
          />
          <button class="modal__btn-signup-ent" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert("Пароли не совпадают");
    return;
  }
  authStore.register(
    { email: email.value, name: "Sergey.Ivanov" },
    "demo-token"
  );
  router.push("/");
};
</script>

<style scoped>
@import "@/assets/css/auth.css";
</style>
