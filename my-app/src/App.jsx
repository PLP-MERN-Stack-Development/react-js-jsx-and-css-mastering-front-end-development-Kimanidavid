import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TaskManager from './components/TaskManager'
import Card from './components/Card'
import Button from './components/Button'
import Posts from './pages/Posts'
import { ThemeProvider } from './context/ThemeContext'

const Home = () => (
  <div className="space-y-6">
    <Card>
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Personal Task Hub</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Create, organize, and track your tasks effortlessly to boost your productivity.
      </p>
      <div className="space-x-4">
        <Button variant="primary" onClick={() => navigate('/tasks')}>Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </div>
    </Card>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App