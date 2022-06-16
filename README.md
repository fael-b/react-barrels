# react-barrels ��

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

// TODO

## Todos

- [ ] Support Javascript components
- [ ] Support class components
- [ ] Convert callbacks to promises
- [ ] Format the code properly in separate files/functions (the irony ��)
- [ ] Tests maybe?
- [ ] Automatically parse and export typescript definitions?
- [ ] Release on marketplace

## Known Issues

// unknown support for linux and macos
// no rollback yet if an error occurs
// messy code ��

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Create and convert React/Typescript components
