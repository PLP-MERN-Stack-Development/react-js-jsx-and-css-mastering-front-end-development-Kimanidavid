const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const api = {
  async fetchPosts(page = 1, limit = 10) {
    const response = await fetch(
      `${BASE_URL}/posts?_page=${page}&_limit=${limit}`
    )
    const total = response.headers.get('x-total-count')
    const data = await response.json()
    return { data, total: parseInt(total) }
  },

  async searchPosts(query) {
    const response = await fetch(`${BASE_URL}/posts?q=${query}`)
    const data = await response.json()
    return data
  },

  async fetchPost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`)
    const data = await response.json()
    return data
  }
}