# Dropdown Component Tests

This directory contains tests for the Dropdown component suite. The tests are written using React Testing Library and Jest.

## Setup Requirements

To run these tests, you need to have the following dependencies installed:

```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom jest @types/jest
```

Add Jest configuration to your `package.json` or create a `jest.config.js` file if not already set up.

## Running Tests

Run the tests with:

```bash
npm test
```

Or to run only the Dropdown tests:

```bash
npm test -- --testPathPattern=dropdown
```

## Test Coverage

The test suite covers the following areas:

1. **Basic Functionality**

   - Trigger rendering
   - Opening and closing the dropdown
   - Controlled and uncontrolled state

2. **Keyboard Navigation**

   - Arrow key navigation
   - Escape key for closing
   - Enter and Right Arrow for opening submenus

3. **Nested Dropdowns**

   - Submenu rendering and opening
   - Keyboard navigation between parent and child menus

4. **Selection Functionality**

   - Selection indicator display

5. **Additional Features**
   - Dividers
   - Labels

## Known Limitations

- Some tests may need environment adjustments for portal-based components
- Keyboard navigation tests might be sensitive to focus management changes
- Custom matcher (`toBeRenderedWithOptions`) requires Jest's `expect.extend`

## Troubleshooting

If you encounter errors with the tests:

1. Make sure all dependencies are installed correctly
2. Check that your test environment has proper DOM support
3. Ensure that your Jest configuration includes the right transformers for TypeScript/JSX

For portal-related issues, you might need to adjust your test environment to properly handle React portals.
