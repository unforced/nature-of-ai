import Link from 'next/link';

export default function ChaptersIndexPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">The Nature of Code</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Select a chapter from the navigation to begin your journey into creative coding and simulation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Link
          href="/chapters/introduction"
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get started with the fundamentals of creative coding and simulation.
          </p>
        </Link>
        
        <Link
          href="/chapters/vectors"
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Chapter 1: Vectors</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn about vectors and how they form the foundation of motion.
          </p>
        </Link>
        
        <Link
          href="/chapters/forces"
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Chapter 2: Forces</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore Newton's laws and how forces affect motion.
          </p>
        </Link>
      </div>
    </div>
  );
}