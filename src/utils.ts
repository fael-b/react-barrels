import * as vscode from "vscode"
import { mkdir, writeFile, rmdir, rm } from "node:fs/promises"
import {
  CreateBarrelParams,
  CreateResourceParams,
  RollbackCallback,
} from "./utils.types"
import generateIndexContent from "./templates/index.template"
import generateTypesContent from "./templates/types.template"
import generateComponentContent from "./templates/component.template"

// Execute the rollbacks in a FILO order (stack)
export function executeRollbacks(rollbacks: RollbackCallback[]) {
  rollbacks.reverse().forEach(async ({ callback, params }) => {
    await callback(...params)
  })
}

export async function createBarrelFolder({
  path,
  rollbacks,
}: CreateBarrelParams) {
  try {
    await mkdir(path)
    rollbacks.push({
      callback: rmdir,
      params: [path],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel folder.")
    executeRollbacks(rollbacks)
    return
  }
}

export async function createIndexFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(
      `${path}/index.${settings.extension}`,
      generateIndexContent(componentName, settings)
    )
    rollbacks.push({
      callback: rm,
      params: [`${path}/index.${settings.extension}`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel index file.")
    executeRollbacks(rollbacks)
    return
  }
}

export async function createComponentFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(
      `${path}/${componentName}.${settings.extension}x`,
      generateComponentContent(componentName, settings)
    )
    rollbacks.push({
      callback: rm,
      params: [`${path}/${componentName}.${settings.extension}x`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage(
      "Error while creating barrel component file."
    )
    executeRollbacks(rollbacks)
    return
  }
}

export async function createTypesFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(
      `${path}/${componentName}.types.ts`,
      generateTypesContent(componentName, settings)
    )
    rollbacks.push({
      callback: rm,
      params: [`${path}/${componentName}.types.ts`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel types file.")
    executeRollbacks(rollbacks)
    return
  }
}

// TODO
export async function createTestsFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(`${path}/${componentName}.${settings.tests}.ts`, "")
    rollbacks.push({
      callback: rm,
      params: [`${path}/${componentName}.${settings.tests}.ts`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel tests file.")
    executeRollbacks(rollbacks)
    return
  }
}

// TODO
export async function createStylesFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(`${path}/${componentName}.module.${settings.styling}`, "")
    rollbacks.push({
      callback: rm,
      params: [`${path}/${componentName}.module.${settings.styling}`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel styling file.")
    executeRollbacks(rollbacks)
    return
  }
}

// TODO
export async function createStoriesFile({
  path,
  componentName,
  rollbacks,
  settings,
}: CreateResourceParams) {
  try {
    await writeFile(
      `${path}/${componentName}.stories.${settings.storiesExtension}`,
      ""
    )
    rollbacks.push({
      callback: rm,
      params: [`${path}/${componentName}.stories.${settings.storiesExtension}`],
    } as RollbackCallback)
  } catch (err) {
    vscode.window.showErrorMessage("Error while creating barrel stories file.")
    executeRollbacks(rollbacks)
    return
  }
}
