<template>
  <div class="bar" v-if="currentTrack">
    <div class="bar__content">
      <div class="bar__player-progress" @click="seekToPosition">
        <div class="progress-bar">
          <div 
            class="progress-filled" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
      
      <div class="bar__player-block">
        <div class="bar__player player">
          <div class="player__controls">
            <div class="player__btn-prev" @click="previousTrack">
              <svg class="player__btn-prev-svg">
                <use xlink:href="/img/icon/sprite.svg#icon-prev"></use>
              </svg>
            </div>
            
            <div class="player__btn-play _btn" @click="togglePlay">
              <svg class="player__btn-play-svg">
                <use :xlink:href="isPlaying ? '/img/icon/sprite.svg#icon-pause' : '/img/icon/sprite.svg#icon-play'"></use>
              </svg>
            </div>
            
            <div class="player__btn-next" @click="nextTrack">
              <svg class="player__btn-next-svg">
                <use xlink:href="/img/icon/sprite.svg#icon-next"></use>
              </svg>
            </div>
            
            <div class="player__btn-repeat _btn-icon" 
                 @click="toggleRepeat" 
                 :class="{ active: isRepeating }">
              <svg class="player__btn-repeat-svg">
                <use xlink:href="/img/icon/sprite.svg#icon-repeat"></use>
              </svg>
            </div>
            
            <div class="player__btn-shuffle _btn-icon" 
                 @click="toggleShuffle" 
                 :class="{ active: isShuffled }">
              <svg class="player__btn-shuffle-svg">
                <use xlink:href="/img/icon/sprite.svg#icon-shuffle"></use>
              </svg>
            </div>
          </div>

          <div class="player__track-play track-play">
            <div class="track-play__contain">
              <div class="track-play__image">
                <svg class="track-play__svg">
                  <use xlink:href="/img/icon/sprite.svg#icon-note"></use>
                </svg>
              </div>
              <div class="track-play__author">
                <a class="track-play__author-link" href="#">{{ currentTrack.artist }}</a>
              </div>
              <div class="track-play__album">
                <a class="track-play__album-link" href="#">{{ currentTrack.title }}</a>
              </div>
            </div>

            <div class="track-play__like-dis">
              <div class="track-play__like _btn-icon" @click="toggleLike">
                <svg class="track-play__like-svg" :class="{ active: isTrackLiked }">
                  <use xlink:href="/img/icon/sprite.svg#icon-like"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bar__volume-block volume">
          <div class="volume__content">
            <div class="volume__image">
              <svg class="volume__svg">
                <use xlink:href="/img/icon/sprite.svg#icon-volume"></use>
              </svg>
            </div>
            <div class="volume__progress _btn">
              <input
                class="volume__progress-line _btn"
                type="range"
                min="0"
                max="1"
                step="0.1"
                :value="volume"
                @input="setVolume($event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useFavoritesStore } from '@/stores/favorites'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

const playerStore = usePlayerStore()
const favoritesStore = useFavoritesStore()
const audioPlayer = useAudioPlayer()

const currentTrack = computed(() => playerStore.currentTrack)
const isPlaying = computed(() => audioPlayer.isPlaying.value)
const isRepeating = computed(() => playerStore.isRepeating)
const isShuffled = computed(() => playerStore.isShuffled)
const volume = computed(() => audioPlayer.volume.value)

const progressPercentage = computed(() => {
  if (!audioPlayer.duration.value) return 0
  return (audioPlayer.currentTime.value / audioPlayer.duration.value) * 100
})

const isTrackLiked = computed(() => {
  return currentTrack.value ? favoritesStore.isFavorite(currentTrack.value.id).value : false
})

watch(currentTrack, (newTrack) => {
  if (newTrack && newTrack.audioUrl) {
    audioPlayer.loadTrack(newTrack.audioUrl)
  }
})

const togglePlay = () => {
  audioPlayer.togglePlay()
}

const toggleRepeat = () => {
  playerStore.toggleRepeat()
}

const toggleShuffle = () => {
  playerStore.toggleShuffle()
}

const nextTrack = () => {
  playerStore.nextTrack()
}

const previousTrack = () => {
  playerStore.previousTrack()
}

const setVolume = (value) => {
  audioPlayer.setVolume(parseFloat(value))
}

const toggleLike = () => {
  if (currentTrack.value) {
    favoritesStore.toggleFavorite(currentTrack.value)
  }
}

const seekToPosition = (event) => {
  const progressBar = event.currentTarget
  const clickPosition = event.offsetX
  const progressBarWidth = progressBar.clientWidth
  const seekTime = (clickPosition / progressBarWidth) * audioPlayer.duration.value
  audioPlayer.seek(seekTime)
}

onMounted(() => {
  if (currentTrack.value && currentTrack.value.audioUrl) {
    audioPlayer.loadTrack(currentTrack.value.audioUrl)
  }
})
</script>