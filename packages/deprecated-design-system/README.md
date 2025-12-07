# ⚠️ DEPRECATED: @choiceform/design-system

This package has been **migrated** to `@choice-ui/react`. Please update your dependencies.

## Migration Guide

### Step 1: Install the new package

```bash
pnpm add @choice-ui/react
# or
npm install @choice-ui/react
```

### Step 2: Update your imports

**Before:**

```tsx
import { Button, Input } from "@choiceform/design-system";
```

**After:**

```tsx
import { Button, Input } from "@choice-ui/react";
```

### Step 3: Remove the old package

```bash
pnpm remove @choiceform/design-system
# or
npm uninstall @choiceform/design-system
```

## Why the migration?

This package has been renamed to better reflect the project structure and naming conventions. The new package `@choice-ui/react` contains all the same components and features.

## Support

- Documentation: [https://choice-ui.com/](https://choice-ui.com/)
- Issues: [GitHub Issues](https://github.com/choiceform/choice-ui/issues)

---

**Note:** This deprecated package will redirect to `@choice-ui/react` for backward compatibility, but we strongly recommend updating to the new package name.
