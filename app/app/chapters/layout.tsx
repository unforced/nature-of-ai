import { ChapterNavigation } from '@/components/book/ChapterNavigation';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function ChaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="flex h-screen">
        <ChapterNavigation />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}