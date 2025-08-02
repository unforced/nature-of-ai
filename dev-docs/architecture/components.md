# Component Architecture

## Overview

The Nature of AI platform uses a component-based architecture with React and Next.js. Components are organized by feature and responsibility.

## Component Structure

```
app/components/
├── book/                    # Book reading components
│   ├── ChapterNavigation.tsx   # Sidebar navigation
│   ├── ChapterContent.tsx      # Chapter display
│   └── CodeBlock.tsx           # Interactive code blocks
├── playground/              # Code editor components
│   ├── Editor.tsx              # Monaco editor wrapper
│   ├── Preview.tsx             # p5.js preview
│   └── Console.tsx             # Output console
├── ai/                      # AI chat components
│   ├── Chat.tsx                # Main chat interface
│   ├── Message.tsx             # Chat message
│   └── ContextProvider.tsx     # AI context management
└── common/                  # Shared components
    ├── Layout.tsx              # App layout
    ├── Navigation.tsx          # Top navigation
    └── Loading.tsx             # Loading states
```

## Key Components

### ChapterNavigation
**Location**: `/app/components/book/ChapterNavigation.tsx`
**Purpose**: Provides sidebar navigation for book chapters
**Features**:
- Collapsible on mobile
- Active chapter highlighting
- Section navigation within chapters
- Responsive design

### CodeBlock
**Location**: `/app/components/book/CodeBlock.tsx`
**Purpose**: Display and interact with code examples
**Features**:
- Syntax highlighting
- Copy to clipboard
- Open in playground
- Inline AI chat
- Error handling

### ChapterContent
**Location**: `/app/components/book/ChapterContent.tsx`
**Purpose**: Render chapter content with code examples
**Features**:
- Markdown rendering
- Code block extraction
- Loading states
- Error boundaries

## Component Guidelines

### 1. File Organization
```typescript
// Component file structure
import statements
type definitions
component implementation
export statement
```

### 2. Props Interface
```typescript
interface ComponentProps {
  required: string;
  optional?: number;
  children?: React.ReactNode;
  onAction?: (value: string) => void;
}
```

### 3. State Management
- Use `useState` for local state
- Use Context API for cross-component state
- Use Zustand for global app state
- Keep state as close to usage as possible

### 4. Performance Optimization
```typescript
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensive(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedComponent = memo(Component);
```

### 5. Error Handling
```typescript
// Use error boundaries
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }
}

// Handle async errors
try {
  const data = await fetchData();
} catch (error) {
  setError(error.message);
}
```

## Styling Guidelines

### 1. Tailwind Classes
```tsx
// Use semantic grouping
<div className="
  flex items-center justify-between
  p-4 mx-auto max-w-4xl
  bg-white dark:bg-gray-900
  border rounded-lg shadow-sm
  hover:shadow-md transition-shadow
">
```

### 2. Responsive Design
```tsx
// Mobile-first approach
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4 md:gap-6
">
```

### 3. Dark Mode
```tsx
// Always provide dark mode variants
<div className="
  text-gray-900 dark:text-gray-100
  bg-white dark:bg-gray-900
">
```

## Accessibility

### 1. Semantic HTML
```tsx
<nav aria-label="Chapter navigation">
  <ul>
    <li><a href="/chapter-1">Chapter 1</a></li>
  </ul>
</nav>
```

### 2. ARIA Labels
```tsx
<button
  aria-label="Copy code to clipboard"
  aria-pressed={copied}
  onClick={handleCopy}
>
  {copied ? 'Copied!' : 'Copy'}
</button>
```

### 3. Keyboard Navigation
```tsx
// Support keyboard interactions
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
```

## Testing Strategy

### 1. Unit Tests
```typescript
// Test component logic
describe('CodeBlock', () => {
  it('copies code to clipboard', async () => {
    const { getByText } = render(<CodeBlock code="test" />);
    fireEvent.click(getByText('Copy'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });
});
```

### 2. Integration Tests
```typescript
// Test component interactions
describe('ChapterNavigation', () => {
  it('highlights active chapter', () => {
    const { getByText } = render(
      <ChapterNavigation activeChapter="vectors" />
    );
    expect(getByText('Vectors')).toHaveClass('bg-blue-100');
  });
});
```

### 3. E2E Tests
```typescript
// Test complete user flows
test('user can navigate chapters', async ({ page }) => {
  await page.goto('/chapters');
  await page.click('text=Vectors');
  await expect(page).toHaveURL('/chapters/vectors');
});
```

## Future Components

### Planned Components
1. **SketchGallery**: Display user-created sketches
2. **ProgressTracker**: Show learning progress
3. **CodeDiff**: Compare code versions
4. **ShareModal**: Share sketches socially
5. **UserProfile**: User settings and stats

### Component Roadmap
- Week 3: AI chat enhancements
- Week 4: User authentication components
- Week 5: Social features
- Week 6: Performance monitoring