import {URL} from 'url';
import {parse} from "uri-js";

export enum PROTOCOL {
  GIT= 'git',
  SSH = 'git+ssh',
  HTTP = 'git+http',
  HTTPS = 'git+https',
  FILE = 'git+file',
}

export class Uri {
  public static change(uri: string, username: string, password: string, protocol: PROTOCOL): string {
    if (!this.isGitUri(uri))
      return  uri;

    const uriProps = new URL(uri);
    return `${protocol}://${username}:${password}@${uriProps.host}${uriProps.pathname}${uriProps.search}${uriProps.hash}`;
  }

  public static isGitUri(uri: string): boolean {
    try {
      return Object
        .values<string>(PROTOCOL)
        .includes(parse(uri).scheme || '');
    } catch (e) {
      return false
    }
  }
}
