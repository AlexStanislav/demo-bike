import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const allBikes = ref<Record<string, object[]>>({})

  const screenLoaderIsVisible = ref(false)

  function getAllBikes() {
    const files = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']

    files.forEach(async (file: string) => {
      const data = await fetch(`/${file}.json`)
      const json = await data.json()

      allBikes.value[file] = json
    })
  }

  function toggleScreenLoader(value: boolean = true) {
    screenLoaderIsVisible.value = value ? value : !screenLoaderIsVisible.value
  }

  function getAllNews() {
    return new Promise((resolve, reject) => {
      fetch('/news.json')
        .then((res) => res.json())
        .then((json: object) => {
          resolve(json)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { allBikes, getAllBikes, getAllNews, screenLoaderIsVisible, toggleScreenLoader }
})
