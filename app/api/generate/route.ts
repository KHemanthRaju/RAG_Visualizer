import { NextRequest, NextResponse } from 'next/server'

interface Chunk {
  id: string
  text: string
  index: number
}

// Simple template-based generation
// In production, this would call an actual LLM API (OpenAI, Anthropic, etc.)
function generateResponse(query: string, context: Chunk[]): string {
  const contextText = context.map(c => c.text).join('\n\n')
  
  // Simple template-based response generation
  // Real implementation would use GPT-4, Claude, or similar
  const responses: Record<string, string> = {
    'machine learning': `Based on the retrieved context, machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves, identifying patterns to make better decisions in the future.`,
    'rag': `Retrieval-Augmented Generation (RAG) is an AI framework that combines information retrieval with text generation. RAG systems first retrieve relevant documents or passages from a knowledge base, then use this context to generate more accurate and informed responses. This approach helps language models access up-to-date information and reduces hallucinations by grounding responses in retrieved facts.`,
    'nlp': `Natural Language Processing (NLP) is a branch of artificial intelligence that helps computers understand, interpret and manipulate human language. NLP draws from many disciplines, including computer science and computational linguistics, in its pursuit to fill the gap between human communication and computer understanding. Modern NLP techniques are based on machine learning, especially deep learning models.`,
    'embedding': `Embeddings are high-dimensional vector representations of text that capture semantic meaning. Each chunk of text is converted to a vector in a continuous space where similar texts have similar vectors. This enables similarity search and allows the system to find relevant information by comparing vector distances.`,
  }

  const queryLower = query.toLowerCase()
  for (const [key, response] of Object.entries(responses)) {
    if (queryLower.includes(key)) {
      return response
    }
  }

  // Default response
  return `Based on the retrieved context, I can provide the following information:\n\n${contextText.substring(0, 300)}...\n\nThis information is derived from the documents you've processed through the RAG pipeline. The system retrieved the most relevant chunks based on semantic similarity to your query and generated this response using that context.`
}

export async function POST(request: NextRequest) {
  try {
    const { query, context } = await request.json()

    if (!query || !Array.isArray(context)) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    const response = generateResponse(query, context)
    const contextTexts = context.map((c: Chunk) => c.text)

    return NextResponse.json({
      prompt: query,
      response,
      context: contextTexts,
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}


