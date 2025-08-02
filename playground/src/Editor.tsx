'use client';

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { usePlaygroundStore } from './store';

export function Editor() {
  const { code, setCode, theme } = usePlaygroundStore();

  return (
    <div className="h-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          rulers: [],
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}