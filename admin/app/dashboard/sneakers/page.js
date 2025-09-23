'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { sneakersAPI } from '../../../lib/api'
import AdminLayout from '../../../components/AdminLayout'

export default function SneakersPage() {
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const { user, isAuthenticated, logout, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSneakers()
    }
  }, [isAuthenticated, user, currentPage, search])

  const fetchSneakers = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await sneakersAPI.getAll(currentPage, 10, search)
      setSneakers(response.data)
      setTotal(response.meta.total)
      setTotalPages(Math.ceil(response.meta.total / response.meta.per_page))
    } catch (error) {
      console.error('Error fetching sneakers:', error)
      setError('Failed to load sneakers')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchSneakers()
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sneaker?')) return

    try {
      await sneakersAPI.delete(id)
      fetchSneakers()
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
    <AdminLayout title="Sneakers">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Sneakers</h1>
            <Link
              href="/dashboard/sneakers/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New Sneaker
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search sneakers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Search
                  </button>
                </div>
              </form>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading sneakers...</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Brand ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sneakers.map((sneaker) => (
                          <tr key={sneaker.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {sneaker.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {sneaker.slug}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {sneaker.brand_id || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {sneaker.sneaker_color || sneaker.preferred_color}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                sneaker.status === 1
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {sneaker.status === 1 ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {sneaker.user?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(sneaker.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link
                                  href={`/dashboard/sneakers/${sneaker.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                                <Link
                                  href={`/dashboard/sneakers/${sneaker.id}/edit`}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(sneaker.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {sneakers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No sneakers found.</p>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="mt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-700">
                        Showing {sneakers.length} of {total} results
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          First
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex space-x-1">
                          {(() => {
                            const pages = [];
                            const startPage = Math.max(1, currentPage - 2);
                            const endPage = Math.min(totalPages, currentPage + 2);

                            // Show first page if not in range
                            if (startPage > 1) {
                              pages.push(
                                <button
                                  key={1}
                                  onClick={() => setCurrentPage(1)}
                                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                >
                                  1
                                </button>
                              );
                              if (startPage > 2) {
                                pages.push(
                                  <span key="start-ellipsis" className="px-2 py-1 text-sm text-gray-500">
                                    ...
                                  </span>
                                );
                              }
                            }

                            // Show page numbers in range
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(i)}
                                  className={`px-3 py-1 border rounded text-sm ${
                                    i === currentPage
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }

                            // Show last page if not in range
                            if (endPage < totalPages) {
                              if (endPage < totalPages - 1) {
                                pages.push(
                                  <span key="end-ellipsis" className="px-2 py-1 text-sm text-gray-500">
                                    ...
                                  </span>
                                );
                              }
                              pages.push(
                                <button
                                  key={totalPages}
                                  onClick={() => setCurrentPage(totalPages)}
                                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                >
                                  {totalPages}
                                </button>
                              );
                            }

                            return pages;
                          })()}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          Next
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          Last
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}