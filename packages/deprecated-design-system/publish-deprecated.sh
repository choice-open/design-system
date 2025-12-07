#!/bin/bash

# Script to publish the deprecated @choiceform/design-system package
# This package redirects to @choice-ui/react

cd "$(dirname "$0")"

echo "⚠️  Publishing deprecated package @choiceform/design-system..."
echo "This package will redirect users to @choice-ui/react"
echo ""

# Check if logged in to npm
if ! npm whoami &> /dev/null; then
  echo "❌ Error: Not logged in to npm. Please run 'npm login' first."
  exit 1
fi

# Publish the package
npm publish --access public

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully published @choiceform/design-system@999.0.0-deprecated"
  echo ""
  echo "Next steps:"
  echo "1. Mark all previous versions as deprecated:"
  echo "   npm deprecate @choiceform/design-system@\"<1.3.10\" \"This package has been migrated to @choice-ui/react. Please run: pnpm add @choice-ui/react\""
  echo ""
  echo "2. Verify the deprecated message appears on npm:"
  echo "   https://www.npmjs.com/package/@choiceform/design-system"
else
  echo ""
  echo "❌ Failed to publish package"
  exit 1
fi

