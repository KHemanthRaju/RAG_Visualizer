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

// Cosine similarity calculation
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) return 0

  let dotProduct = 0
  let norm1 = 0
  let norm2 = 0

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i]
    norm1 += vec1[i] * vec1[i]
    norm2 += vec2[i] * vec2[i]
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))
}

// Simple query embedding (same as chunk embedding)
function generateEmbedding(text: string, dimension: number = 384): number[] {
  const hash = text.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)

  const vector: number[] = []
  for (let i = 0; i < dimension; i++) {
    const seed = (hash + i * 7919) % 2147483647
    const value = (seed / 2147483647) * 2 - 1
    vector.push(value)
  }

  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0))
  return vector.map(val => val / magnitude)
}

export async function POST(request: NextRequest) {
  try {
    const { query, embeddings, chunks } = await request.json()

    if (!query || !Array.isArray(embeddings) || !Array.isArray(chunks)) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // Generate query embedding
    const queryEmbedding = generateEmbedding(query, embeddings[0]?.dimension || 384)

    // Calculate similarities
    const similarities = embeddings.map((embedding: Embedding) => {
      const chunk = chunks.find((c: Chunk) => c.id === embedding.chunkId)
      if (!chunk) return { chunkId: embedding.chunkId, score: 0, chunk: null }

      const score = cosineSimilarity(queryEmbedding, embedding.vector)
      return { chunkId: embedding.chunkId, score, chunk }
    })

    // Sort by similarity and get top 3
    const topResults = similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(result => result.chunk !== null)

    const relevantChunks = topResults.map(result => result.chunk as Chunk)
    const scores = topResults.map(result => result.score)

    return NextResponse.json({
      query,
      relevantChunks,
      scores,
    })
  } catch (error) {
    console.error('Query error:', error)
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    )
  }
}


