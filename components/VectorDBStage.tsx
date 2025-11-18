'use client'

import { Embedding } from '@/app/page'
import { motion } from 'framer-motion'
import { Database, Save, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface VectorDBStageProps {
  embeddings: Embedding[]
  onStore: () => Promise<void>
  isStoring: boolean
  isStored: boolean
}

export default function VectorDBStage({ embeddings, onStore, isStoring, isStored }: VectorDBStageProps) {
  const canStore = embeddings.length > 0 && !isStored

  if (embeddings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No embeddings to store. Generate embeddings first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isStored ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-teal-50 border-2 border-teal-300 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-teal-600" />
            <h3 className="font-semibold text-teal-800 text-lg">Successfully Stored in Vector DB</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Vectors Stored:</span>
              <span className="font-semibold text-teal-700">{embeddings.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-teal-700">Ready for Query</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-sm text-teal-800">Vector Database Storage</h3>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Embeddings Ready:</span>
                <span className="font-semibold text-teal-700">{embeddings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vector Dimension:</span>
                <span className="font-semibold text-teal-700">{embeddings[0]?.dimension || 0}</span>
              </div>
            </div>
            <button
              onClick={onStore}
              disabled={isStoring || !canStore}
              className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isStoring ? 'Storing in Vector DB...' : 'Store in Vector Database'}
            </button>
          </div>

          <div className="p-3 bg-teal-100 rounded-lg">
            <p className="text-xs text-teal-800">
              <strong>Vector Database:</strong> Embeddings are stored in a vector database (e.g., Pinecone, Weaviate, Qdrant) for efficient similarity search and retrieval.
            </p>
          </div>
        </>
      )}
    </div>
  )
}


