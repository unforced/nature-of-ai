# Testing Strategy

## Overview

Our testing approach follows the testing pyramid principle with a focus on reliability and maintainability.

```
         /\
        /  \  E2E Tests (Playwright)
       /----\
      /      \  Integration Tests (API)
     /--------\
    /          \  Unit Tests (Jest)
   /____________\
```

## Test Types

### 1. Unit Tests
**Tools**: Jest, React Testing Library
**Location**: `tests/unit/`, co-located with components
**Coverage Target**: 80%

#### What to Test
- Pure functions and utilities
- React component logic
- State management
- Data transformations
- Error handling

#### Example
```typescript
// tests/unit/components/Chat.test.tsx
describe('Chat Component', () => {
  it('renders input field', () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText(/ask about/i)).toBeInTheDocument();
  });
});
```

### 2. Integration Tests
**Tools**: Jest, MSW for API mocking
**Location**: `tests/integration/`
**Coverage Target**: 70%

#### What to Test
- API route handlers
- Database operations
- External service integrations
- Complex workflows

#### Example
```typescript
// tests/integration/api/chat.test.ts
describe('Chat API', () => {
  it('streams AI response', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' })
    });
    expect(response.headers.get('content-type')).toContain('text/event-stream');
  });
});
```

### 3. E2E Tests
**Tools**: Playwright
**Location**: `tests/e2e/`
**Coverage Target**: Critical user paths

#### What to Test
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness
- Performance metrics

#### Test Scenarios
1. **Book Reading Flow**
   - Navigate to chapter
   - View code examples
   - Run code in playground

2. **AI Interaction Flow**
   - Ask question about code
   - Receive AI response
   - Apply code suggestion

3. **Code Playground Flow**
   - Edit code
   - See live preview
   - Handle errors
   - Save sketch

## Testing Guidelines

### 1. Test Naming Convention
```typescript
test('should [expected behavior] when [condition]', () => {
  // test implementation
});
```

### 2. Test Structure (AAA)
```typescript
test('user can save sketch', async () => {
  // Arrange
  const user = await createUser();
  const sketch = createSketch();
  
  // Act
  const saved = await saveSketch(user, sketch);
  
  // Assert
  expect(saved).toBeDefined();
  expect(saved.userId).toBe(user.id);
});
```

### 3. Test Data
- Use factories for consistent test data
- Avoid hardcoded values
- Clean up after tests

### 4. Async Testing
```typescript
test('loads chapter content', async () => {
  await waitFor(() => {
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });
});
```

## Playwright Best Practices

### 1. Page Objects
```typescript
// tests/e2e/pages/BookReader.ts
export class BookReaderPage {
  constructor(private page: Page) {}
  
  async navigateToChapter(chapterNumber: number) {
    await this.page.click(`[data-chapter="${chapterNumber}"]`);
  }
  
  async getChapterTitle() {
    return this.page.textContent('h1');
  }
}
```

### 2. Custom Assertions
```typescript
expect.extend({
  async toHaveCodeOutput(page: Page, expected: string) {
    const output = await page.textContent('[data-testid="code-output"]');
    return {
      pass: output?.includes(expected) ?? false,
      message: () => `Expected output to contain "${expected}"`
    };
  }
});
```

### 3. Visual Testing
```typescript
test('playground matches design', async ({ page }) => {
  await page.goto('/playground');
  await expect(page).toHaveScreenshot('playground.png');
});
```

## Manual Testing with Playwright MCP

### Setup
1. Ensure Playwright MCP is configured
2. Use for exploratory testing
3. Document findings in test cases

### Test Scenarios
```typescript
// Manual exploration checklist
- [ ] Navigate through all chapters
- [ ] Test code execution edge cases
- [ ] Verify AI responses quality
- [ ] Check mobile interactions
- [ ] Test offline behavior
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npx playwright install
      - run: npm run test:e2e
```

### Test Reports
- Jest coverage reports
- Playwright HTML reports
- Performance metrics
- Accessibility scores

## Performance Testing

### Metrics to Track
- First Contentful Paint < 1s
- Time to Interactive < 2s
- Code execution time < 100ms
- AI response time < 1s

### Tools
- Lighthouse CI
- Web Vitals
- Custom performance marks

## Accessibility Testing

### Automated Checks
- axe-core integration
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support

### Manual Checks
- Color contrast
- Focus indicators
- Error messages
- Alternative text

## Test Maintenance

### Regular Tasks
1. Review flaky tests weekly
2. Update snapshots monthly
3. Audit test coverage quarterly
4. Performance baseline updates

### Documentation
- Document complex test setups
- Maintain test data fixtures
- Update test scenarios
- Share testing insights