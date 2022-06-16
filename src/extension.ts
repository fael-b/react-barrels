// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"
import fs = require("fs")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("react-barrels is now active.")

  let createBarrel = vscode.commands.registerCommand(
    "react-barrels.createBarrel",
    async ({ path }) => {
      if (!path) {
        return vscode.window.showErrorMessage(
          "Error while creating barrel: no path provided"
        )
      }
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
      let barrelPath = path as string
      if (barrelPath.startsWith("/") || barrelPath.startsWith("\\")) {
        barrelPath = barrelPath.substring(1)
      }
      barrelPath += `/${componentName}`

      // Create parent barrel directory
      fs.mkdir(barrelPath, (err) => {
        if (err) {
          return vscode.window.showErrorMessage(
            "Error while creating barrel: " + err.message
          )
        }

        // Create index file
        fs.writeFile(
          `${barrelPath}/index.ts`,
          `import ${componentName} from "./${componentName}"

export default ${componentName}
export type { ${componentName}Props } from "./${componentName}.types"`,
          (err) => {
            if (err) {
              return vscode.window.showErrorMessage(
                "Error while creating barrel index file: " + err.message
              )
            }

            // Create types file
            fs.writeFile(
              `${barrelPath}/${componentName}.types.ts`,
              `export interface ${componentName}Props {}`,
              (err) => {
                if (err) {
                  return vscode.window.showErrorMessage(
                    "Error while creating barrel types file: " + err.message
                  )
                }

                // Create component file
                fs.writeFile(
                  `${barrelPath}/${componentName}.tsx`,
                  `import { ${componentName}Props } from "./${componentName}.types"

export default function ${componentName}({}: ${componentName}Props) {
	return <div>${componentName}</div>
}`,
                  (err) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Error while creating barrel component file: " +
                          err.message
                      )
                    }

                    // Open component file
                    vscode.window
                      .showTextDocument(
                        vscode.Uri.parse(
                          `file:///${barrelPath}/${componentName}.tsx`
                        )
                      )
                      .then(() => {
                        return vscode.window.showInformationMessage(
                          `Created component barrel ${componentName} successfully.`
                        )
                      })
                  }
                )
              }
            )
          }
        )
      })
    }
  )

  context.subscriptions.push(createBarrel)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "react-barrels.convertToBarrel",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage(
      //   "Converting this component to a barrel..."
      // )

      if (!vscode.workspace) {
        return vscode.window.showErrorMessage(
          "Please open a project folder first."
        )
      }

      // Check if current file has a *.tsx extension
      // TODO: Add support for *.jsx files
      if (
        !vscode.window.activeTextEditor?.document ||
        vscode.window.activeTextEditor?.document?.languageId !==
          "typescriptreact"
      ) {
        return vscode.window.showErrorMessage(
          "Please open a Typescript/React component file first."
        )
      }

      const extension = "ts"
      const reactExtension = `${extension}x`

      // Get the current file path
      const currentFile = vscode.window.activeTextEditor.document
      const filePath = currentFile.fileName // c:\***\test.tsx
      const fileName = filePath.split("\\").pop()?.split(".").shift() // test

      const newBarrelPath = filePath
        .split(`.${reactExtension}`)
        .slice(0, -1)
        .join("")

      const movedFilePath = `${newBarrelPath}\\${fileName}.${reactExtension}`
      const newIndexPath = `${newBarrelPath}\\index.${extension}`
      const newTypesPath = `${newBarrelPath}\\${fileName}.types.${extension}`

      const indexContent = `import ${fileName} from "./${fileName}"
			
export default ${fileName}`

      const typesContent = `export interface ${fileName}Props {}`

      // Create the new barrel folder
      fs.mkdir(newBarrelPath, (err) => {
        if (err) {
          return vscode.window.showErrorMessage(
            `Failed to create barrel folder. Check if the folder ${fileName} already exists.`
          )
        }

        // Create the new index file
        fs.writeFile(newIndexPath, indexContent, (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              `Failed to create ${fileName}/index.${extension} file.`
            )
          }

          // Create the new types file
          fs.writeFile(newTypesPath, typesContent, (err) => {
            if (err) {
              return vscode.window.showErrorMessage(
                `Failed to create ${fileName}/${fileName}.types.${extension} file.`
              )
            }

            // Move the current file to the new barrel folder
            fs.rename(filePath, movedFilePath, async (err) => {
              if (err) {
                return vscode.window.showErrorMessage(
                  `Failed to move ${fileName}.${reactExtension} to ${newBarrelPath}/${fileName}.${reactExtension}`
                )
              }

              // Open the original file in order to close it
              await vscode.window.showTextDocument(currentFile.uri)
              await vscode.commands.executeCommand(
                "workbench.action.closeActiveEditor"
              )
              // Open the moved file
              await vscode.window.showTextDocument(
                vscode.Uri.parse(`file:///${movedFilePath}`)
              )

              return vscode.window.showInformationMessage(
                "The component has successfully been converted."
              )
            })
          })
        })
      })
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
