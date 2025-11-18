'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FlowConnectorProps {
  active: boolean
}

export default function FlowConnector({ active }: FlowConnectorProps) {
  return (
    <div className="flex justify-center my-4">
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown 
            className={`w-8 h-8 ${active ? 'text-green-500' : 'text-gray-300'}`} 
          />
        </motion.div>
        <div className={`h-8 w-0.5 ${active ? 'bg-green-500' : 'bg-gray-300'}`} />
      </motion.div>
    </div>
  )
}


