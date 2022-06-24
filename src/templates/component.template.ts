import ExtensionSettings, { StatementSeparator } from "../settings.types"

export default function generateComponentContent(
  componentName: string,
  { language, reactStyle, styling, semiColons }: ExtensionSettings
) {
  // Add semicolons if enabled
  let s: StatementSeparator = ""
  if (semiColons) {
    s = ";"
  }

  // Import types if typescript is enabled
  const importTypes = () => {
    if (language === "typescript") {
      return `import { ${componentName}Props } from "./${componentName}.types"${s}
`
    }
    return ""
  }

  // Import styles if enabled
  const importStyles = () => {
    if (styling && styling !== "none") {
      return `import styles from "./${componentName}.module.${styling}"${s}
`
    }
    return ""
  }

  // Import the { Component } dependency for class components
  const importReactDeps = () => {
    if (reactStyle === "class") {
      return `import { Component } from "react"${s}
`
    }
    return ""
  }

  // Generate the `import` headers
  const defineImports = () => {
    return `${importReactDeps()}${importStyles()}${importTypes()}`
  }

  // Generate the component's props definition
  const defineProps = () => {
    if (language === "typescript") {
      return `{}: ${componentName}Props`
    }
    return "{}"
  }

  // Generate the component's body
  const defineComponent = () => {
    switch (reactStyle) {
      // Functional components
      case "functional":
        return `export default function ${componentName}(${defineProps()}) {
	return <div>${componentName}</div>${s}
}`

      // Functional components defined as `const`
      case "const":
        return `const ${componentName} = (${defineProps()}) => {
	return <div>${componentName}</div>${s}
}

export default ${componentName}${s}`

      // Class component
      case "class":
        switch (language) {
          case "javascript":
            return `export default class ${componentName} extends Component {
	constructor(props) {
		super(props)${s}
	}

	render() {
		return <div>${componentName}</div>${s}
	}
}`

          case "typescript":
            return `export default class ${componentName} extends Component<${componentName}Props> {
	render() {
		return <div>${componentName}</div>${s}
	}
}`
        }
    }
  }

  // Create actual component template
  let template = defineImports()
  if (template.length !== 0) {
    template += `\n`
  }
  template += `${defineComponent()}`

  return template
}
