'use client'

import { Embedding, Chunk } from '@/app/page'
import { motion } from 'framer-motion'
import { Zap, Play } from 'lucide-react'

interface EmbeddingStageProps {
  embeddings: Embedding[]
  chunks: Chunk[]
  onGenerateEmbeddings: () => Promise<void>
  isGenerating: boolean
}

export default function EmbeddingStage({ embeddings, chunks, onGenerateEmbeddings, isGenerating }: EmbeddingStageProps) {
  const canGenerate = chunks.length > 0 && embeddings.length === 0

  if (embeddings.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">No embeddings yet. Generate embeddings from chunks.</p>
          {chunks.length > 0 ? (
            <button
              onClick={onGenerateEmbeddings}
              disabled={isGenerating || !canGenerate}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              {isGenerating ? 'Generating Embeddings...' : 'Generate Embeddings'}
            </button>
          ) : (
            <p className="text-sm text-gray-400">Process documents first to create chunks.</p>
          )}
        </div>
      </div>
    )
  }

  const sampleEmbedding = embeddings[0]
  const vectorPreview = sampleEmbedding.vector.slice(0, 10)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          <strong>{embeddings.length}</strong> embeddings generated
        </p>
        <div className="text-xs text-gray-500">
          Dimension: {sampleEmbedding.dimension}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-sm text-purple-800">Vector Representation</h3>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-600 mb-2">Sample vector (first 10 dimensions):</p>
            <div className="flex flex-wrap gap-1">
              {vectorPreview.map((val, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded font-mono"
                >
                  {val.toFixed(3)}
                </motion.span>
              ))}
              <span className="px-2 py-1 bg-purple-300 text-purple-800 text-xs rounded">
                ...
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-sm text-purple-800 mb-3">Embedding Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Vectors:</span>
              <span className="font-semibold text-purple-700">{embeddings.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vector Dimension:</span>
              <span className="font-semibold text-purple-700">{sampleEmbedding.dimension}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-semibold text-purple-700">text-embedding-ada-002</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-100 rounded-lg">
        <p className="text-xs text-purple-800">
          <strong>Embedding Model:</strong> Each chunk is converted to a high-dimensional vector that captures semantic meaning, enabling similarity search.
        </p>
      </div>
    </div>
  )
}

