'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

interface CodeBlockProps {
  code: string;
  language: string;
  caption?: string;
}

export function CodeBlock({ code, language, caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: 'context',
        role: 'system',
        content: `You are helping with this code:\n\`\`\`${language}\n${code}\n\`\`\``
      }
    ]
  });

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInPlayground = () => {
    // Store code in sessionStorage and navigate to playground
    sessionStorage.setItem('playgroundCode', code);
    window.open('/playground', '_blank');
  };

  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {caption && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium">{caption}</p>
        </div>
      )}
      
      <div className="relative">
        <pre className="p-4 overflow-x-auto bg-gray-900 text-gray-100">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            title="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
          <button
            onClick={openInPlayground}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 rounded transition-colors"
            title="Open in playground"
          >
            Run
          </button>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-500 rounded transition-colors"
            title="Ask AI about this code"
          >
            Ask AI
          </button>
        </div>
      </div>
      
      {showChat && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
            {messages.slice(1).map((message) => (
              <div
                key={message.id}
                className={`p-2 rounded ${
                  message.role === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900 ml-8' 
                    : 'bg-gray-100 dark:bg-gray-700 mr-8'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about this code..."
              className="flex-1 px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}