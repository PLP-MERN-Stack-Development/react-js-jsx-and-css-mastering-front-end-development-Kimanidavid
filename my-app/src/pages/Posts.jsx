import React, { useState, useEffect } from 'react'
import { api } from '../api/posts'
import Card from '../components/Card'
import Button from '../components/Button'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const postsPerPage = 10

  useEffect(() => {
    if (!searching) {
      fetchPosts()
    }
  }, [page, searching])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, total } = await api.fetchPosts(page, postsPerPage)
      setPosts(data)
      setTotalPosts(total)
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setSearching(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSearching(true)
      const data = await api.searchPosts(searchQuery)
      setPosts(data)
    } catch (err) {
      setError('Failed to search posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearching(false)
    setPage(1)
  }

  if (error) {
    return (
      <Card className="text-center p-8">
        <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
        <Button onClick={fetchPosts}>Try Again</Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Button type="submit">Search</Button>
          {searching && (
            <Button variant="secondary" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>
      </Card>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <h2 className="text-xl font-bold mb-4 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.body}
                </p>
              </Card>
            ))}
          </div>

          {!searching && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center">
                Page {page} of {Math.ceil(totalPosts / postsPerPage)}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(totalPosts / postsPerPage)}
              >
                Next
              </Button>
            </div>
          )}

          {posts.length === 0 && (
            <Card className="text-center p-8">
              <p className="text-gray-500 dark:text-gray-400">
                No posts found. Try a different search term.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default Posts