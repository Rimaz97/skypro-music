<template>
  <div class="wrapper">
    <div class="container-enter">
      <div class="modal__block">
        <form class="modal__form-login" @submit.prevent="handleLogin">
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
            class="modal__input password"
            type="password"
            v-model="password"
            placeholder="Пароль"
            required
            autocomplete="current-password"
          />
          <button class="modal__btn-enter" type="submit">
            Войти
          </button>
          <button class="modal__btn-signup" type="button" @click="goToRegister">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  authStore.login(
    { email: email.value, name: 'Sergey.Ivanov' },
    'demo-token'
  )
  router.push('/')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
@import '@/assets/css/auth.css';
</style>