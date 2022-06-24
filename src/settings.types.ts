export default interface ExtensionSettings {
  language: LanguageOptions
  reactStyle: ReactStyleOptions
  styling: StylingOptions
  stories: StoriesOptions
  tests: TestsOptions
  semiColons: boolean
}

export interface DerivedSettings extends ExtensionSettings {
  extension: BaseExtensions
  storiesExtension: StorybookExtensions
}

export type LanguageOptions = "typescript" | "javascript"
export type ReactStyleOptions = "functional" | "const" | "class"
export type StylingOptions = "css" | "scss" | "sass" | "none"
export type StoriesOptions = "csf" | "mdx" | "none"
export type TestsOptions = "test" | "spec" | "none"
export type StatementSeparator = ";" | ""

export type BaseExtensions = "ts" | "js"
export type StorybookExtensions = "tsx" | "jsx" | "mdx"
