import { DerivedSettings } from "./settings.types"

export interface RollbackCallback {
  callback: (...args: any) => Promise<any>
  params: any[]
}

export interface CreateResourceParams {
  path: string
  componentName: string
  rollbacks: RollbackCallback[]
  settings: DerivedSettings
}

export interface CreateBarrelParams {
  path: string
  rollbacks: RollbackCallback[]
  componentName?: string
  settings?: DerivedSettings
}
