'use client'

import { useState } from 'react'
import DocumentInput from '@/components/DocumentInput'
import ChunkingStage from '@/components/ChunkingStage'
import EmbeddingStage from '@/components/EmbeddingStage'
import VectorDBStage from '@/components/VectorDBStage'
import QueryStage from '@/components/QueryStage'
import RetrievalStage from '@/components/RetrievalStage'
import GenerationStage from '@/components/GenerationStage'
import PipelineTracker from '@/components/PipelineTracker'
import FlowConnector from '@/components/FlowConnector'
import { FileText, Scissors, Zap, Database, Search, Sparkles } from 'lucide-react'

export interface Chunk {
  id: string
  text: string
  index: number
}

export interface Embedding {
  chunkId: string
  vector: number[]
  dimension: number
}

export interface QueryResult {
  query: string
  relevantChunks: Chunk[]
  scores: number[]
}

export interface GenerationResult {
  prompt: string
  response: string
  context: string[]
}

export default function Home() {
  const [documents, setDocuments] = useState<string[]>([])
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [chunkSize, setChunkSize] = useState(200)
  const [embeddings, setEmbeddings] = useState<Embedding[]>([])
  const [isGeneratingEmbeddings, setIsGeneratingEmbeddings] = useState(false)
  const [isStoredInVectorDB, setIsStoredInVectorDB] = useState(false)
  const [isStoringInVectorDB, setIsStoringInVectorDB] = useState(false)
  const [query, setQuery] = useState('')
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null)
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const handleDocumentSubmit = async (text: string, size: number) => {
    setChunkSize(size)
    setDocuments([...documents, text])
    setActiveStage('chunking')
    
    // Chunking
    const response = await fetch('/api/chunk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, chunkSize: size }),
    })
    const data = await response.json()
    setChunks([...chunks, ...data.chunks])
    setActiveStage(null)
  }

  const handleGenerateEmbeddings = async () => {
    if (chunks.length === 0) return
    
    setIsGeneratingEmbeddings(true)
    setActiveStage('embedding')
    
    const embedResponse = await fetch('/api/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chunks }),
    })
    const embedData = await embedResponse.json()
    setEmbeddings([...embeddings, ...embedData.embeddings])
    setIsGeneratingEmbeddings(false)
    setActiveStage(null)
  }

  const handleStoreInVectorDB = async () => {
    if (embeddings.length === 0) return
    
    setIsStoringInVectorDB(true)
    setActiveStage('vectorDB')
    
    const response = await fetch('/api/vectordb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeddings }),
    })
    const data = await response.json()
    
    if (data.success) {
      setIsStoredInVectorDB(true)
    }
    setIsStoringInVectorDB(false)
    setActiveStage(null)
  }

  const handleQuery = async (queryText: string) => {
    if (!isStoredInVectorDB) {
      alert('Please store embeddings in Vector DB first!')
      return
    }
    
    setQuery(queryText)
    setActiveStage('retrieval')
    
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText, embeddings, chunks }),
    })
    const data = await response.json()
    setQueryResult(data)
    setActiveStage('generation')
    
    // Simulate generation
    setTimeout(async () => {
      const genResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, context: data.relevantChunks }),
      })
      const genData = await genResponse.json()
      setGenerationResult(genData)
      setActiveStage(null)
    }, 1500)
  }

  const resetPipeline = () => {
    setDocuments([])
    setChunks([])
    setChunkSize(200)
    setEmbeddings([])
    setIsStoredInVectorDB(false)
    setQuery('')
    setQueryResult(null)
    setGenerationResult(null)
    setActiveStage(null)
  }

  const pipelineStages = {
    document: documents.length > 0,
    chunking: chunks.length > 0,
    embedding: embeddings.length > 0,
    vectorDB: isStoredInVectorDB,
    query: query.length > 0,
    retrieval: queryResult !== null,
    generation: generationResult !== null,
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            RAG Process Visualizer
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Interactive demonstration of Retrieval-Augmented Generation pipeline
          </p>
          {documents.length > 0 && (
            <button
              onClick={resetPipeline}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset Pipeline
            </button>
          )}
        </div>

        {/* Pipeline Tracker */}
        <PipelineTracker stages={pipelineStages} activeStage={activeStage} />

        {/* Pipeline Stages */}
        <div className="space-y-8">
          {/* Stage 1: Document Input */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">1. Document Input</h2>
            </div>
            <DocumentInput onSubmit={handleDocumentSubmit} />
            {documents.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>{documents.length}</strong> document(s) loaded
                </p>
              </div>
            )}
          </div>

          <FlowConnector active={chunks.length > 0} />

          {/* Stage 2: Chunking */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            activeStage === 'chunking' ? 'border-yellow-400 animate-pulse' : 'border-yellow-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-semibold text-gray-800">2. Chunking</h2>
            </div>
            <ChunkingStage chunks={chunks} chunkSize={chunkSize} />
          </div>

          <FlowConnector active={embeddings.length > 0} />

          {/* Stage 3: Embedding */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            activeStage === 'embedding' ? 'border-purple-400 animate-pulse' : 'border-purple-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-800">3. Embedding Generation</h2>
            </div>
            <EmbeddingStage 
              embeddings={embeddings} 
              chunks={chunks}
              onGenerateEmbeddings={handleGenerateEmbeddings}
              isGenerating={isGeneratingEmbeddings}
            />
          </div>

          <FlowConnector active={isStoredInVectorDB} />

          {/* Stage 4: Vector DB Storage */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            activeStage === 'vectorDB' ? 'border-teal-400 animate-pulse' : 'border-teal-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-semibold text-gray-800">4. Vector Database Storage</h2>
            </div>
            <VectorDBStage 
              embeddings={embeddings}
              onStore={handleStoreInVectorDB}
              isStoring={isStoringInVectorDB}
              isStored={isStoredInVectorDB}
            />
          </div>

          <FlowConnector active={queryResult !== null} />

          {/* Stage 5: Query */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">5. Query Processing</h2>
            </div>
            <QueryStage onQuery={handleQuery} disabled={!isStoredInVectorDB} />
            {!isStoredInVectorDB && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Store embeddings in Vector DB first to enable querying
                </p>
              </div>
            )}
          </div>

          <FlowConnector active={queryResult !== null} />

          {/* Stage 6: Retrieval */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            activeStage === 'retrieval' ? 'border-orange-400 animate-pulse' : 'border-orange-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">6. Retrieval</h2>
            </div>
            <RetrievalStage queryResult={queryResult} />
          </div>

          <FlowConnector active={generationResult !== null} />

          {/* Stage 7: Generation */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            activeStage === 'generation' ? 'border-indigo-400 animate-pulse' : 'border-indigo-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">7. Generation</h2>
            </div>
            <GenerationStage generationResult={generationResult} />
          </div>
        </div>
      </div>
    </main>
  )
}
