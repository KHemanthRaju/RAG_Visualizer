import { NextRequest, NextResponse } from 'next/server'

interface Chunk {
  id: string
  text: string
  index: number
}

export async function POST(request: NextRequest) {
  try {
    const { text, chunkSize = 200 } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid text input' },
        { status: 400 }
      )
    }

    const size = Math.max(50, Math.min(500, Number(chunkSize) || 200))

    // Simple chunking strategy: split by sentences, then group into chunks of specified size
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const chunks: Chunk[] = []
    let currentChunk = ''
    let chunkIndex = 0

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > size && currentChunk.length > 0) {
        chunks.push({
          id: `chunk-${chunkIndex}`,
          text: currentChunk.trim(),
          index: chunkIndex,
        })
        currentChunk = sentence
        chunkIndex++
      } else {
        currentChunk += sentence + ' '
      }
    }

    // Add the last chunk
    if (currentChunk.trim().length > 0) {
      chunks.push({
        id: `chunk-${chunkIndex}`,
        text: currentChunk.trim(),
        index: chunkIndex,
      })
    }

    // Ensure at least one chunk
    if (chunks.length === 0) {
      chunks.push({
        id: 'chunk-0',
        text: text.trim(),
        index: 0,
      })
    }

    return NextResponse.json({ chunks })
  } catch (error) {
    console.error('Chunking error:', error)
    return NextResponse.json(
      { error: 'Failed to chunk document' },
      { status: 500 }
    )
  }
}

