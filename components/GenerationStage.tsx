'use client'

import { GenerationResult } from '@/app/page'
import { motion } from 'framer-motion'
import { Sparkles, FileText } from 'lucide-react'

interface GenerationStageProps {
  generationResult: GenerationResult | null
}

export default function GenerationStage({ generationResult }: GenerationStageProps) {
  if (!generationResult) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No generation yet. Complete retrieval to see the final answer.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Generated Response */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-800 text-lg">Generated Response</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {generationResult.response}
            </p>
          </div>
        </motion.div>

        {/* Context Used */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-800">Context Used</h3>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {generationResult.context.map((context, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 bg-white border border-indigo-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    Context #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">{context}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-indigo-100 rounded-lg">
        <p className="text-xs text-indigo-800 mb-2">
          <strong>Generation Process:</strong>
        </p>
        <ul className="text-xs text-indigo-700 space-y-1 list-disc list-inside">
          <li>The retrieved chunks are combined into a context window</li>
          <li>The language model generates a response based on the query and context</li>
          <li>The response is grounded in the retrieved information, reducing hallucinations</li>
          <li>Citations can be traced back to the source chunks</li>
        </ul>
      </div>
    </div>
  )
}


