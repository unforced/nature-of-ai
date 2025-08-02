'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePlaygroundStore } from '@nature-of-ai/playground/store';

// Dynamic imports to avoid SSR issues with Monaco
const Editor = dynamic(
  () => import('@nature-of-ai/playground/editor').then(mod => ({ default: mod.Editor })),
  { ssr: false, loading: () => <div className="h-full flex items-center justify-center">Loading editor...</div> }
);

const Preview = dynamic(
  () => import('@nature-of-ai/playground/preview').then(mod => ({ default: mod.Preview })),
  { ssr: false, loading: () => <div className="h-full flex items-center justify-center">Loading preview...</div> }
);

export default function PlaygroundPage() {
  const { isRunning, setRunning, output, error, clearOutput, reset, setCode } = usePlaygroundStore();
  const [showConsole, setShowConsole] = useState(false);

  // Load code from sessionStorage if available (from code blocks)
  useEffect(() => {
    const savedCode = sessionStorage.getItem('playgroundCode');
    if (savedCode) {
      setCode(savedCode);
      sessionStorage.removeItem('playgroundCode');
    }
  }, [setCode]);

  const handleRun = () => {
    clearOutput();
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">p5.js Playground</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={showConsole ? () => setShowConsole(false) : () => setShowConsole(true)}
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            {showConsole ? 'Hide' : 'Show'} Console
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Reset
          </button>
          {isRunning ? (
            <button
              onClick={handleStop}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-medium transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
            >
              Run
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="w-1/2 border-r border-gray-300">
          <Editor />
        </div>

        {/* Preview and Console */}
        <div className="w-1/2 flex flex-col">
          <div className={showConsole ? 'h-2/3' : 'h-full'}>
            <Preview />
          </div>
          
          {showConsole && (
            <div className="h-1/3 border-t border-gray-300 bg-gray-900 text-gray-100 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold mb-2">Console Output</h3>
              {error && (
                <div className="text-red-400 mb-2">
                  Error: {error}
                </div>
              )}
              {output.length === 0 && !error ? (
                <p className="text-gray-500 text-sm">No output yet...</p>
              ) : (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <div key={index} className="text-sm font-mono">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}