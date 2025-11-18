'use client'

import { useState } from 'react'
import { Search, Send } from 'lucide-react'

interface QueryStageProps {
  onQuery: (query: string) => void
  disabled?: boolean
}

export default function QueryStage({ onQuery, disabled = false }: QueryStageProps) {
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const sampleQueries = [
    'What is machine learning?',
    'How does RAG work?',
    'Explain natural language processing',
    'What are embeddings?'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsProcessing(true)
    await onQuery(query)
    setIsProcessing(false)
  }

  const loadSample = (sampleQuery: string) => {
    setQuery(sampleQuery)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here..."
            className="w-full p-4 pr-12 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            disabled={isProcessing || disabled}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          disabled={!query.trim() || isProcessing || disabled}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {isProcessing ? 'Processing Query...' : 'Search & Generate'}
        </button>
      </form>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3 font-medium">Sample Queries:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((sampleQuery, idx) => (
            <button
              key={idx}
              onClick={() => loadSample(sampleQuery)}
              className="px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-gray-700"
            >
              {sampleQuery}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

