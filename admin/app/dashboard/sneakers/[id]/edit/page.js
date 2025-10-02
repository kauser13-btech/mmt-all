'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../../../../contexts/AuthContext'
import { sneakersAPI, categoriesAPI, assetsAPI } from '../../../../../lib/api'
import ColorDropdown from '../../../../../components/ColorDropdown'
import ExtractedColorManager from '../../../../../components/ExtractedColorManager'
import ColorSequenceCollector from '../../../../../components/ColorSequenceCollector'

export default function EditSneakerPage() {
  const colorOptions = [
    { name: 'Black', value: '#000000', bgClass: 'bg-black' },
    { name: 'White', value: '#ffffff', bgClass: 'bg-white border border-gray-300' },
    { name: 'Red', value: '#dc2626', bgClass: 'bg-red-600' },
    { name: 'Blue', value: '#3b82f6', bgClass: 'bg-blue-600' },
    { name: 'Green', value: '#22c55e', bgClass: 'bg-green-500' },
    { name: 'Yellow', value: '#eab308', bgClass: 'bg-yellow-500' },
    { name: 'Orange', value: '#f97316', bgClass: 'bg-orange-500' },
    { name: 'Purple', value: '#a855f7', bgClass: 'bg-purple-500' },
    { name: 'Pink', value: '#ec4899', bgClass: 'bg-pink-500' },
    { name: 'Brown', value: '#a3524c', bgClass: 'bg-amber-800' },
    { name: 'Gray', value: '#6b7280', bgClass: 'bg-gray-500' },
    { name: 'Navy', value: '#1e3a8a', bgClass: 'bg-blue-800' },
    { name: 'Maroon', value: '#7c2d12', bgClass: 'bg-red-800' },
    { name: 'Beige', value: '#f5f5dc', bgClass: 'bg-yellow-100 border border-gray-300' },
    { name: 'Tan', value: '#d2b48c', bgClass: 'bg-yellow-200' },
    { name: 'Gold', value: '#fbbf24', bgClass: 'bg-yellow-400' },
    { name: 'Silver', value: '#e5e7eb', bgClass: 'bg-gray-300' },
    { name: 'Multi-Color', value: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)', bgClass: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500' }
  ]

  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    brand_id: '',
    sub_model_category_id: '',
    model_id: '',
    description: '',
    asset_id: '',
    status: 1,
    is_feed: false,
    sneaker_color: '',
    preferred_color: 'Black',
    default_color: '',
    color_sequences: []
  })
  const [brands, setBrands] = useState([])
  const [subModelCategories, setSubModelCategories] = useState([])
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState(null)
  const [colorPalette, setColorPalette] = useState([])
  const [error, setError] = useState('')

  const { user, isAuthenticated, logout, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { id } = params
  console.log('colorPalette',colorPalette);
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (isAuthenticated && user && id) {
      fetchSneaker()
      fetchBrands()
    }
  }, [isAuthenticated, user, id])

  useEffect(() => {
    if (colorPalette.length > 0) {
      const colorNames = colorPalette.map(c => c.name).join('/')
      setFormData(prev => ({ ...prev, sneaker_color: colorNames }))
    }
  }, [colorPalette])

  const handleColorPaletteChange = (updatedColors) => {
    setColorPalette(updatedColors)
    const colorNames = updatedColors.map(c => c.name).join('/')
    setFormData(prev => ({ ...prev, sneaker_color: colorNames }))
  }

  const handleColorSequencesChange = (sequences) => {
    setFormData(prev => ({ ...prev, color_sequences: sequences }))
  }

  // Function to parse slash-separated colors and create color objects
  const parseColorsFromString = (colorString) => {
    if (!colorString) return []

    const colorNames = colorString.split('/').map(c => c.trim()).filter(c => c)
    return colorNames.map((colorName, index) => {
      // Find matching color from predefined options
      const matchingColor = colorOptions.find(option =>
        option.name.toLowerCase() === colorName.toLowerCase()
      )

      return {
        name: colorName,
        color: matchingColor ? matchingColor.value : `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
      }
    })
  }

  const fetchBrands = async () => {
    try {
      const response = await categoriesAPI.getBrands()
      setBrands(response.data || [])
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const fetchSubModelCategories = async (brandId) => {
    try {
      const response = await categoriesAPI.getSubModelCategories(brandId)
      setSubModelCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching sub model categories:', error)
      setSubModelCategories([])
    }
  }

  const fetchModels = async (subModelCategoryId) => {
    try {
      const response = await categoriesAPI.getModels(subModelCategoryId)
      setModels(response.data || [])
    } catch (error) {
      console.error('Error fetching models:', error)
      setModels([])
    }
  }

  const fetchSneaker = async () => {
    try {
      setFetchLoading(true)
      setError('')
      const response = await sneakersAPI.getById(id)
      const sneaker = response.data

      // Convert specificColors to color_sequences format
      const colorSequences = sneaker.specific_colors?.map(sc => ({
        id: sc.id || Date.now() + Math.random(), // Use database ID or generate unique ID
        color_name: sc.color_name,
        color_code: sc.color_code,
        color_sequence: sc.color_sequence || []
      })) || []

      setFormData({
        title: sneaker.title || '',
        original_title: sneaker.original_title || '',
        brand_id: sneaker.brand_id || '',
        sub_model_category_id: sneaker.sub_model_category_id || '',
        model_id: sneaker.model_id || '',
        description: sneaker.description || '',
        asset_id: sneaker.asset_id || '',
        status: sneaker.status,
        is_feed: sneaker.is_feed,
        sneaker_color: sneaker.sneaker_color || '',
        preferred_color: sneaker.preferred_color || 'Black',
        default_color: '',
        color_sequences: colorSequences,
      })
      

      if (sneaker.brand_id) {
        fetchSubModelCategories(sneaker.brand_id)
      }
      if (sneaker.sub_model_category_id) {
        fetchModels(sneaker.sub_model_category_id)
      }

      // Load current image from relationship or fetch by ID
      if (sneaker.asset || sneaker.asset_id) {
        try {
          if (sneaker.asset?.full_url) {
            // Use relationship data if available
            setCurrentImageUrl(sneaker.asset.full_url)
            setColorPalette(sneaker.asset.color_palette || [])
          } else {
            // Fallback to API call
            const assetResponse = await assetsAPI.getById(sneaker.asset_id)
            setCurrentImageUrl(assetResponse.data.full_url)
            setColorPalette(assetResponse.data.color_palette || [])
          }
        } catch (error) {
          console.error('Error loading current image:', error)
        }
      } else if (sneaker.sneaker_color) {
        // Parse existing comma-separated colors if no asset but colors exist
        const parsedColors = parseColorsFromString(sneaker.sneaker_color)
        setColorPalette(parsedColors)
      }
    } catch (error) {
      console.error('Error fetching sneaker:', error)
      setError('Failed to load sneaker')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'brand_id') {
      setFormData(prev => ({ ...prev, sub_model_category_id: '', model_id: '' }))
      setSubModelCategories([])
      setModels([])
      if (value) {
        fetchSubModelCategories(value)
        const selectedBrand = brands.find(brand => brand.id == value)
        if (selectedBrand) {
          setFormData(prev => ({ ...prev, description: selectedBrand.description || selectedBrand.title }))
        }
      } else {
        setFormData(prev => ({ ...prev, description: '' }))
      }
    } else if (name === 'sub_model_category_id') {
      setFormData(prev => ({ ...prev, model_id: '' }))
      setModels([])
      if (value) {
        fetchModels(value)
        const selectedCategory = subModelCategories.find(category => category.id == value)
        if (selectedCategory) {
          setFormData(prev => ({ ...prev, description: selectedCategory.description || selectedCategory.title }))
        }
      } else {
        const selectedBrand = brands.find(brand => brand.id == formData.brand_id)
        if (selectedBrand) {
          setFormData(prev => ({ ...prev, description: selectedBrand.description || selectedBrand.title }))
        }
      }
    } else if (name === 'model_id') {
      if (value) {
        const selectedModel = models.find(model => model.id == value)
        if (selectedModel) {
          setFormData(prev => ({ ...prev, description: selectedModel.description || selectedModel.title }))
        }
      } else {
        const selectedCategory = subModelCategories.find(category => category.id == formData.sub_model_category_id)
        if (selectedCategory) {
          setFormData(prev => ({ ...prev, description: selectedCategory.description || selectedCategory.title }))
        }
      }
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB')
      return
    }

    setUploadLoading(true)
    setError('')

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
        setCurrentImageUrl(null)
      }
      reader.readAsDataURL(file)

      // Upload file
      const response = await assetsAPI.upload(file)

      if (response.success) {
        setFormData(prev => ({
          ...prev,
          asset_id: response.data.id
        }))
        setColorPalette(response.data.color_palette || [])
      } else {
        setError(response.message || 'Upload failed')
        setPreviewImage(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.response?.data?.message || 'Upload failed')
      setPreviewImage(null)
    } finally {
      setUploadLoading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, asset_id: '' }))
    setPreviewImage(null)
    setCurrentImageUrl(null)
    setColorPalette([])
    // Reset file input
    const fileInput = document.getElementById('image-upload')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Submitting formData:', formData)
      console.log('Color sequences:', formData.color_sequences)
      await sneakersAPI.update(id, {...formData, colorPalette})
      router.push(`/dashboard/sneakers/${id}`)
    } catch (error) {
      console.error('Error updating sneaker:', error)
      console.error('Error response:', error.response?.data)
      setError(error.response?.data?.message || 'Failed to update sneaker')
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
                <Link href="/dashboard/sneakers" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sneakers
                </Link>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Edit Sneaker
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Sneaker</h1>
            <div className="flex space-x-3">
              <Link
                href="/dashboard/sneakers"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Sneakers
              </Link>
              <Link
                href={`/dashboard/sneakers/${id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>

          {fetchLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading sneaker data...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Basic Information Section */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                          <div>
                            <label htmlFor="original_title" className="block text-sm font-medium text-gray-700">
                              Original Title
                            </label>
                            <input
                              type="text"
                              name="original_title"
                              id="original_title"
                              value={formData.original_title}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Category & Classification Section */}
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Category & Classification</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                          <div>
                            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">
                              Brand *
                            </label>
                            <select
                              name="brand_id"
                              id="brand_id"
                              value={formData.brand_id}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select a brand...</option>
                              {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                  {brand.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="sub_model_category_id" className="block text-sm font-medium text-gray-700">
                              Sub Model Category
                            </label>
                            <select
                              name="sub_model_category_id"
                              id="sub_model_category_id"
                              value={formData.sub_model_category_id}
                              onChange={handleInputChange}
                              disabled={!formData.brand_id}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="">Select a sub model category...</option>
                              {subModelCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="model_id" className="block text-sm font-medium text-gray-700">
                              Model
                            </label>
                            <select
                              name="model_id"
                              id="model_id"
                              value={formData.model_id}
                              onChange={handleInputChange}
                              disabled={!formData.sub_model_category_id}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="">Select a model...</option>
                              {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                  {model.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-6">
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
                      </div>

                      {/* Color Information Section */}
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Information</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="sneaker_color" className="block text-sm font-medium text-gray-700">
                              Sneaker Color
                            </label>
                            <input
                              type="text"
                              name="sneaker_color"
                              id="sneaker_color"
                              value={formData.sneaker_color}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Auto-filled from image"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Settings Section */}
                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                          <div className="flex items-center pt-6">
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
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-8">
                      {/* Image Upload Section */}
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sneaker Image</h3>

                        {!previewImage && !currentImageUrl ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors bg-white">
                            <input
                              type="file"
                              id="image-upload"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploadLoading}
                            />
                            <label
                              htmlFor="image-upload"
                              className={`cursor-pointer ${uploadLoading ? 'cursor-not-allowed' : ''}`}
                            >
                              {uploadLoading ? (
                                <div className="flex flex-col items-center">
                                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                  <p className="text-lg text-gray-600">Uploading...</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                  </svg>
                                  <p className="text-lg text-gray-600 mb-2">Click to upload sneaker image</p>
                                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                              )}
                            </label>
                          </div>
                        ) : (
                          <div className="relative bg-white rounded-lg p-4">
                            <img
                              src={previewImage || currentImageUrl}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-6 right-6 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                            <div className="mt-4 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewImage(null)
                                  setCurrentImageUrl(null)
                                  setFormData(prev => ({ ...prev, asset_id: '' }))
                                  document.getElementById('image-upload').click()
                                }}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Change Image
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-6">
                          <label htmlFor="preferred_color" className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Color *
                          </label>
                          <ColorDropdown
                            value={formData.preferred_color}
                            onChange={handleInputChange}
                            required={true}
                            colors={colorOptions}
                            name="preferred_color"
                            placeholder="Select a preferred color..."
                          />
                        </div>

                        <ExtractedColorManager
                          colors={colorPalette}
                          onChange={handleColorPaletteChange}
                        />

                        <input
                          type="hidden"
                          name="asset_id"
                          value={formData.asset_id}
                        />
                      </div>

                      {/* Color Sequence Collector Section */}
                      <div className="bg-indigo-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Sequences</h3>
                        <ColorSequenceCollector
                          defaultColors={colorOptions.map(color => ({
                            color_name: color.name,
                            color_code: color.value
                          }))}
                          onChange={handleColorSequencesChange}
                          value={formData.color_sequences}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Link
                      href={`/dashboard/sneakers/${id}`}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Sneaker'}
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