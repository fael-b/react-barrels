import ExtensionSettings, { StatementSeparator } from "../settings.types"

export default function generateIndexContent(
  componentName: string,
  { language, semiColons }: ExtensionSettings
) {
  // Add semicolons if enabled
  let s: StatementSeparator = ""
  if (semiColons) {
    s = ";"
  }

  let template = `import ${componentName} from "./${componentName}"${s}

export default ${componentName}${s}`

  // Add types re-export if typescript is enabled
  if (language === "typescript") {
    template += `
export type { ${componentName}Props } from "./${componentName}.types"${s}`
  }

  return template
}
