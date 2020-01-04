import {URL} from 'url';



export enum PROTOCOL {
  GIT= 'git',
  SSH = 'git+ssh',
  HTTP = 'git+http',
  HTTPS = 'git+https',
  FILE = 'git+file',
}

export class Uri {
  public static change(uri: string, username: string, password: string, protocol: PROTOCOL): string {
    const uriProps = new URL(uri);
    return `${protocol}://${username}:${password}@${uriProps.host}${uriProps.pathname}${uriProps.search}${uriProps.hash}`;
  }

  public isGitUri(uri: string): boolean {
    const uriProps = new URL(uri);
    return Object.values<string>(PROTOCOL).includes(uriProps.host)
  }
}
