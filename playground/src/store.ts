import { create } from 'zustand';

interface PlaygroundState {
  code: string;
  isRunning: boolean;
  output: string[];
  error: string | null;
  theme: 'light' | 'dark';
  
  setCode: (code: string) => void;
  setRunning: (running: boolean) => void;
  addOutput: (line: string) => void;
  clearOutput: () => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  reset: () => void;
}

const defaultCode = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Draw a circle that follows the mouse
  fill(100, 150, 250);
  noStroke();
  circle(mouseX, mouseY, 50);
}`;

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: defaultCode,
  isRunning: false,
  output: [],
  error: null,
  theme: 'dark',
  
  setCode: (code) => set({ code }),
  setRunning: (running) => set({ isRunning: running }),
  addOutput: (line) => set((state) => ({ output: [...state.output, line] })),
  clearOutput: () => set({ output: [] }),
  setError: (error) => set({ error }),
  setTheme: (theme) => set({ theme }),
  reset: () => set({
    code: defaultCode,
    isRunning: false,
    output: [],
    error: null,
  }),
}));