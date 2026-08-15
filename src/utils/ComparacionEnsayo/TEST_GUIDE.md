# Testing Guide for ComparacionEnsayo

This directory contains statistical hypothesis testing calculations. Each file should have a corresponding `.test.ts` file.

## How to Add Tests

### 1. Create a test file
For each calculation file, create a test file with the pattern: `{filename}.test.ts`

### 2. Test structure
```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from './your-file';

describe('functionName', () => {
  it('should handle basic case', () => {
    const result = functionName({ /* inputs */ });
    expect(result.property).toBe(expectedValue);
  });
});
```

### 3. What to test

For each calculation function, test:

- **Valid inputs**: Basic cases with typical parameters
- **Boundary conditions**: Edge cases (min/max values)
- **Different scenarios**: All branches in the code (different `cola` values, etc.)
- **Error handling**: Invalid inputs that should throw errors
- **Relationships**: Mathematical properties (e.g., beta + power = 1)
- **Monotonicity**: How results change when inputs change (e.g., power increases with effect size)

### 4. Running tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run specific test file
npm test comparar-ensayo-media-varianza-conocida.test.ts

# View test UI
npm run test:ui
```

## Example: Testing comparar-ensayo-media-no-independiente.ts

```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from './comparar-ensayo-media-no-independiente';

describe('functionName', () => {
  it('should calculate correctly with typical inputs', () => {
    const result = functionName({
      // provide typical test parameters
    });
    expect(result).toBeDefined();
    expect(result.value).toBeGreaterThan(0);
  });

  it('should handle cola=1 (left-tailed)', () => {
    const result = functionName({
      // ... with cola: 1
    });
    expect(result).toBeDefined();
  });

  it('should throw error for invalid cola', () => {
    expect(() => functionName({ cola: 99 })).toThrow();
  });

  it('should show mathematical relationships', () => {
    const result1 = functionName({ /* ... */ });
    const result2 = functionName({ /* different params */ });
    // Assert some relationship between results
    expect(result1.value).toBeLessThan(result2.value);
  });
});
```

## Files needing tests

- [ ] comparar-ensayo-media-no-independiente.ts
- [ ] comparar-ensayo-media-varianza-desconocida-igual.ts  
- [ ] comparar-ensayo-media-varianza-desconocida-distinta.ts
- [ ] comparar-ensayo-varianza.ts

## Best practices

1. **Use descriptive test names** - "should calculate rejection value for right-tailed test" is better than "test 1"
2. **Test one thing per test** - Keep tests focused and independent
3. **Use appropriate assertions** - `toBeCloseTo()` for floats, `toBeGreaterThan()` for ranges
4. **Test the behavior, not implementation** - Focus on inputs and outputs, not internal logic
5. **Document assumptions** - Add comments if test values depend on external libraries (e.g., stdlib quantiles)
