import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref(null)
  const isPlaying = ref(false)
  const isShuffled = ref(false)
  const isRepeating = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.5)
  const queue = ref([])
  const currentIndex = ref(0)

  const playTrack = (track) => {
    currentTrack.value = track
    isPlaying.value = true
  }
  
  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
  }
  
  const toggleShuffle = () => {
    isShuffled.value = !isShuffled.value
  }
  
  const toggleRepeat = () => {
    isRepeating.value = !isRepeating.value
  }
  
  const nextTrack = () => {
    if (queue.value.length === 0) return
    
    if (isShuffled.value) {
      currentIndex.value = Math.floor(Math.random() * queue.value.length)
    } else {
      currentIndex.value = (currentIndex.value + 1) % queue.value.length
    }
    currentTrack.value = queue.value[currentIndex.value]
  }
  
  const previousTrack = () => {
    if (queue.value.length === 0) return
    
    currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : queue.value.length - 1
    currentTrack.value = queue.value[currentIndex.value]
  }
  
  const setVolume = (newVolume) => {
    volume.value = Math.max(0, Math.min(1, newVolume))
  }

  const setQueue = (tracks, startIndex = 0) => {
    queue.value = tracks
    currentIndex.value = startIndex
    currentTrack.value = tracks[startIndex]
  }

  return {
    currentTrack,
    isPlaying,
    isShuffled,
    isRepeating,
    currentTime,
    duration,
    volume,
    queue,
    currentIndex,
    playTrack,
    togglePlay,
    toggleShuffle,
    toggleRepeat,
    nextTrack,
    previousTrack,
    setVolume,
    setQueue
  }
})