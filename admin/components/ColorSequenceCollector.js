'use client'

import { useState } from 'react'

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
)

export default function ColorSequenceCollector({
  defaultColors = [],
  onChange,
  value = []
}) {
  const [sequences, setSequences] = useState(value || [])
  const [isVisible, setIsVisible] = useState(false)

  const addSequence = () => {
    const newSequence = {
      id: Date.now(),
      color_name: '',
      color_code: '',
      color_sequence: []
    }
    const updatedSequences = [...sequences, newSequence]
    setSequences(updatedSequences)
    setIsVisible(true)
    onChange(updatedSequences)
  }

  const removeSequence = (sequenceId) => {
    const updatedSequences = sequences.filter(seq => seq.id !== sequenceId)
    setSequences(updatedSequences)
    if (updatedSequences.length === 0) {
      setIsVisible(false)
    }
    onChange(updatedSequences)
  }

  const updateSequence = (sequenceId, updates) => {
    const updatedSequences = sequences.map(seq =>
      seq.id === sequenceId ? { ...seq, ...updates } : seq
    )
    setSequences(updatedSequences)
    onChange(updatedSequences)
  }

  const handleDefaultColorSelect = (sequenceId, colorName, colorCode, setIsOpen) => {
    updateSequence(sequenceId, { color_name: colorName, color_code: colorCode })
    setIsOpen(false)
  }

  const handleColorChange = (sequenceId, colorIndex, newColor) => {
    const sequence = sequences.find(seq => seq.id === sequenceId)
    const updatedColorSequence = sequence.color_sequence.map((color, i) =>
      i === colorIndex ? newColor : color
    )
    updateSequence(sequenceId, { color_sequence: updatedColorSequence })
  }

  const addColorToSequence = (sequenceId) => {
    const sequence = sequences.find(seq => seq.id === sequenceId)
    const updatedColorSequence = [...sequence.color_sequence, '#000000']
    updateSequence(sequenceId, { color_sequence: updatedColorSequence })
  }

  const removeColorFromSequence = (sequenceId, colorIndex) => {
    const sequence = sequences.find(seq => seq.id === sequenceId)
    const updatedColorSequence = sequence.color_sequence.filter((_, i) => i !== colorIndex)
    updateSequence(sequenceId, { color_sequence: updatedColorSequence })
  }

  return (
    <div className="space-y-4">
      {/* Color Sequences */}
      {isVisible && sequences.length > 0 && (
        <div className="space-y-6">
          {sequences.map((sequence, sequenceIndex) => (
            <ColorSequenceItem
              key={sequence.id}
              sequence={sequence}
              sequenceIndex={sequenceIndex}
              defaultColors={defaultColors}
              onDefaultColorSelect={handleDefaultColorSelect}
              onColorChange={handleColorChange}
              onAddColor={addColorToSequence}
              onRemoveColor={removeColorFromSequence}
              onRemoveSequence={removeSequence}
            />
          ))}
        </div>
      )}

      {/* Add Sequence Button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={addSequence}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Add Sequence</span>
        </button>
      </div>
    </div>
  )
}

function ColorSequenceItem({
  sequence,
  sequenceIndex,
  defaultColors,
  onDefaultColorSelect,
  onColorChange,
  onAddColor,
  onRemoveColor,
  onRemoveSequence
}) {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false)

  const selectedDefaultColor = defaultColors.find(color => color.color_code === sequence.color_code)

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">
          Color Sequence {sequenceIndex + 1}
        </h4>
        <button
          type="button"
          onClick={() => onRemoveSequence(sequence.id)}
          className="text-red-500 hover:text-red-700 p-1"
          title="Remove sequence"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Default Color Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Color
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDefaultOpen(!isDefaultOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <div className="flex items-center gap-3">
                {selectedDefaultColor ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedDefaultColor.color_code }}
                    ></div>
                    <span className="text-gray-700">{selectedDefaultColor.color_name}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Select a default color...</span>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${isDefaultOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDefaultOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                <div className="py-1">
                  {defaultColors.map((color) => (
                    <button
                      key={color.color_code}
                      type="button"
                      onClick={() => onDefaultColorSelect(sequence.id, color.color_name, color.color_code, setIsDefaultOpen)}
                      className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 text-left focus:outline-none focus:bg-gray-50"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300"
                        style={{ backgroundColor: color.color_code }}
                      ></div>
                      <span className="text-gray-700">{color.color_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Options */}
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Color Options
            </label>
          </div>

          {sequence.color_sequence.length > 0 ? (
            <div className="space-y-2">
              {sequence.color_sequence.map((color, colorIndex) => (
                <div key={colorIndex} className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => onColorChange(sequence.id, colorIndex, e.target.value)}
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    title="Pick a color"
                  />

                  <div className="flex-1 text-sm font-mono text-gray-600">
                    {color.toUpperCase()}
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveColor(sequence.id, colorIndex)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove color"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-sm">No color options added. Click "Add Color" to start.</p>
            </div>
          )}

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onAddColor(sequence.id)}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add Color</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}