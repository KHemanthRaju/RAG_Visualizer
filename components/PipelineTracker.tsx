'use client'

import { motion } from 'framer-motion'
import { FileText, Scissors, Zap, Database, Search, Sparkles, CheckCircle, Circle } from 'lucide-react'

interface PipelineStage {
  id: string
  name: string
  icon: React.ReactNode
  status: 'pending' | 'active' | 'completed'
}

interface PipelineTrackerProps {
  stages: {
    document: boolean
    chunking: boolean
    embedding: boolean
    vectorDB: boolean
    query: boolean
    retrieval: boolean
    generation: boolean
  }
  activeStage: string | null
}

export default function PipelineTracker({ stages, activeStage }: PipelineTrackerProps) {
  const pipelineStages: PipelineStage[] = [
    {
      id: 'document',
      name: 'Document',
      icon: <FileText className="w-5 h-5" />,
      status: stages.document ? 'completed' : activeStage === 'document' ? 'active' : 'pending'
    },
    {
      id: 'chunking',
      name: 'Chunking',
      icon: <Scissors className="w-5 h-5" />,
      status: stages.chunking ? 'completed' : activeStage === 'chunking' ? 'active' : 'pending'
    },
    {
      id: 'embedding',
      name: 'Embedding',
      icon: <Zap className="w-5 h-5" />,
      status: stages.embedding ? 'completed' : activeStage === 'embedding' ? 'active' : 'pending'
    },
    {
      id: 'vectorDB',
      name: 'Vector DB',
      icon: <Database className="w-5 h-5" />,
      status: stages.vectorDB ? 'completed' : activeStage === 'vectorDB' ? 'active' : 'pending'
    },
    {
      id: 'query',
      name: 'Query',
      icon: <Search className="w-5 h-5" />,
      status: stages.query ? 'completed' : activeStage === 'query' ? 'active' : 'pending'
    },
    {
      id: 'retrieval',
      name: 'Retrieval',
      icon: <Database className="w-5 h-5" />,
      status: stages.retrieval ? 'completed' : activeStage === 'retrieval' ? 'active' : 'pending'
    },
    {
      id: 'generation',
      name: 'Generation',
      icon: <Sparkles className="w-5 h-5" />,
      status: stages.generation ? 'completed' : activeStage === 'generation' ? 'active' : 'pending'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-600'
      case 'active':
        return 'bg-blue-500 text-white border-blue-600 animate-pulse'
      default:
        return 'bg-gray-200 text-gray-500 border-gray-300'
    }
  }

  const getConnectorColor = (fromStatus: string, toStatus: string) => {
    if (fromStatus === 'completed' || toStatus === 'completed') {
      return 'bg-green-500'
    }
    if (fromStatus === 'active' || toStatus === 'active') {
      return 'bg-blue-500'
    }
    return 'bg-gray-300'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pipeline Progress</h2>
      <div className="flex items-center justify-between overflow-x-auto pb-4">
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${getStatusColor(stage.status)}`}
              >
                {stage.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  stage.icon
                )}
              </motion.div>
              <p className={`text-xs mt-2 font-medium ${
                stage.status === 'completed' ? 'text-green-600' :
                stage.status === 'active' ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {stage.name}
              </p>
            </div>
            {index < pipelineStages.length - 1 && (
              <div className="flex items-center mx-2">
                <div className={`h-1 w-16 rounded-full transition-all ${getConnectorColor(
                  pipelineStages[index].status,
                  pipelineStages[index + 1].status
                )}`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Completed</span>
        </div>
      </div>
    </div>
  )
}


