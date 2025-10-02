'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'
import { designsAPI } from '../../../../lib/api'

export default function ViewDesignPage() {
  const [design, setDesign] = useState(null)
  const [loading, setLoading] = useState(true)
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
    }
  }, [isAuthenticated, user, id])

  const fetchDesign = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await designsAPI.getById(id)
      setDesign(response.data)
    } catch (error) {
      console.error('Error fetching design:', error)
      setError('Failed to load design')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this design?')) return

    try {
      await designsAPI.delete(id)
      router.push('/dashboard/designs')
    } catch (error) {
      console.error('Error deleting design:', error)
      alert('Failed to delete design')
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
                  View Design
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

      <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Design Details</h1>
            <div className="flex space-x-3">
              <Link
                href="/dashboard/designs"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Designs
              </Link>
              <Link
                href={`/dashboard/designs/${id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit Design
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Delete Design
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading design...</p>
            </div>
          ) : design ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Title</h3>
                    <p className="mt-1 text-lg text-gray-900">{design.title}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Slug</h3>
                    <p className="mt-1 text-lg text-gray-900">{design.slug}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1 text-lg text-gray-900">{design.category?.title || 'N/A'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`mt-1 inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
                      design.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {design.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created By</h3>
                    <p className="mt-1 text-lg text-gray-900">{design.user?.name || 'N/A'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(design.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Flags</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      design.is_chosen ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {design.is_chosen ? '✓' : '✗'} Chosen
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      design.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {design.is_featured ? '✓' : '✗'} Featured
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      design.is_feed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {design.is_feed ? '✓' : '✗'} Feed
                    </span>
                  </div>
                </div>

                {design.tags && design.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {design.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-900 whitespace-pre-wrap">{design.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">SVG Preview</h3>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div
                      className="max-w-md mx-auto"
                      dangerouslySetInnerHTML={{ __html: design.svg }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">SVG Code</h3>
                  <pre className="bg-gray-100 border border-gray-300 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{design.svg}</code>
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Design not found</div>
          )}
        </div>
      </div>
    </div>
  )
}
