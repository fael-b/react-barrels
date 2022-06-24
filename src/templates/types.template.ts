import ExtensionSettings from "../settings.types"

export default function generateTypesContent(
  componentName: string,
  { semiColons }: ExtensionSettings
) {
  return `export interface ${componentName}Props {}${semiColons ? ";" : ""}`
}
