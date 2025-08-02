'use client';

import { useEffect, useRef } from 'react';
import { usePlaygroundStore } from './store';

export function Preview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { code, isRunning, setError, addOutput, clearOutput } = usePlaygroundStore();

  useEffect(() => {
    if (!isRunning || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!iframeDoc) return;

    // Clear previous output
    clearOutput();
    setError(null);

    // Create the HTML content for the iframe
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            main {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }
          </style>
        </head>
        <body>
          <main></main>
          <script>
            // Override console methods to capture output
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
              window.parent.postMessage({
                type: 'console',
                method: 'log',
                args: args.map(arg => String(arg))
              }, '*');
              originalLog.apply(console, args);
            };
            
            console.error = function(...args) {
              window.parent.postMessage({
                type: 'console',
                method: 'error',
                args: args.map(arg => String(arg))
              }, '*');
              originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
              window.parent.postMessage({
                type: 'console',
                method: 'warn',
                args: args.map(arg => String(arg))
              }, '*');
              originalWarn.apply(console, args);
            };
            
            // Error handling
            window.addEventListener('error', (event) => {
              window.parent.postMessage({
                type: 'error',
                message: event.message,
                line: event.lineno,
                column: event.colno
              }, '*');
            });
            
            try {
              ${code}
            } catch (error) {
              window.parent.postMessage({
                type: 'error',
                message: error.message
              }, '*');
            }
          </script>
        </body>
      </html>
    `;

    // Write the HTML to the iframe
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
  }, [code, isRunning, setError, addOutput, clearOutput]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        const message = event.data.args.join(' ');
        addOutput(`[${event.data.method}] ${message}`);
      } else if (event.data.type === 'error') {
        setError(event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addOutput, setError]);

  return (
    <div className="h-full bg-white relative">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="p5.js Preview"
        sandbox="allow-scripts"
      />
      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Click "Run" to start the sketch</p>
        </div>
      )}
    </div>
  );
}