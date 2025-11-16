<template>
  <div class="wrapper">
    <div class="container">
      <div class="top-container">
        <Navbar />

        <div class="centerblock__search search">
          <svg class="search__svg">
            <use xlink:href="/img/icon/sprite.svg#icon-search"></use>
          </svg>
          <input
            class="search__text"
            type="search"
            placeholder="Поиск"
            name="search"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <div v-if="searchQuery" class="search-clear" @click="clearSearch">
            ×
          </div>
        </div>

        <div class="sidebar__personal">
          <p class="sidebar__personal-name">{{ authStore.user?.name || 'Гость' }}</p>
          <div class="sidebar__icon" @click="logout">
            <svg>
              <use xlink:href="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
      </div>

      <main class="main">
        <div class="main__centerblock centerblock">
          <h2 class="centerblock__h2">Мои треки</h2>
          <TrackList 
            :tracks="favoriteTracks" 
            @play="handlePlayTrack"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>
        <Sidebar />
      </main>
      <Player />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useFavoritesStore } from '@/stores/favorites'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Player from '@/components/layout/Player.vue'
import TrackList from '@/components/tracks/TrackList.vue'

const playerStore = usePlayerStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const router = useRouter()

const favoriteTracks = computed(() => favoritesStore.favorites)
const searchQuery = ref('')

const handlePlayTrack = (track) => {
  playerStore.playTrack(track)
  playerStore.setQueue(favoriteTracks.value, favoriteTracks.value.findIndex(t => t.id === track.id))
}

const handleToggleFavorite = (track) => {
  favoritesStore.toggleFavorite(track)
}

const handleSearch = (query) => {
  searchQuery.value = query
}

const clearSearch = () => {
  searchQuery.value = ''
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>