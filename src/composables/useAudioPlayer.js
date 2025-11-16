import { ref } from "vue";

export function useAudioPlayer() {
  const audio = ref(new Audio());
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(0.7);
  const error = ref(null);

  // Загрузка трека
  const loadTrack = (audioUrl) => {
    if (audioUrl) {
      try {
        audio.value.src = audioUrl;
        audio.value.load();

        audio.value.addEventListener("loadedmetadata", () => {
          duration.value = audio.value.duration;
          error.value = null;
        });

        audio.value.addEventListener("timeupdate", () => {
          currentTime.value = audio.value.currentTime;
        });

        audio.value.addEventListener("ended", () => {
          isPlaying.value = false;
        });

        audio.value.addEventListener("error", () => {
          error.value = "Ошибка загрузки аудио";
          isPlaying.value = false;
        });
      } catch {
        // Используем общий текст ошибки без параметра err
        error.value = "Ошибка загрузки трека";
        isPlaying.value = false;
      }
    }
  };

  // Управление воспроизведением
  const play = () => {
    try {
      audio.value.play();
      isPlaying.value = true;
      error.value = null;
    } catch {
      error.value = "Ошибка воспроизведения";
      isPlaying.value = false;
    }
  };

  const pause = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  const togglePlay = () => {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
  };

  // Перемотка
  const seek = (time) => {
    audio.value.currentTime = time;
    currentTime.value = time;
  };

  // Громкость
  const setVolume = (newVolume) => {
    volume.value = newVolume;
    audio.value.volume = newVolume;
  };

  return {
    audio,
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
  };
}
