# RAG Process Visualizer

An interactive web application that demonstrates the Retrieval-Augmented Generation (RAG) pipeline. Visualize how documents are processed through chunking, embedding, and intelligent querying.

## Features

- **Document Processing**: Upload or input documents to process
- **Chunking Visualization**: See how documents are split into manageable chunks
- **Embedding Generation**: Visualize vector embeddings created from chunks
- **Query Processing**: Enter queries to search through the knowledge base
- **Retrieval Visualization**: See how relevant chunks are retrieved based on similarity
- **Response Generation**: View generated responses grounded in retrieved context

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Document Input**: Enter text or select a sample document
2. **Chunking**: Documents are split into smaller chunks (~200 characters)
3. **Embedding**: Each chunk is converted to a high-dimensional vector
4. **Query**: Enter a question or query
5. **Retrieval**: The system finds the most relevant chunks using cosine similarity
6. **Generation**: A response is generated using the retrieved context

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons

## Project Structure

```
├── app/
│   ├── api/          # API routes for RAG processing
│   ├── page.tsx      # Main application page
│   └── layout.tsx    # Root layout
├── components/       # React components for each stage
└── public/          # Static assets
```

## Notes

This is a demonstration application. The embedding and generation functions use simplified implementations for visualization purposes. In production, you would integrate with:
- Real embedding models (OpenAI, Cohere, etc.)
- Vector databases (Pinecone, Weaviate, etc.)
- LLM APIs (OpenAI GPT, Anthropic Claude, etc.)

## License

MIT


