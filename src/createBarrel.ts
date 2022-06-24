import * as vscode from "vscode"
import { CreateResourceParams, RollbackCallback } from "./utils.types"
import {
  createBarrelFolder,
  createComponentFile,
  createIndexFile,
  createStoriesFile,
  createStylesFile,
  createTestsFile,
  createTypesFile,
} from "./utils"
import {
  BaseExtensions,
  DerivedSettings,
  StorybookExtensions,
} from "./settings.types"

export default async function createBarrel({ path }: { path?: string }) {
  if (!path) {
    return vscode.window.showErrorMessage(
      "Error while creating barrel: no path provided"
    )
  }

  // Prompt the user for a the componentName
  // TODO: component/file name validation (regex?)
  const componentName = (
    await vscode.window.showInputBox({
      prompt: "Enter the name of the React component",
      title: "Create a React component barrel",
    })
  )?.trim()
  if (!componentName) {
    return vscode.window.showErrorMessage(
      "Error while creating barrel: no component name provided"
    )
  }

  // Fix the barrel path
  let barrelPath = path
  if (barrelPath.startsWith("/") || barrelPath.startsWith("\\")) {
    barrelPath = barrelPath.substring(1)
  }
  barrelPath += `/${componentName}`

  // Create rollback callbacks array in case something goes wrong during the creation
  let rollbacks: RollbackCallback[] = []

  let extension: BaseExtensions = "ts"

  let storiesExtension: StorybookExtensions = `${
    "csf" === "csf" ? extension : "md"
  }x`

  // TODO: Merge user settings and default settings
  const settings: DerivedSettings = {
    language: "typescript",
    reactStyle: "functional",
    semiColons: false,
    styling: "css",
    stories: "none",
    tests: "none",
    extension,
    storiesExtension,
  }

  const creationParams: CreateResourceParams = {
    path: barrelPath,
    componentName,
    rollbacks,
    settings,
  }

  // Create parent barrel directory
  await createBarrelFolder(creationParams)

  // Create index file
  await createIndexFile(creationParams)

  // Create types file if requested
  if (settings.language === "typescript") {
    await createTypesFile(creationParams)
  }

  // Create styles file if requested
  if (settings.styling !== "none") {
    await createStylesFile(creationParams)
  }

  // Create component file
  await createComponentFile(creationParams)

  // Create stories file if requested
  if (settings.stories !== "none") {
    await createStoriesFile(creationParams)
  }

  // Create tests file if requested
  if (settings.tests !== "none") {
    await createTestsFile(creationParams)
  }

  // Open component file
  vscode.window
    .showTextDocument(
      vscode.Uri.parse(
        `file:///${barrelPath}/${componentName}.${settings.extension}x`
      )
    )
    .then(() => {
      return vscode.window.showInformationMessage(
        `Created component barrel ${componentName} successfully.`
      )
    })
}
