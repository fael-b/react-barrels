# react-barrels 🥃

Easily convert or create your React/Typescript component files to a barrel file structure.

## Barrel Structure

#### FROM:

- `components/MyComponent.tsx` => Messy component with type definitions, etc...

#### TO:

- `components/MyComponent/MyComponent.tsx` => Functional or class component
- `components/MyComponent/MyComponent.types.ts` => Type definitions (props, etc...)
- `components/MyComponent/index.ts` => Re-exports the contents of the `MyComponent` folder

## Features

- Right click on a _parent folder_ to create a new React component.
- Convert an existing component by using the corresponding command (`CTRL + SHIFT + P` -> "Convert to a barrel folder structure").

## Extension Settings

// NOT IMPLEMENTED YET

```
{
  language: "typescript" | "javascript"
  reactStyle: "functional" | "const" | "class"
  styling: "css" | "scss" | "sass" | "none"
  stories: "csf" | "mdx" | "none"
  tests: "test" | "spec" | "none"
  semiColons: boolean
}
```

## Todos

- [x] Support Javascript components
- [x] Support class components
- [x] Convert callbacks to promises
- [x] Refactor `createBarrel`
- [ ] Create `MyComponent.test.ts` default templates
- [ ] Create `MyComponent.stories.tsx` default templates
- [ ] Refactor `convertToBarrel`
- [ ] Enable extension configuration
- [ ] Barrel creation/convertion prompts
- [ ] Tests maybe?
- [ ] Automatically parse and export typescript definitions?
- [ ] Release on marketplace

## Known Issues

// unknown support for Linux and MacOS
// messy code 🍝

## Release Notes

### 0.0.2

- Refactored `createBarrel` command.
- Refactored file content generation utils.
- Defined extension settings.
- Added support for Javascript.
- Added support for React class components.

### 0.0.1

- Create and convert React/Typescript components.
