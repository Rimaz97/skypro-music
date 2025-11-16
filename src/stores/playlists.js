import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlaylistsStore = defineStore('playlists', () => {
  const playlists = ref([
    {
      id: 1,
      name: 'Плейлист дня',
      cover: '/img/playlist01.png',
      tracks: [1, 2, 3]
    },
    {
      id: 2,
      name: '100 танцевальных хитов',
      cover: '/img/playlist02.png',
      tracks: [4, 5, 6]
    },
    {
      id: 3,
      name: 'Инди-заряд',
      cover: '/img/playlist03.png',
      tracks: [7, 8, 9]
    }
  ])

  const getPlaylistById = (id) => {
    return playlists.value.find(playlist => playlist.id === id)
  }

  const addToPlaylist = (playlistId, trackId) => {
    const playlist = getPlaylistById(playlistId)
    if (playlist && !playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId)
    }
  }

  const removeFromPlaylist = (playlistId, trackId) => {
    const playlist = getPlaylistById(playlistId)
    if (playlist) {
      playlist.tracks = playlist.tracks.filter(id => id !== trackId)
    }
  }

  return {
    playlists,
    getPlaylistById,
    addToPlaylist,
    removeFromPlaylist
  }
})