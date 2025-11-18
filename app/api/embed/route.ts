import { NextRequest, NextResponse } from 'next/server'

interface Chunk {
  id: string
  text: string
  index: number
}

interface Embedding {
  chunkId: string
  vector: number[]
  dimension: number
}

// Simple hash-based embedding simulation
// In production, this would call an actual embedding API
function generateEmbedding(text: string, dimension: number = 384): number[] {
  // Create a deterministic "embedding" based on text hash
  // This is just for demonstration - real embeddings use neural networks
  const hash = text.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)

  const vector: number[] = []
  for (let i = 0; i < dimension; i++) {
    // Generate pseudo-random values based on hash and position
    const seed = (hash + i * 7919) % 2147483647
    const value = (seed / 2147483647) * 2 - 1 // Normalize to [-1, 1]
    vector.push(value)
  }

  // Normalize the vector
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0))
  return vector.map(val => val / magnitude)
}

export async function POST(request: NextRequest) {
  try {
    const { chunks } = await request.json()

    if (!Array.isArray(chunks) || chunks.length === 0) {
      return NextResponse.json(
        { error: 'Invalid chunks input' },
        { status: 400 }
      )
    }

    const dimension = 384 // Standard embedding dimension
    const embeddings: Embedding[] = chunks.map((chunk: Chunk) => ({
      chunkId: chunk.id,
      vector: generateEmbedding(chunk.text, dimension),
      dimension,
    }))

    return NextResponse.json({ embeddings })
  } catch (error) {
    console.error('Embedding error:', error)
    return NextResponse.json(
      { error: 'Failed to generate embeddings' },
      { status: 500 }
    )
  }
}


