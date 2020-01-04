
export interface Package {
  dependencies: {[key: string]: string},
  devDependencies?: {[key: string]: string},
}

export interface PackageLock {
  dependencies: {[key: string]: {
      version: string,
      from: string,
  }},
}

export class GitDependency {
  find(json: string) {

  }

  change(json: string, names: string[]) {

  }
}
