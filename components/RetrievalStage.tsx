'use client'

import { QueryResult } from '@/app/page'
import { motion } from 'framer-motion'
import { Database, TrendingUp } from 'lucide-react'

interface RetrievalStageProps {
  queryResult: QueryResult | null
}

export default function RetrievalStage({ queryResult }: RetrievalStageProps) {
  if (!queryResult) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No retrieval results yet. Enter a query to see relevant chunks.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-orange-800">Query:</h3>
        </div>
        <p className="text-sm text-gray-700 italic">"{queryResult.query}"</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">
            <strong>{queryResult.relevantChunks.length}</strong> relevant chunks retrieved
          </p>
          <div className="flex items-center gap-2 text-xs text-orange-600">
            <TrendingUp className="w-4 h-4" />
            <span>Top-K Similarity Search</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {queryResult.relevantChunks.map((chunk, idx) => {
          const score = queryResult.scores[idx]
          return (
            <motion.div
              key={chunk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-1 rounded">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-xs text-gray-500">Chunk #{chunk.index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-orange-700">
                    Similarity: {(score * 100).toFixed(1)}%
                  </span>
                  <div className="w-24 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 100}%` }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">{chunk.text}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-orange-100 rounded-lg">
        <p className="text-xs text-orange-800">
          <strong>Retrieval Method:</strong> Cosine similarity search in vector space. The query is embedded and compared against all chunk embeddings to find the most relevant passages.
        </p>
      </div>
    </div>
  )
}


