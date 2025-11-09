'use client'

import { useState, useEffect } from 'react'

export default function SvgColorEditor({ svg, onChange }) {
  const [parsedSvg, setParsedSvg] = useState('')
  const [colors, setColors] = useState([])
  const [selectedColorIndex, setSelectedColorIndex] = useState(null)

  useEffect(() => {
    if (svg) {
      extractColors(svg)
      setParsedSvg(svg)
    }
  }, [svg])

  const extractColors = (svgContent) => {
    // Enhanced regex to catch colors with or without quotes
    const colorRegex = /(fill|stroke)\s*=\s*["']?(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)["']?/gi
    const matches = [...svgContent.matchAll(colorRegex)]

    const uniqueColors = new Map()

    matches.forEach((match, index) => {
      const attribute = match[1].toLowerCase() // fill or stroke
      let color = match[2].trim()

      // Skip transparent and none
      if (color.toLowerCase() === 'none' || color.toLowerCase() === 'transparent') return

      const key = `${attribute}:${color.toLowerCase()}`
      if (!uniqueColors.has(key)) {
        uniqueColors.set(key, {
          attribute,
          originalColor: color,
          currentColor: color,
          occurrences: 1,
          id: uniqueColors.size
        })
      } else {
        uniqueColors.get(key).occurrences++
      }
    })

    setColors(Array.from(uniqueColors.values()))
  }

  const updateColor = (colorId, newColor) => {
    // Find the color being updated
    const colorToUpdate = colors.find(c => c.id === colorId)
    if (!colorToUpdate) return

    // Update SVG by replacing the current color value with new color
    let updatedSvg = parsedSvg || svg

    // Create regex to find all occurrences of this specific attribute with the current color
    const regex = new RegExp(
      `(${colorToUpdate.attribute})\\s*=\\s*["']?${escapeRegex(colorToUpdate.currentColor)}["']?`,
      'gi'
    )

    updatedSvg = updatedSvg.replace(regex, `$1="${newColor}"`)

    // Update the colors state
    const updatedColors = colors.map(c =>
      c.id === colorId ? { ...c, currentColor: newColor } : c
    )
    setColors(updatedColors)

    setParsedSvg(updatedSvg)
    onChange(updatedSvg)
  }

  const escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const resetColors = () => {
    setParsedSvg(svg)
    extractColors(svg)
    onChange(svg)
  }

  const getColorDisplay = (color) => {
    // Convert named colors or rgb to displayable format
    if (color.startsWith('#')) return color
    return color
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">SVG Color Editor</h3>
        {colors.length > 0 && (
          <button
            type="button"
            onClick={resetColors}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset Colors
          </button>
        )}
      </div>

      {colors.length === 0 ? (
        <div className="text-sm text-gray-500 italic">
          No editable colors found in SVG
        </div>
      ) : (
        <div className="space-y-3">
          {colors.map((colorInfo) => (
            <div
              key={colorInfo.id}
              onClick={() => setSelectedColorIndex(colorInfo.id)}
              className={`flex items-center gap-3 p-3 border-2 rounded-lg hover:border-gray-400 transition-colors cursor-pointer ${
                selectedColorIndex === colorInfo.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {colorInfo.attribute}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({colorInfo.occurrences} {colorInfo.occurrences === 1 ? 'use' : 'uses'})
                  </span>
                  {selectedColorIndex === colorInfo.id && (
                    <span className="text-xs font-medium text-blue-600">Selected</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border border-gray-300 shadow-sm"
                    style={{ backgroundColor: colorInfo.currentColor }}
                  />
                  <input
                    type="color"
                    value={colorInfo.currentColor.startsWith('#') ? colorInfo.currentColor : '#000000'}
                    onChange={(e) => {
                      e.stopPropagation()
                      updateColor(colorInfo.id, e.target.value)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colorInfo.currentColor}
                    onChange={(e) => {
                      e.stopPropagation()
                      updateColor(colorInfo.id, e.target.value)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SVG Preview */}
      {parsedSvg && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="border border-gray-300 rounded-lg p-8 bg-white flex items-center justify-center min-h-[200px]">
            <div
              className="svg-preview-container"
              dangerouslySetInnerHTML={{ __html: parsedSvg }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .svg-preview-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .svg-preview-container :global(svg) {
          max-width: 100%;
          max-height: 400px;
          width: auto;
          height: auto;
        }
      `}</style>

      {/* Color Presets */}
      {colors.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Colors</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Black', value: '#000000' },
              { name: 'White', value: '#FFFFFF' },
              { name: 'Red', value: '#EF4444' },
              { name: 'Blue', value: '#3B82F6' },
              { name: 'Green', value: '#10B981' },
              { name: 'Yellow', value: '#F59E0B' },
              { name: 'Purple', value: '#8B5CF6' },
              { name: 'Pink', value: '#EC4899' },
            ].map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => {
                  if (selectedColorIndex !== null) {
                    updateColor(selectedColorIndex, preset.value)
                  }
                }}
                className="group relative"
                title={preset.name}
              >
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-all hover:scale-110"
                  style={{ backgroundColor: preset.value }}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {selectedColorIndex === null
              ? 'Click on a color card above, then click a preset to apply it'
              : 'Click a preset color to apply it to the selected color'
            }
          </p>
        </div>
      )}
    </div>
  )
}
