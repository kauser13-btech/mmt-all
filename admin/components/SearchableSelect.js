'use client'

import { useState, useEffect, useRef } from 'react'

export default function SearchableSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  label,
  required = false,
  name,
  onSearch
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (searchQuery) {
      const filtered = options.filter(option =>
        option.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredOptions(filtered)

      // Call external search if provided
      if (onSearch) {
        onSearch(searchQuery)
      }
    } else {
      setFilteredOptions(options)
      if (onSearch) {
        onSearch('')
      }
    }
  }, [searchQuery, options])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.id == value)

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.id } })
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && '*'}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.title : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                autoFocus
              />
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                <ul>
                  <li
                    onClick={() => handleSelect({ id: '' })}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-500"
                  >
                    {placeholder}
                  </li>
                  {filteredOptions.map((option) => (
                    <li
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className={`px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm ${
                        value == option.id ? 'bg-blue-100 text-blue-900 font-medium' : 'text-gray-900'
                      }`}
                    >
                      {option.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
