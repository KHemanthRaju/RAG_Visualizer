'use client'

import { Chunk } from '@/app/page'
import { motion } from 'framer-motion'

interface ChunkingStageProps {
  chunks: Chunk[]
  chunkSize?: number
}

export default function ChunkingStage({ chunks, chunkSize = 200 }: ChunkingStageProps) {
  if (chunks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No chunks yet. Process a document to see chunking in action.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          <strong>{chunks.length}</strong> chunks created
        </p>
        <div className="text-xs text-gray-500">
          Chunk size: ~{chunkSize} characters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {chunks.map((chunk, idx) => (
          <motion.div
            key={chunk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                Chunk #{chunk.index + 1}
              </span>
              <span className="text-xs text-gray-500">{chunk.text.length} chars</span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-4">{chunk.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Chunking Strategy:</strong> Fixed-size chunks with overlap to preserve context across boundaries.
        </p>
      </div>
    </div>
  )
}

