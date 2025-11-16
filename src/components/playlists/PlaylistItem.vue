<template>
  <div class="sidebar__item">
    <div class="playlist-card" @click="selectPlaylist">
      <img class="sidebar__img" :src="playlist.cover" :alt="playlist.name" />
      <div class="playlist-overlay">
        <span class="playlist-name">{{ playlist.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  playlist: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

const selectPlaylist = () => {
  emit('select', props.playlist)
}
</script>