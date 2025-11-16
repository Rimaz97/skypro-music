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
          <h2 class="centerblock__h2">Все треки</h2>
          <div class="centerblock__filter filter">
            <div class="filter__title">Искать по:</div>
            <div class="filter__button button-author _btn-text" @click="filterByAuthor">
              исполнителю
            </div>
            <div class="filter__button button-year _btn-text" @click="filterByYear">
              году выпуска
            </div>
            <div class="filter__button button-genre _btn-text" @click="filterByGenre">
              жанру
            </div>
          </div>
          <TrackList 
            :tracks="filteredTracks" 
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
import { ref, computed, onMounted } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useFavoritesStore } from '@/stores/favorites'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Player from '@/components/layout/Player.vue'
import TrackList from '@/components/tracks/TrackList.vue'
import { tracksData } from '@/data/tracks'

const playerStore = usePlayerStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const router = useRouter()

const allTracks = ref([])
const searchQuery = ref('')

const filteredTracks = computed(() => {
  if (!searchQuery.value) return allTracks.value
  
  const query = searchQuery.value.toLowerCase()
  return allTracks.value.filter(track => 
    track.title.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query) ||
    track.album.toLowerCase().includes(query)
  )
})

onMounted(() => {
  allTracks.value = tracksData
})

const handlePlayTrack = (track) => {
  playerStore.playTrack(track)
  playerStore.setQueue(allTracks.value, allTracks.value.findIndex(t => t.id === track.id))
}

const handleToggleFavorite = (track) => {
  favoritesStore.toggleFavorite(track)
}

const handleSearch = () => {
  // Поиск уже работает через computed свойство
}

const clearSearch = () => {
  searchQuery.value = ''
}

const filterByAuthor = () => {
  console.log('Filter by author')
}

const filterByYear = () => {
  console.log('Filter by year')
}

const filterByGenre = () => {
  console.log('Filter by genre')
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>