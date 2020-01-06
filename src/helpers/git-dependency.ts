import {chain, get, has, set, isObject, reduce} from 'lodash'
import {PROTOCOL, Uri} from "./uri";


export type PackageItem  = {[key: string]: string};
export interface Package {
  dependencies?: PackageItem,
  devDependencies?: PackageItem,
}

export type PackageLockItem  = {[key: string]: { version: string, from?: string }}
export interface PackageLock {
  dependencies?: PackageLockItem
}

export type Paths = Array<['dependencies', string, 'version' | 'from'] | ['dependencies' | 'devDependencies', string]>

export class GitDependency {
  public static find(json: string) {
    const parsedJson: Package | PackageLock = JSON.parse(json);
    return chain<PackageItem | PackageLockItem>({
      ...get(<Package>parsedJson, 'dependencies', <PackageItem>{}),
      ...get(<Package>parsedJson, 'devDependencies', <PackageItem>{}),
    })
      .mapValues((item) => (isObject(item)? item.version : item))
      .map((uri: string, name: string) => {
        return  {name, uri}
      })
      .filter(item => Uri.isGitUri(item.uri))
      .map(item => item.name)
      .value()
  }

  public static change(json: string, names: string[], username: string, password: string): string {
    return JSON.stringify(chain(names)
      .reduce((parsedJson: Package | PackageLock, name) => {
        const paths: Paths = (chain(parsedJson).get(['dependencies', name]).isObject().value())
          ? [['dependencies', name, 'version'], ['dependencies', name, 'from']]
          : [['dependencies', name], ['devDependencies', name]];

        return this.changeByPaths(paths, parsedJson, username, password) as Package;
      }, JSON.parse(json) as Package | PackageLock)
      .value());
  }

  protected static changeByPaths(paths: Paths, json: Package | PackageLock, username: string, password: string): Package | PackageLock {
    paths.forEach((path) => {
      if (has(json, path))
        set(json, path, Uri.change(get(json, path), username, password, PROTOCOL.HTTPS))
    })

    return json;
  }
}
