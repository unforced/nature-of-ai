import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-5xl font-bold text-center">
          Nature of AI
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400">
          An AI-powered interactive version of The Nature of Code
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link href="/chapters" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">📚 Interactive Book</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Read the book with live, editable code examples
            </p>
          </Link>
          <Link href="/chat" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🤖 AI Assistant</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get help understanding concepts and debugging code
            </p>
          </Link>
          <Link href="/playground" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🎨 Code Playground</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create and share your own p5.js sketches
            </p>
          </Link>
        </div>
        <div className="text-center mt-12">
          <Link
            href="/chapters"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </main>
  );
}