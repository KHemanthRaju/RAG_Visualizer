'use client'

import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'

interface DocumentInputProps {
  onSubmit: (text: string, chunkSize: number) => void
}

export default function DocumentInput({ onSubmit }: DocumentInputProps) {
  const [text, setText] = useState('')
  const [chunkSize, setChunkSize] = useState(200)
  const [isProcessing, setIsProcessing] = useState(false)

  const sampleDocuments = [
    {
      title: 'Machine Learning Basics',
      content: `Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on the development of computer programs that can access data and use it to learn for themselves. The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide.`
    },
    {
      title: 'Natural Language Processing',
      content: `Natural Language Processing (NLP) is a branch of artificial intelligence that helps computers understand, interpret and manipulate human language. NLP draws from many disciplines, including computer science and computational linguistics, in its pursuit to fill the gap between human communication and computer understanding. Modern NLP techniques are based on machine learning, especially deep learning models.`
    },
    {
      title: 'Retrieval-Augmented Generation',
      content: `Retrieval-Augmented Generation (RAG) is an AI framework that combines the power of information retrieval with text generation. RAG systems first retrieve relevant documents or passages from a knowledge base, then use this context to generate more accurate and informed responses. This approach helps language models access up-to-date information and reduces hallucinations by grounding responses in retrieved facts.`
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsProcessing(true)
    await onSubmit(text, chunkSize)
    setText('')
    setIsProcessing(false)
  }

  const loadSample = (sample: typeof sampleDocuments[0]) => {
    setText(sample.content)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your document text here or select a sample document below..."
            className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            disabled={isProcessing}
          />
          <div className="absolute top-2 right-2">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        {/* Chunk Size Configuration */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chunk Size (characters): {chunkSize}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="flex-1"
              disabled={isProcessing}
            />
            <input
              type="number"
              min="50"
              max="500"
              step="50"
              value={chunkSize}
              onChange={(e) => setChunkSize(Math.max(50, Math.min(500, Number(e.target.value))))}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              disabled={isProcessing}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Adjust chunk size to control how documents are split. Smaller chunks = more granular, larger chunks = more context.
          </p>
        </div>
        <button
          type="submit"
          disabled={!text.trim() || isProcessing}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {isProcessing ? 'Processing...' : 'Process Document'}
        </button>
      </form>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3 font-medium">Sample Documents:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sampleDocuments.map((doc, idx) => (
            <button
              key={idx}
              onClick={() => loadSample(doc)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <p className="font-semibold text-sm text-gray-800 mb-1">{doc.title}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{doc.content.substring(0, 100)}...</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

