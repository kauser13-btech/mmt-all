import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const createFetchConfig = (options = {}) => {
  const token = Cookies.get('token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

const handleResponse = async (response) => {
  if (response.status === 401) {
    Cookies.remove('token')
    Cookies.remove('user')
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`)
    error.response = {
      status: response.status,
      statusText: response.statusText,
      data: await response.json().catch(() => ({}))
    }
    throw error
  }

  return response.json()
}

const api = {
  get: async (url, options = {}) => {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}${url}`, createFetchConfig({
      method: 'GET',
      ...options,
    }))
    return { data: await handleResponse(response) }
  },

  post: async (url, data, options = {}) => {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}${url}`, createFetchConfig({
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    }))
    return { data: await handleResponse(response) }
  },

  put: async (url, data, options = {}) => {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}${url}`, createFetchConfig({
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    }))
    return { data: await handleResponse(response) }
  },

  delete: async (url, options = {}) => {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}${url}`, createFetchConfig({
      method: 'DELETE',
      ...options,
    }))
    return { data: await handleResponse(response) }
  },
}

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials)
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
      Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 })
    }
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/register', userData)
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
      Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 })
    }
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      Cookies.remove('token')
      Cookies.remove('user')
    }
  },

  user: async () => {
    const response = await api.get('/user')
    return response.data
  },

  csrf: async () => {
    await fetch(`${API_URL.replace('/api', '')}sanctum/csrf-cookie`, {
      credentials: 'include',
    })
  }
}

export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  getRecentActivity: async () => {
    const response = await api.get('/dashboard/activity')
    return response.data
  },

  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`)
    return response.data
  }
}

export const sneakersAPI = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({ page, limit })
    if (search) params.append('search', search)
    const response = await api.get(`/sneakers?${params.toString()}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/sneakers/${id}`)
    return response.data
  },

  create: async (sneakerData) => {
    const response = await api.post('/sneakers', sneakerData)
    return response.data
  },

  update: async (id, sneakerData) => {
    const response = await api.put(`/sneakers/${id}`, sneakerData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/sneakers/${id}`)
    return response.data
  }
}

export const categoriesAPI = {
  getBrands: async () => {
    const response = await api.get('/categories/brands')
    return response.data
  },

  getSubModelCategories: async (brandId) => {
    const response = await api.get(`/categories/sub-model-categories?brand_id=${brandId}`)
    return response.data
  },

  getModels: async (subModelCategoryId) => {
    const response = await api.get(`/categories/models?sub_model_category_id=${subModelCategoryId}`)
    return response.data
  },

  getAll: async (typeId, parentId) => {
    const params = new URLSearchParams()
    if (typeId) params.append('type_id', typeId)
    if (parentId !== undefined) params.append('parent_id', parentId)
    const response = await api.get(`/categories?${params.toString()}`)
    return response.data
  }
}

export const assetsAPI = {
  upload: async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const token = Cookies.get('token')
    const response = await fetch(`${API_URL.replace(/\/$/, '')}/assets/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: formData,
    })

    if (response.status === 401) {
      Cookies.remove('token')
      Cookies.remove('user')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`)
      error.response = {
        status: response.status,
        statusText: response.statusText,
        data: await response.json().catch(() => ({}))
      }
      throw error
    }

    return response.json()
  },

  getAll: async (page = 1, limit = 20, search = '') => {
    const params = new URLSearchParams({ page, limit })
    if (search) params.append('search', search)
    const response = await api.get(`/assets?${params.toString()}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/assets/${id}`)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/assets/${id}`)
    return response.data
  }
}

export default api