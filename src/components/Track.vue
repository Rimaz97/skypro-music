<template>
  <div class="track">
    <div class="track__left">
      <img :src="track.cover" alt="Обложка" class="track__cover" />
      <div class="track__info">
        <span class="track__name">{{ track.name }}</span>
        <span class="track__artist">{{ track.artist }}</span>
      </div>
    </div>
    <div class="track__right">
      <span class="track__duration">{{ track.duration }}</span>
      <button class="track__like">
        <svg class="icon">
          <use xlink:href="/img/icons.svg#like"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  track: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.track {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2e2e2e;
}

.track__left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.track__cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
}
/* Остальные стили */
</style>