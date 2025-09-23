'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'
import { sneakersAPI } from '../../../../lib/api'

export default function SneakerDetailPage() {
  const [sneaker, setSneaker] = useState(null)
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
      fetchSneaker()
    }
  }, [isAuthenticated, user, id])

  const fetchSneaker = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await sneakersAPI.getById(id)
      setSneaker(response.data)
    } catch (error) {
      console.error('Error fetching sneaker:', error)
      setError('Failed to load sneaker')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this sneaker?')) return

    try {
      await sneakersAPI.delete(id)
      router.push('/dashboard/sneakers')
    } catch (error) {
      console.error('Error deleting sneaker:', error)
      setError('Failed to delete sneaker')
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
                <Link href="/dashboard/sneakers" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sneakers
                </Link>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sneaker Details
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
            <h1 className="text-3xl font-bold text-gray-900">
              {sneaker ? sneaker.title : 'Sneaker Details'}
            </h1>
            <div className="flex space-x-3">
              <Link
                href="/dashboard/sneakers"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to List
              </Link>
              {sneaker && (
                <>
                  <Link
                    href={`/dashboard/sneakers/${sneaker.id}/edit`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete
                  </button>
                </>
              )}
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
              <p className="mt-2 text-gray-600">Loading sneaker details...</p>
            </div>
          ) : sneaker ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.title}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Slug</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.slug}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Original Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.original_title || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Brand ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.brand_id || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sub Model Category ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.sub_model_category_id || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Model ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.model_id || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Asset ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.asset_id || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        sneaker.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {sneaker.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Is Feed</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        sneaker.is_feed
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sneaker.is_feed ? 'Yes' : 'No'}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sneaker Color</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.sneaker_color || 'N/A'}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Preferred Color</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.preferred_color}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Colors</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sneaker.colors}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">User</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {sneaker.user ? `${sneaker.user.name} (${sneaker.user.email})` : 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(sneaker.created_at).toLocaleString()}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(sneaker.updated_at).toLocaleString()}
                    </dd>
                  </div>

                  {sneaker.description && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                        {sneaker.description}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Sneaker not found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}