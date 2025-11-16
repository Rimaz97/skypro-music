<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>
    <div 
      class="filter__button button-author _btn-text" 
      :class="{ active: activeFilter === 'author' }"
      @click="setFilter('author')"
    >
      исполнителю
    </div>
    <div 
      class="filter__button button-year _btn-text"
      :class="{ active: activeFilter === 'year' }" 
      @click="setFilter('year')"
    >
      году выпуска
    </div>
    <div 
      class="filter__button button-genre _btn-text"
      :class="{ active: activeFilter === 'genre' }"
      @click="setFilter('genre')"
    >
      жанру
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFilter = ref('')
const emit = defineEmits(['filter'])

const setFilter = (filterType) => {
  if (activeFilter.value === filterType) {
    activeFilter.value = ''
    emit('filter', '')
  } else {
    activeFilter.value = filterType
    emit('filter', filterType)
  }
}
</script>

<style scoped>
.filter__button.active {
  border-color: #b672ff;
  color: #b672ff;
}
</style>