'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../../../../contexts/AuthContext'
import { designsAPI, categoriesAPI } from '../../../../../lib/api'
import TagInput from '../../../../../components/TagInput'
import SearchableSelect from '../../../../../components/SearchableSelect'

export default function EditDesignPage() {
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    svg: '',
    description: '',
    status: 1,
    is_chosen: false,
    is_featured: false,
    is_feed: false,
    tags: []
  })
  const [categories, setCategories] = useState([])
  const [categorySearch, setCategorySearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')

  const { user, isAuthenticated, logout, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (isAuthenticated && user && id) {
      fetchDesign()
      fetchCategories()
    }
  }, [isAuthenticated, user, id])

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCategories()
    }
  }, [categorySearch])

  const fetchDesign = async () => {
    try {
      setFetchLoading(true)
      setError('')
      const response = await designsAPI.getById(id)
      const design = response.data

      const tags = design.tags?.map(t => t.tag) || []

      setFormData({
        category_id: design.category_id || '',
        title: design.title || '',
        svg: design.svg || '',
        description: design.description || '',
        status: design.status,
        is_chosen: design.is_chosen || false,
        is_featured: design.is_featured || false,
        is_feed: design.is_feed || false,
        tags: tags
      })
    } catch (error) {
      console.error('Error fetching design:', error)
      setError('Failed to load design')
    } finally {
      setFetchLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll(null, null, categorySearch)
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleTagsChange = (newTags) => {
    setFormData(prev => ({ ...prev, tags: newTags }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await designsAPI.update(id, formData)
      router.push(`/dashboard/designs/${id}`)
    } catch (error) {
      console.error('Error updating design:', error)
      setError(error.response?.data?.message || 'Failed to update design')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                MMT Admin
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/designs" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Designs
                </Link>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Edit Design
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Design</h1>
            <div className="flex space-x-3">
              <Link
                href="/dashboard/designs"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Designs
              </Link>
              <Link
                href={`/dashboard/designs/${id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>

          {fetchLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading design data...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <SearchableSelect
                    label="Category"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    options={categories}
                    placeholder="Select a category..."
                    required={true}
                    onSearch={setCategorySearch}
                  />

                  <div>
                    <label htmlFor="svg" className="block text-sm font-medium text-gray-700">
                      SVG Content *
                    </label>
                    <textarea
                      name="svg"
                      id="svg"
                      required
                      rows={8}
                      value={formData.svg}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="<svg>...</svg>"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <TagInput
                    tags={formData.tags}
                    onChange={handleTagsChange}
                  />

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status *
                    </label>
                    <select
                      name="status"
                      id="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_chosen"
                        id="is_chosen"
                        checked={formData.is_chosen}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_chosen" className="ml-3 block text-sm font-medium text-gray-700">
                        Is Chosen
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_featured"
                        id="is_featured"
                        checked={formData.is_featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_featured" className="ml-3 block text-sm font-medium text-gray-700">
                        Is Featured
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_feed"
                        id="is_feed"
                        checked={formData.is_feed}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_feed" className="ml-3 block text-sm font-medium text-gray-700">
                        Include in Feed
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Link
                      href={`/dashboard/designs/${id}`}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Design'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
