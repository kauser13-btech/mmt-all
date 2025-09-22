'use client'

import { useState } from 'react'

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
)

export default function ColorDropdown({
  value,
  onChange,
  required = false,
  colors = [],
  placeholder = "Select a color...",
  name = "color"
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleColorSelect = (colorName) => {
    onChange({ target: { name, value: colorName } })
    setIsOpen(false)
  }

  const selectedColorData = colors.find(color => color.name === value)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center gap-3">
          {selectedColorData ? (
            <>
              <div className={`w-4 h-4 rounded-full ${selectedColorData.bgClass}`}></div>
              <span className="text-gray-700">{selectedColorData.name}</span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="py-1">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorSelect(color.name)}
                className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 text-left focus:outline-none focus:bg-gray-50"
              >
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${color.bgClass}`}></div>
                <span className="text-gray-700">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}