'use client'

import { useState, useEffect } from 'react'

export default function ExtractedColorManager({ colors, onChange }) {
  const [colorList, setColorList] = useState(colors || [])

  // Sync with incoming colors prop
  useEffect(() => {
    setColorList(colors || [])
  }, [colors])

  const updateColors = (newColorList) => {
    setColorList(newColorList)
    onChange(newColorList)
  }

  const handleColorChange = (index, newColor) => {
    const updatedColors = colorList.map((colorInfo, i) =>
      i === index ? { ...colorInfo, color: newColor } : colorInfo
    )
    updateColors(updatedColors)
  }

  const addNewColor = () => {
    const newColor = {
      name: `Custom Color ${colorList.length + 1}`,
      color: '#000000'
    }
    updateColors([...colorList, newColor])
  }

  const removeColor = (index) => {
    const updatedColors = colorList.filter((_, i) => i !== index)
    updateColors(updatedColors)
  }

  const handleNameChange = (index, newName) => {
    const updatedColors = colorList.map((colorInfo, i) =>
      i === index ? { ...colorInfo, name: newName } : colorInfo
    )
    updateColors(updatedColors)
  }

  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Sneaker Colors:</h4>
        <button
          type="button"
          onClick={addNewColor}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Add Color</span>
        </button>
      </div>

      {colorList.length > 0 ? (
        <div className="space-y-3">
          {colorList.map((colorInfo, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
              <div className="relative">
                <input
                  type="color"
                  value={colorInfo.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                  title="Change color"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={colorInfo.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="w-full text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Color name"
                />
              </div>

              <div className="text-xs text-gray-500 font-mono min-w-[60px]">
                {colorInfo.color.toUpperCase()}
              </div>

              <button
                type="button"
                onClick={() => removeColor(index)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove color"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Color Summary:</span> {colorList.map(c => c.name).join(', ')}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No colors extracted. Upload an image to detect colors automatically.</p>
        </div>
      )}
    </div>
  )
}